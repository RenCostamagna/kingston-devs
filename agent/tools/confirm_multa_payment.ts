import { defineTool } from "eve/tools"
import { always } from "eve/tools/approval"
import { z } from "zod"

import { findMockMultaById } from "../../lib/mock-plates"
import { getMultaById, markMultaPaid } from "../../lib/vehicles"

export default defineTool({
  description:
    "Marca una multa como pagada porque el usuario avisó que ya la pagó por el canal oficial. No hay forma de verificarlo automáticamente (el pago no pasa por nuestro sistema) — es la palabra del usuario. Requiere confirmación humana antes de aplicar el cambio. No aplica a multas de demostración (mock).",
  inputSchema: z.object({
    multaId: z.string().describe("Id de la multa que el usuario dice haber pagado"),
  }),
  approval: always(),
  async execute({ multaId }) {
    if (findMockMultaById(multaId)) {
      return { ok: false as const, message: "Esta multa es de demostración y no está conectada a un registro real para confirmar el pago." }
    }
    const multa = await getMultaById(multaId)
    if (!multa) return { ok: false as const, message: "No encontré esa multa." }
    if (multa.status === "pagada") {
      return { ok: true as const, message: "Ya figuraba como pagada." }
    }
    await markMultaPaid(multaId)
    return {
      ok: true as const,
      multaId,
      code: multa.code,
      message: `Listo, marqué la multa ${multa.code ?? multaId} como pagada.`,
    }
  },
})
