/**
 * Gmail reader for vehicle-related emails: traffic-fine ("multa") notices
 * and patente (registration tax) due/renewal notices.
 *
 * Real mode: if GMAIL_CLIENT_ID / GMAIL_CLIENT_SECRET / GMAIL_REFRESH_TOKEN are
 * set, we exchange the refresh token for an access token and query the Gmail
 * REST API for both kinds of messages in a single pass, classify each one,
 * then run a per-kind heuristic parser. No extra dependency is needed — we
 * use fetch against Google's OAuth2 + Gmail HTTP endpoints.
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
  /** Official payment link/portal the organism's own email points to, if any. */
  paymentUrl: string | null
  from: string
  subject: string
  receivedAt: string
}

export type ParsedPatenteEmail = {
  emailId: string
  plate: string
  period: string | null // e.g. "Cuota 1/2026"
  amount: number
  dueDate: string | null // YYYY-MM-DD
  /** Official payment link/portal the organism's own email points to, if any. */
  paymentUrl: string | null
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

const DEMO_MULTA_INBOX: ParsedMultaEmail[] = [
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
    // Demonstrates the "organism's email included a payment link" case.
    // Fictitious .example domain — never a real, reachable site.
    paymentUrl: "https://pagos.transito.example/acta/ACTA-2026-01120",
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
    // Demonstrates the "no payment link in the email" case.
    paymentUrl: null,
    from: "notificaciones@infracciones.gob.ar",
    subject: "Nueva infracción registrada - Dominio AD789GH",
    receivedAt: "2026-01-19T14:40:00Z",
  },
]

