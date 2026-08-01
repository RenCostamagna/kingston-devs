import { defineTool } from "eve/tools"
import { z } from "zod"

import { formatARS } from "../../lib/db"
import { findMockMultaById } from "../../lib/mock-plates"
import { getMultaById } from "../../lib/vehicles"

// Official portal for consulting/paying traffic-fine actas in Rosario.
// Used as the fallback suggestion when a multa's own email had no direct
// payment link — this is the sanctioned reference site for that municipality,
// not a link we scrape or automate against.
const ROSARIO_MULTAS_URL = "https://www.rosario.gob.ar/gdm/patente.do?accion=ir"

export default defineTool({
  description:
    "Busca el link oficial de pago de una multa/infracción por su id, si el email del organismo lo traía. No cobra ni genera ningún checkout propio — solo informa. Requiere confirmar el pago después con confirm_multa_payment cuando el usuario avise que ya pagó.",
  inputSchema: z.object({
    multaId: z.string().describe("Id de la multa a pagar (de list_multas o scan_gmail_notices)"),
  }),
  async execute({ multaId }) {
    const multa = findMockMultaById(multaId) ?? (await getMultaById(multaId))
    if (!multa) return { found: false as const, message: "No encontré esa multa." }
    if (multa.status === "pagada") {
      return { found: true as const, alreadyPaid: true as const, message: "Esa multa ya figura como pagada." }
    }

    const today = new Date().toISOString().slice(0, 10)
    const discountValid =
      multa.discount_amount != null && multa.discount_until != null && multa.discount_until >= today
    const amount = discountValid ? Number(multa.discount_amount) : Number(multa.amount)
    const amountLabel = formatARS(amount)

    if (multa.payment_url) {
      return {
        found: true as const,
        alreadyPaid: false as const,
        hasPaymentUrl: true as const,
        multaId: multa.id,
        code: multa.code,
        plate: multa.plate,
        amountDue: amount,
        amountDueLabel: amountLabel,
        discountApplied: discountValid,
        paymentUrl: multa.payment_url,
        message: `Link oficial de pago para la multa ${multa.code ?? multa.id} (${amountLabel}): ${multa.payment_url}`,
      }
    }

    return {
      found: true as const,
      alreadyPaid: false as const,
      hasPaymentUrl: false as const,
      multaId: multa.id,
      code: multa.code,
      plate: multa.plate,
      amountDue: amount,
      amountDueLabel: amountLabel,
      discountApplied: discountValid,
      paymentUrl: null,
      suggestedConsultUrl: ROSARIO_MULTAS_URL,
      message: `El aviso de esta multa no traía un link de pago directo. Podés consultarla y ver las opciones de pago en el portal de Multas de tránsito de Rosario: ${ROSARIO_MULTAS_URL}`,
    }
  },
})
