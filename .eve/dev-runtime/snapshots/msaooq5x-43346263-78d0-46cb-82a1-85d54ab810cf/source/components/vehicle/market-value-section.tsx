import { ExternalLink, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { GarageVehicle } from "@/lib/profile"

const ACARA_GUIDE = "https://www.acara.org.ar/guia-oficial-de-precios"

export function MarketValueSection({ vehicle }: { vehicle: GarageVehicle }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15">
          <TrendingUp className="size-4 text-primary" />
        </span>
        <div className="flex min-w-0 flex-col">
          <p className="text-sm font-medium">
            {vehicle.brand} {vehicle.model} {vehicle.year}
          </p>
          <p className="text-xs text-muted-foreground">
            Valuación de referencia de la Comisión de Valuación de Vehículos Usados de ACARA.
          </p>
        </div>
      </div>

      <p className="text-xs leading-relaxed text-muted-foreground">
        ACARA publica las marcas y modelos de forma abierta, pero la tabla de precios por año solo se
        entrega a usuarios registrados en su sitio. Consultá el valor de tu versión en la guía oficial.
      </p>

      <Button
        render={
          <a href={ACARA_GUIDE} target="_blank" rel="noopener noreferrer">
            Ver en la guía de ACARA
            <ExternalLink />
          </a>
        }
        nativeButton={false}
        variant="outline"
        size="sm"
        className="w-full rounded-full no-underline"
      />
    </div>
  )
}
