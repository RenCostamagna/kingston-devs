import { defineTool } from "eve/tools"
import { z } from "zod"

import { findMockVehicleByPlate, listMockMultasByPlate } from "../../lib/mock-plates"
import { listMultasByPlate } from "../../lib/vehicles"

export default defineTool({
  description:
    "Lista las multas / infracciones asociadas a una patente, con su estado (pendiente/pagada/en_proceso), monto, descripción, lugar y descuento por pago voluntario si corresponde.",
  inputSchema: z.object({
    plate: z.string().min(3).describe("Número de patente / dominio"),
    onlyPending: z.boolean().optional().describe("Si es true, devuelve solo las multas pendientes"),
  }),
  async execute({ plate, onlyPending }) {
    const multas = findMockVehicleByPlate(plate) ? listMockMultasByPlate(plate) : await listMultasByPlate(plate)
    const filtered = onlyPending ? multas.filter((m) => m.status === "pendiente") : multas
    return {
      plate,
      count: filtered.length,
      totalPending: filtered
        .filter((m) => m.status === "pendiente")
        .reduce((sum, m) => sum + Number(m.amount), 0),
      multas: filtered.map((m) => ({
        id: m.id,
        code: m.code,
        description: m.description,
        location: m.location,
        infractionDate: m.infraction_date,
        amount: Number(m.amount),
        status: m.status,
        source: m.source,
        discountUntil: m.discount_until,
        discountAmount: m.discount_amount != null ? Number(m.discount_amount) : null,
      })),
    }
  },
})
