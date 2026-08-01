import { Droplets } from "lucide-react"

import { ModulePlaceholder } from "@/components/module-placeholder"

export default function LavaderoPage() {
  return (
    <ModulePlaceholder
      title="Lavadero"
      subtitle="Reservá un lavado"
      icon={Droplets}
      description="Vas a poder reservar turnos en lavaderos cercanos y elegir el tipo de lavado."
    />
  )
}
