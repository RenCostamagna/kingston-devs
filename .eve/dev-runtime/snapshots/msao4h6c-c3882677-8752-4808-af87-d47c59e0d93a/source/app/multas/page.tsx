import { AgentChat } from "@/components/agent/agent-chat"

export default function MultasPage() {
  return (
    <div className="mx-auto min-h-dvh max-w-md">
      <AgentChat
        title="Asistente de multas"
        subtitle="En línea · IA · conectado a Gmail"
        greeting="Hola, soy tu asistente de multas. Puedo revisar tu Gmail para detectar infracciones nuevas, listarte las multas de una patente y pagarlas. ¿Con qué patente arrancamos?"
        suggestions={["Revisá mi Gmail por multas nuevas", "Multas de la patente AB123CD", "Pagar mis multas de AB123CD"]}
      />
    </div>
  )
}
