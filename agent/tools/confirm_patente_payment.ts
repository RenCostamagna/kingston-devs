import { defineTool } from "eve/tools"
import { always } from "eve/tools/approval"
import { z } from "zod"

import { findMockVehicleByPlate } from "../../lib/mock-plates"
import { findVehicleByPlate, markVehiclePatentePaid } from "../../lib/vehicles"

export default defineTool({
  description:
    "Marca la patente de un vehículo como al día porque el usuario avisó que ya la pagó por el canal oficial. No hay forma de verificarlo automáticamente (el pago no pasa por nuestro sistema) — es la palabra del usuario. Requiere confirmación humana antes de aplicar el cambio. No aplica a patentes de demostración (mock).",
  inputSchema: z.object({
    plate: z.string().min(3).describe("Patente del vehículo que el usuario dice haber pagado"),
  }),
  approval: always(),
  async execute({ plate }) {
    if (findMockVehicleByPlate(plate)) {
      return { ok: false as const, message: "Esta patente es de demostración y no está conectada a un registro real para confirmar el pago." }
    }
    const vehicle = await findVehicleByPlate(plate)
    if (!vehicle) return { ok: false as const, message: `No encontré un vehículo con la patente ${plate}.` }
    if (vehicle.patente_status === "al_dia") {
      return { ok: true as const, message: "Ya figuraba al día." }
    }
    await markVehiclePatentePaid(vehicle.id)
    return {
      ok: true as const,
      plate: vehicle.plate,
      message: `Listo, marqué la patente ${vehicle.plate} como al día.`,
    }
  },
})
