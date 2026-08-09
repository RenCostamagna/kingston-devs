/**
 * Gmail reader for infraction emails.
 *
 * Real mode: if GMAIL_CLIENT_ID / GMAIL_CLIENT_SECRET / GMAIL_REFRESH_TOKEN are
 * set, we exchange the refresh token for an access token and query the Gmail
 * REST API for infraction-related messages, then parse them into structured
 * multas. No extra dependency is needed — we use fetch against Google's
 * OAuth2 + Gmail HTTP endpoints.
 *
 * Demo mode: without those env vars we return a small fixed inbox so the agent
 * flow is fully demonstrable. Replace the demo inbox by setting the env vars.
 */

export type ParsedMultaEmail = {
  emailId: string
  plate: string
  code: string
  description: string
  location: string | null
  infractionDate: string | null // YYYY-MM-DD
  amount: number
  discountUntil: string | null
  discountAmount: number | null
  from: string
  subject: string
  receivedAt: string
}

export function gmailConfigured(): boolean {
  return Boolean(
    process.env.GMAIL_CLIENT_ID && process.env.GMAIL_CLIENT_SECRET && process.env.GMAIL_REFRESH_TOKEN,
  )
}

// ---- Demo inbox (used when Gmail is not connected) ----

const DEMO_INBOX: ParsedMultaEmail[] = [
  {
    emailId: "gmail-demo-101",
    plate: "AB123CD",
    code: "ACTA-2026-01120",
    description: "Circular sin luces bajas encendidas en autopista",
    location: "Autopista 25 de Mayo, altura Boedo",
    infractionDate: "2026-01-25",
    amount: 54000,
    discountUntil: "2026-02-20",
    discountAmount: 27000,
    from: "notificaciones@infracciones.gob.ar",
    subject: "Nueva infracción registrada - Dominio AB123CD",
    receivedAt: "2026-01-27T09:12:00Z",
  },
  {
    emailId: "gmail-demo-102",
    plate: "AD789GH",
    code: "ACTA-2026-00890",
    description: "Uso de teléfono celular al conducir",
    location: "Av. Del Libertador y Dorrego, CABA",
    infractionDate: "2026-01-18",
    amount: 72000,
    discountUntil: "2026-02-10",
    discountAmount: 36000,
    from: "notificaciones@infracciones.gob.ar",
    subject: "Nueva infracción registrada - Dominio AD789GH",
    receivedAt: "2026-01-19T14:40:00Z",
  },
]

async function getAccessToken(): Promise<string> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GMAIL_CLIENT_ID!,
      client_secret: process.env.GMAIL_CLIENT_SECRET!,
      refresh_token: process.env.GMAIL_REFRESH_TOKEN!,
      grant_type: "refresh_token",
    }),
  })
  if (!res.ok) throw new Error(`Gmail OAuth falló: ${res.status} ${await res.text()}`)
  const json = (await res.json()) as { access_token: string }
  return json.access_token
}

function decodeBody(data?: string): string {
  if (!data) return ""
  return Buffer.from(data.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8")
}

type GmailPart = { mimeType?: string; body?: { data?: string }; parts?: GmailPart[] }

function extractText(payload: GmailPart | undefined): string {
  if (!payload) return ""
  if (payload.body?.data) return decodeBody(payload.body.data)
  for (const part of payload.parts ?? []) {
    const text = extractText(part)
    if (text) return text
  }
  return ""
}

// Very small heuristic parser for Argentine infraction emails.
function parseInfractionText(text: string): Partial<ParsedMultaEmail> {
  const plate = text.match(/\b([A-Z]{2}\s?\d{3}\s?[A-Z]{2}|[A-Z]{3}\s?\d{3})\b/i)?.[1]
  const code = text.match(/ACTA[-\s]?[\d-]+/i)?.[0]
  const amount = text.match(/\$\s?([\d.]+)/)?.[1]
  return {
    plate: plate ? plate.toUpperCase().replace(/\s/g, "") : undefined,
    code: code ?? undefined,
    amount: amount ? Number(amount.replace(/\./g, "")) : undefined,
  }
}

/**
 * Returns infraction emails from the connected Gmail account, or the demo
 * inbox when Gmail is not configured.
 */
export async function fetchMultaEmails(): Promise<ParsedMultaEmail[]> {
  if (!gmailConfigured()) return DEMO_INBOX

  const token = await getAccessToken()
  const query = encodeURIComponent('subject:(infracci\u00f3n OR multa OR acta) newer_than:180d')
  const listRes = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages?q=${query}&maxResults=25`,
    { headers: { Authorization: `Bearer ${token}` } },
  )
  if (!listRes.ok) throw new Error(`Gmail list falló: ${listRes.status}`)
  const list = (await listRes.json()) as { messages?: { id: string }[] }

  const out: ParsedMultaEmail[] = []
  for (const { id } of list.messages ?? []) {
    const msgRes = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}?format=full`,
      { headers: { Authorization: `Bearer ${token}` } },
    )
    if (!msgRes.ok) continue
    const msg = (await msgRes.json()) as {
      id: string
      internalDate?: string
      payload?: GmailPart & { headers?: { name: string; value: string }[] }
    }
    const headers = msg.payload?.headers ?? []
    const subject = headers.find((h) => h.name.toLowerCase() === "subject")?.value ?? ""
    const from = headers.find((h) => h.name.toLowerCase() === "from")?.value ?? ""
    const body = extractText(msg.payload)
    const parsed = parseInfractionText(`${subject}\n${body}`)
    if (!parsed.plate || !parsed.amount) continue
    out.push({
      emailId: msg.id,
      plate: parsed.plate,
      code: parsed.code ?? `ACTA-${msg.id.slice(0, 8)}`,
      description: subject || "Infracción de tránsito",
      location: null,
      infractionDate: msg.internalDate
        ? new Date(Number(msg.internalDate)).toISOString().slice(0, 10)
        : null,
      amount: parsed.amount,
      discountUntil: null,
      discountAmount: null,
      from,
      subject,
      receivedAt: msg.internalDate ? new Date(Number(msg.internalDate)).toISOString() : new Date().toISOString(),
    })
  }
  return out
}
