import { defineTool } from "eve/tools"
import { z } from "zod"

import { fetchMultasRosario } from "../../lib/rosario"

export default defineTool({
  description:
    "Consulta EN VIVO las multas/actas de infracción de una patente en el sitio oficial de la Municipalidad de Rosario (rosario.gob.ar). Supera el reCAPTCHA v3 con un navegador headless. Devuelve las multas vigentes SIN guardarlas en la base de datos (son solo para mostrar). Usar cuando el usuario pida consultar multas de Rosario o el estado de actas de una patente en el municipio.",
  inputSchema: z.object({
    plate: z
      .string()
      .min(6)
      .describe("Patente a consultar (formato viejo AAA123 o Mercosur AB123CD). Se normaliza sola."),
  }),
  async execute({ plate }) {
    const result = await fetchMultasRosario(plate)

    const total = result.multas.reduce((sum, m) => sum + m.amount, 0)

    return {
      source: "rosario.gob.ar",
      mode: result.mode, // "live" | "demo"
      plate: result.plate,
      libreMulta: result.libreMulta,
      count: result.multas.length,
      total,
      multas: result.multas,
      persisted: false,
      note: result.note,
    }
  },
})
