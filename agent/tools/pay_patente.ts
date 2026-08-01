import { defineTool } from "eve/tools"
import { always } from "eve/tools/approval"
import { z } from "zod"

import { formatARS } from "../../lib/db"
import { createCheckoutSession } from "../../lib/stripe"
import { findVehicleByPlate, markVehiclePatentePaid, recordPayment } from "../../lib/vehicles"

export default defineTool({
  description:
    "Paga la patente de un vehículo identificado por su patente/dominio. El monto adeudado lo determina el servidor desde la base de datos. Requiere confirmación humana antes de cobrar.",
  inputSchema: z.object({
    plate: z.string().min(3).describe("Número de patente / dominio del vehículo a pagar"),
  }),
  approval: always(),
  async execute({ plate }) {
    const vehicle = await findVehicleByPlate(plate)
    if (!vehicle) return { ok: false as const, message: `No encontré un vehículo con la patente ${plate}.` }
    if (vehicle.patente_status === "al_dia" || Number(vehicle.patente_amount_due) <= 0) {
      return { ok: false as const, message: "La patente ya está al día, no hay saldo pendiente." }
    }

    const amount = Number(vehicle.patente_amount_due)
    const idempotencyKey = `patente:${vehicle.id}:${vehicle.patente_period ?? "actual"}`

    const checkout = await createCheckoutSession({
      description: `Patente ${vehicle.plate} - ${vehicle.patente_period ?? "período actual"}`,
      amount,
      successPath: `/patente?paid=${vehicle.id}`,
      cancelPath: `/patente?canceled=${vehicle.id}`,
      metadata: { kind: "patente", vehicleId: vehicle.id, plate: vehicle.plate },
      idempotencyKey,
    })

    await recordPayment({
      kind: "patente",
      referenceId: vehicle.id,
      plate: vehicle.plate,
      amount,
      status: "paid",
      stripeSessionId: checkout.id,
      idempotencyKey,
    })
    await markVehiclePatentePaid(vehicle.id)

    return {
      ok: true as const,
      plate: vehicle.plate,
      period: vehicle.patente_period,
      amountPaid: amount,
      amountPaidLabel: formatARS(amount),
      checkoutUrl: checkout.url,
      message: `Pago realizado: ${formatARS(amount)} por la patente ${vehicle.plate}. La patente quedó al día.`,
    }
  },
})
