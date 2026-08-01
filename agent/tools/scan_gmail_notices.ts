import { defineTool } from "eve/tools"
import { z } from "zod"

import { scanVehicleNotices } from "../../lib/vehicle-scan"

export default defineTool({
  description:
    "Revisa la casilla de Gmail conectada en busca de emails nuevos de multas/infracciones y de vencimiento/renovación de patente, los parsea y registra lo que no esté cargado todavía. Devuelve las multas nuevas y los cambios de patente encontrados. Usar cuando el usuario pida 'revisar el mail', 'buscar multas nuevas', 'ver si venció la patente' o similar.",
  inputSchema: z.object({
    plate: z
      .string()
      .optional()
      .describe("Opcional: filtrar por una patente específica. Si se omite, revisa todas."),
  }),
  async execute({ plate }) {
    const result = await scanVehicleNotices({ plate })
    return {
      gmailConnected: result.mode === "gmail",
      mode: result.mode,
      newMultasCount: result.newMultas.length,
      newMultas: result.newMultas,
      updatedPatentesCount: result.updatedPatentes.length,
      updatedPatentes: result.updatedPatentes,
      note:
        result.mode === "demo"
          ? "Gmail no está conectado: se usó una bandeja de demostración. Configurá GMAIL_CLIENT_ID/SECRET/REFRESH_TOKEN para leer tu casilla real."
          : undefined,
    }
  },
})
