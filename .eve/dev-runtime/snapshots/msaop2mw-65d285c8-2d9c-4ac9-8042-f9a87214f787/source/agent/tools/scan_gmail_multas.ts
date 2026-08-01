import { defineTool } from "eve/tools"
import { z } from "zod"

import { getDb } from "../../lib/db"
import { fetchMultaEmails, gmailConfigured } from "../../lib/gmail"

export default defineTool({
  description:
    "Revisa la casilla de Gmail conectada en busca de emails de infracciones/multas nuevas, las parsea y registra las que no estén cargadas todavía. Devuelve las multas nuevas encontradas. Usar cuando el usuario pide 'revisar el mail' o 'buscar multas nuevas'.",
  inputSchema: z.object({
    plate: z
      .string()
      .optional()
      .describe("Opcional: filtrar por una patente específica. Si se omite, revisa todas."),
  }),
  async execute({ plate }) {
    const db = getDb()
    const emails = await fetchMultaEmails()

    const target = plate ? plate.toUpperCase().replace(/[\s-]/g, "") : null
    const relevant = target
      ? emails.filter((e) => e.plate.toUpperCase().replace(/[\s-]/g, "") === target)
      : emails

    const newlyRegistered: {
      code: string
      plate: string
      description: string
      amount: number
      discountAmount: number | null
      discountUntil: string | null
    }[] = []

    for (const email of relevant) {
      // Skip if this email was already imported.
      const { data: existing } = await db.from("multas").select("id").eq("email_id", email.emailId).maybeSingle()
      if (existing) continue

      const { error } = await db.from("multas").insert({
        plate: email.plate,
        code: email.code,
        description: email.description,
        location: email.location,
        infraction_date: email.infractionDate,
        amount: email.amount,
        status: "pendiente",
        source: "email",
        email_id: email.emailId,
        discount_until: email.discountUntil,
        discount_amount: email.discountAmount,
      })
      if (error) continue

      newlyRegistered.push({
        code: email.code,
        plate: email.plate,
        description: email.description,
        amount: email.amount,
        discountAmount: email.discountAmount,
        discountUntil: email.discountUntil,
      })
    }

    return {
      gmailConnected: gmailConfigured(),
      mode: gmailConfigured() ? ("gmail" as const) : ("demo" as const),
      scanned: relevant.length,
      newCount: newlyRegistered.length,
      newMultas: newlyRegistered,
      note: gmailConfigured()
        ? undefined
        : "Gmail no está conectado: se usó una bandeja de demostración. Configurá GMAIL_CLIENT_ID/SECRET/REFRESH_TOKEN para leer tu casilla real.",
    }
  },
})
