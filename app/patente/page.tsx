import { AgentChat } from "@/components/agent/agent-chat"

export default async function PatentePage({
  searchParams,
}: {
  searchParams: Promise<{ plate?: string }>
}) {
  const { plate } = await searchParams

  return (
    <AgentChat
      title="Asistente de patente"
      subtitle="En línea · IA"
      greeting="Hola, soy tu asistente de patente. Pasame tu patente (ej: AB123CD) y te digo el estado, vencimientos y cómo pagarla."
      suggestions={["Estado de la patente AB123CD", "¿Cuánto debo de patente AD789GH?", "Cómo pago la patente AB123CD"]}
      autoStart={plate ? { message: `Quiero saber cómo pagar la patente ${plate}` } : undefined}
    />
  )
}
