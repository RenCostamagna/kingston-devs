import { defineTool } from "eve/tools"
import { always } from "eve/tools/approval"
import { z } from "zod"

import { formatARS } from "../../lib/db"
import { createCheckoutSession } from "../../lib/stripe"
import { getMultaById, markMultaPaid, recordPayment } from "../../lib/vehicles"

export default defineTool({
  description:
    "Paga una multa/infracción por su id. El monto lo determina el servidor desde la base de datos (aplica descuento por pago voluntario si sigue vigente). Requiere confirmación humana antes de cobrar.",
  inputSchema: z.object({
    multaId: z.string().describe("Id de la multa a pagar (de list_multas o scan_gmail_multas)"),
  }),
  approval: always(),
  async execute({ multaId }) {
    const multa = await getMultaById(multaId)
    if (!multa) return { ok: false as const, message: "No encontré esa multa." }
    if (multa.status === "pagada") {
      return { ok: false as const, message: "Esa multa ya figura como pagada." }
    }

    // Server-side amount: apply the voluntary-payment discount only if still valid.
    const today = new Date().toISOString().slice(0, 10)
    const discountValid =
      multa.discount_amount != null && multa.discount_until != null && multa.discount_until >= today
    const amount = discountValid ? Number(multa.discount_amount) : Number(multa.amount)

    // Idempotency: one settled payment per multa.
    const idempotencyKey = `multa:${multa.id}`

    const checkout = await createCheckoutSession({
      description: `Multa ${multa.code ?? multa.id} - ${multa.plate}`,
      amount,
      successPath: `/multas?paid=${multa.id}`,
      cancelPath: `/multas?canceled=${multa.id}`,
      metadata: { kind: "multa", multaId: multa.id, plate: multa.plate },
      idempotencyKey,
    })

    // In this demo we settle immediately upon approval and record the payment.
    await recordPayment({
      kind: "multa",
      referenceId: multa.id,
      plate: multa.plate,
      amount,
      status: "paid",
      stripeSessionId: checkout.id,
      idempotencyKey,
    })
    await markMultaPaid(multa.id)

    return {
      ok: true as const,
      multaId: multa.id,
      code: multa.code,
      plate: multa.plate,
      amountPaid: amount,
      amountPaidLabel: formatARS(amount),
      discountApplied: discountValid,
      checkoutUrl: checkout.url,
      message: `Pago realizado: ${formatARS(amount)} por la multa ${multa.code ?? multa.id}. La infracción quedó como pagada.`,
    }
  },
})
