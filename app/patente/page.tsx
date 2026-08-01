import { ReceiptText } from "lucide-react"

import { ModulePlaceholder } from "@/components/module-placeholder"

export default function PatentePage() {
  return (
    <ModulePlaceholder
      title="Patente"
      subtitle="Pagá tu patente"
      icon={ReceiptText}
      description="Vas a poder consultar vencimientos y pagar la patente de tu vehículo desde acá."
    />
  )
}
