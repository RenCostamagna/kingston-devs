import { defineTool } from "eve/tools"
import { z } from "zod"

import { formatARS } from "../../lib/db"
import { findMockVehicleByPlate } from "../../lib/mock-plates"
import { findVehicleByPlate } from "../../lib/vehicles"

export default defineTool({
  description:
    "Busca el link oficial de pago de la patente de un vehículo, si el email del organismo lo traía. No cobra ni genera ningún checkout propio — solo informa. Requiere confirmar el pago después con confirm_patente_payment cuando el usuario avise que ya pagó.",
  inputSchema: z.object({
    plate: z.string().min(3).describe("Número de patente / dominio del vehículo"),
  }),
  async execute({ plate }) {
    const vehicle = findMockVehicleByPlate(plate) ?? (await findVehicleByPlate(plate))
    if (!vehicle) return { found: false as const, message: `No encontré un vehículo con la patente ${plate}.` }
    if (vehicle.patente_status === "al_dia" || Number(vehicle.patente_amount_due) <= 0) {
      return { found: true as const, alreadyPaid: true as const, message: "La patente ya está al día, no hay saldo pendiente." }
    }

    const amount = Number(vehicle.patente_amount_due)
    const amountLabel = formatARS(amount)

    if (vehicle.payment_url) {
      return {
        found: true as const,
        alreadyPaid: false as const,
        hasPaymentUrl: true as const,
        plate: vehicle.plate,
        period: vehicle.patente_period,
        amountDue: amount,
        amountDueLabel: amountLabel,
        paymentUrl: vehicle.payment_url,
        message: `Link oficial de pago para la patente ${vehicle.plate} (${amountLabel}): ${vehicle.payment_url}`,
      }
    }

    return {
      found: true as const,
      alreadyPaid: false as const,
      hasPaymentUrl: false as const,
      plate: vehicle.plate,
      period: vehicle.patente_period,
      amountDue: amount,
      amountDueLabel: amountLabel,
      paymentUrl: null,
      message: `No encontré un link de pago oficial en el aviso de esta patente. Hay que pagarla directamente por el organismo/canal que la emitió.`,
    }
  },
})
