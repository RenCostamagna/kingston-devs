import { AgentChat } from "@/components/agent/agent-chat"

export default async function MultasPage({
  searchParams,
}: {
  searchParams: Promise<{ multaId?: string }>
}) {
  const { multaId } = await searchParams

  return (
    <AgentChat
      title="Asistente de multas"
      subtitle="En línea · IA · conectado a Gmail"
      greeting="Hola, soy tu asistente de multas. Puedo revisar tu Gmail para detectar infracciones nuevas, listarte las multas de una patente y decirte cómo pagarlas. ¿Con qué patente arrancamos?"
      suggestions={["Revisá mi Gmail por multas nuevas", "Multas de la patente AB123CD", "Cómo pago mis multas de AB123CD"]}
      autoStart={multaId ? { message: `Quiero saber cómo pagar la multa ${multaId}` } : undefined}
    />
  )
}
