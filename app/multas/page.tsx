import { AgentChat } from "@/components/agent/agent-chat"

export default function MultasPage() {
  return (
    <div className="mx-auto min-h-dvh max-w-md">
      <AgentChat
        title="Asistente de multas"
        subtitle="En línea · IA · Rosario + Gmail"
        greeting="Hola, soy tu asistente de multas. Puedo consultar tus actas en el sitio de la Municipalidad de Rosario, revisar tu Gmail por infracciones nuevas y ayudarte a pagarlas. ¿Con qué patente arrancamos?"
        suggestions={[
          "Consultá mis multas en Rosario de la patente AB123CD",
          "Revisá mi Gmail por multas nuevas",
          "Pagar mis multas de AB123CD",
        ]}
      />
    </div>
  )
}
