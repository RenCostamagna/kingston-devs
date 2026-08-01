import { AgentChat } from "@/components/agent/agent-chat"

export default function PatentePage() {
  return (
    <div className="mx-auto min-h-dvh max-w-md">
      <AgentChat
        title="Asistente de patente"
        subtitle="En línea · IA"
        greeting="Hola, soy tu asistente de patente. Pasame tu patente (ej: AB123CD) y te digo el estado, vencimientos y podés pagarla acá mismo."
        suggestions={["Estado de la patente AB123CD", "¿Cuánto debo de patente AD789GH?", "Pagar patente AB123CD"]}
      />
    </div>
  )
}
