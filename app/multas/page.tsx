import { TriangleAlert } from "lucide-react"

import { ModulePlaceholder } from "@/components/module-placeholder"

export default function MultasPage() {
  return (
    <ModulePlaceholder
      title="Multas"
      subtitle="Consultá infracciones"
      icon={TriangleAlert}
      description="Vas a poder ver y pagar las infracciones asociadas a tu patente desde acá."
    />
  )
}
