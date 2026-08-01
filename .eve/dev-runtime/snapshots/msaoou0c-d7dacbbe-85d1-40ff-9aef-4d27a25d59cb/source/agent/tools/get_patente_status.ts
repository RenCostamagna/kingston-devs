import { defineTool } from "eve/tools"
import { z } from "zod"

import { findVehicleByPlate } from "../../lib/vehicles"

export default defineTool({
  description:
    "Consulta el estado de la patente de un vehículo por su número de patente (dominio). Devuelve marca, modelo, estado (al_dia/pendiente/vencida), período, monto adeudado y vencimiento.",
  inputSchema: z.object({
    plate: z.string().min(3).describe("Número de patente / dominio, ej: 'AB123CD' o 'AE 482 KP'"),
  }),
  async execute({ plate }) {
    const vehicle = await findVehicleByPlate(plate)
    if (!vehicle) {
      return { found: false as const, message: `No encontré ningún vehículo con la patente ${plate}.` }
    }
    return {
      found: true as const,
      vehicleId: vehicle.id,
      plate: vehicle.plate,
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      patenteStatus: vehicle.patente_status,
      period: vehicle.patente_period,
      amountDue: vehicle.patente_amount_due,
      dueDate: vehicle.patente_due_date,
    }
  },
})
