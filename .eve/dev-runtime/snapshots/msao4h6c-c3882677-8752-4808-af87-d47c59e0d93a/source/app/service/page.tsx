import { Wrench } from "lucide-react"

import { ModulePlaceholder } from "@/components/module-placeholder"

export default function ServicePage() {
  return (
    <ModulePlaceholder
      title="Service"
      subtitle="Agendá tu turno"
      icon={Wrench}
      description="Vas a poder reservar turnos de mantenimiento y seguir el historial de service de tu auto."
    />
  )
}