const DEMO_PATENTE_INBOX: ParsedPatenteEmail[] = [
  {
    emailId: "gmail-demo-201",
    plate: "AD789GH",
    period: "Cuota 1/2026",
    amount: 45000,
    dueDate: "2026-03-15",
    paymentUrl: null,
    from: "notificaciones@rentas.gba.gob.ar",
    subject: "Vencimiento de patente - Dominio AD789GH - Cuota 1/2026",
    receivedAt: "2026-02-01T10:00:00Z",
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

const PLATE_RE = /\b([A-Z]{2}\s?\d{3}\s?[A-Z]{2}|[A-Z]{3}\s?\d{3})\b/i
const AMOUNT_RE = /\$\s?([\d.]+)/
const MULTA_STRONG_RE = /\bACTA[-\s]?[\d-]+\b/i
const MULTA_WORDS_RE = /\b(infracci[oó]n|multa|acta)\b/i
const PATENTE_WORDS_RE = /\b(patente|c[eé]dula|dnrpa|arba|rentas|dominio)\b/i
// Conservative on purpose: only a URL that appears near a pago/pagar/abonar
// keyword counts as "the organism's official payment link". Grabbing any
// URL in the email (unsubscribe links, tracking pixels, etc.) and presenting
// it as an official payment link would be actively misleading.
const PAYMENT_URL_RE = /(?:pagar|pago|abonar)[^\n]{0,80}?(https?:\/\/\S+)/i

function parsePaymentUrl(text: string): string | null {
  return text.match(PAYMENT_URL_RE)?.[1]?.replace(/[.,)]+$/, "") ?? null
}

/**
 * Classifies an email as a multa (infraction) or a patente (registration
 * tax) notice. Multa signals take priority — a strong "ACTA-..." code or the
 * words infracción/multa/acta — because "vencimiento" alone is ambiguous
 * (both kinds of email use it, multas for the discount deadline).
 */
function classifyEmail(subject: string, body: string): "multa" | "patente" | "unknown" {
  const text = `${subject}\n${body}`
  if (MULTA_STRONG_RE.test(text) || MULTA_WORDS_RE.test(text)) return "multa"
  if (PATENTE_WORDS_RE.test(text)) return "patente"
  return "unknown"
}

// Very small heuristic parser for Argentine infraction emails.
function parseInfractionText(text: string): Partial<ParsedMultaEmail> {
  const plate = text.match(PLATE_RE)?.[1]
  const code = text.match(/ACTA[-\s]?[\d-]+/i)?.[0]
  const amount = text.match(AMOUNT_RE)?.[1]
  return {
    plate: plate ? plate.toUpperCase().replace(/\s/g, "") : undefined,
    code: code ?? undefined,
    amount: amount ? Number(amount.replace(/\./g, "")) : undefined,
    paymentUrl: parsePaymentUrl(text),
  }
}

function parseArgentineDate(text: string): string | null {
  const match = text.match(/\b([0-3]?\d)[\/\-]([01]?\d)[\/\-](\d{2,4})\b/)
  if (!match) return null
  const [, d, m, y] = match
  const year = y.length === 2 ? `20${y}` : y
  const day = d.padStart(2, "0")
  const month = m.padStart(2, "0")
  return `${year}-${month}-${day}`
}

// Very small heuristic parser for Argentine patente due/renewal emails.
function parsePatenteText(text: string): Partial<ParsedPatenteEmail> {
  const plate = text.match(PLATE_RE)?.[1]
  const amount = text.match(AMOUNT_RE)?.[1]
  const period = text.match(/cuota\s*\d+\s*\/\s*\d{4}/i)?.[0]
  const dueDateMatch = text.match(/vencimiento[:\s]*([0-3]?\d[\/\-][01]?\d[\/\-]\d{2,4})/i)
  const dueDate = dueDateMatch ? parseArgentineDate(dueDateMatch[1]) : parseArgentineDate(text)
  return {
    plate: plate ? plate.toUpperCase().replace(/\s/g, "") : undefined,
    amount: amount ? Number(amount.replace(/\./g, "")) : undefined,
    period: period ?? undefined,
    dueDate: dueDate ?? undefined,
    paymentUrl: parsePaymentUrl(text),
  }
}

/**
 * Returns both multa and patente emails from the connected Gmail account, or
 * the demo inboxes when Gmail is not configured. A single Gmail search
 * covers both kinds so callers (the on-demand tool and the schedule) never
 * double up on Gmail API calls.
 */
export async function fetchVehicleEmails(): Promise<{
  multas: ParsedMultaEmail[]
  patentes: ParsedPatenteEmail[]
}> {
  if (!gmailConfigured()) return { multas: DEMO_MULTA_INBOX, patentes: DEMO_PATENTE_INBOX }

  const token = await getAccessToken()
  const query = encodeURIComponent(
    "subject:(infracción OR multa OR acta OR patente OR cédula OR vencimiento OR DNRPA OR ARBA OR rentas OR dominio) newer_than:180d",
  )
  const listRes = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages?q=${query}&maxResults=25`,
    { headers: { Authorization: `Bearer ${token}` } },
  )
  if (!listRes.ok) throw new Error(`Gmail list falló: ${listRes.status}`)
  const list = (await listRes.json()) as { messages?: { id: string }[] }

  const multas: ParsedMultaEmail[] = []
  const patentes: ParsedPatenteEmail[] = []

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
    const receivedAt = msg.internalDate ? new Date(Number(msg.internalDate)).toISOString() : new Date().toISOString()

    const kind = classifyEmail(subject, body)
    if (kind === "multa") {
      const parsed = parseInfractionText(`${subject}\n${body}`)
      if (!parsed.plate || !parsed.amount) continue
      multas.push({
        emailId: msg.id,
        plate: parsed.plate,
        code: parsed.code ?? `ACTA-${msg.id.slice(0, 8)}`,
        description: subject || "Infracción de tránsito",
        location: null,
        infractionDate: receivedAt.slice(0, 10),
        amount: parsed.amount,
        discountUntil: null,
        discountAmount: null,
        paymentUrl: parsed.paymentUrl ?? null,
        from,
        subject,
        receivedAt,
      })
    } else if (kind === "patente") {
      const parsed = parsePatenteText(`${subject}\n${body}`)
      if (!parsed.plate || !parsed.amount) continue
      patentes.push({
        emailId: msg.id,
        plate: parsed.plate,
        period: parsed.period ?? null,
        amount: parsed.amount,
        dueDate: parsed.dueDate ?? null,
        paymentUrl: parsed.paymentUrl ?? null,
        from,
        subject,
        receivedAt,
      })
    }
    // "unknown" emails matched the broad search query but neither
    // classifier recognized them — skip rather than guess.
  }

  return { multas, patentes }
}
