"use client"

import { useState } from "react"
import { SlidersHorizontal } from "lucide-react"

import { FeatureIcon } from "@/components/feature-icon"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel, FieldSet, FieldLegend } from "@/components/ui/field"
import { Slider } from "@/components/ui/slider"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { featureLabels, type ParkingFeature } from "@/lib/mock-data"
import { formatCurrency, formatKm } from "@/lib/format"

export type Filters = {
  maxPrice: number
  maxDistance: number
  schedule: string
  features: ParkingFeature[]
}

export const defaultFilters: Filters = {
  maxPrice: 1000,
  maxDistance: 6,
  schedule: "cualquiera",
  features: [],
}

const scheduleOptions = [
  { value: "cualquiera", label: "Cualquiera" },
  { value: "manana", label: "Mañana" },
  { value: "tarde", label: "Tarde" },
  { value: "24hs", label: "24 hs" },
]

const featureOptions: ParkingFeature[] = ["techada", "camara", "grande", "seguridad", "electrico", "24hs"]

export function FiltersSheet({
  filters,
  onApply,
  activeCount,
}: {
  filters: Filters
  onApply: (f: Filters) => void
  activeCount: number
}) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="outline" size="sm" className="relative shrink-0 rounded-full">
            <SlidersHorizontal data-icon="inline-start" />
            Filtros
            {activeCount > 0 && (
              <span className="ml-1 flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                {activeCount}
              </span>
            )}
          </Button>
        }
      />
      <SheetContent side="bottom" className="mx-auto max-w-md rounded-t-3xl">
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
          <SheetDescription>Ajustá la búsqueda según lo que necesites.</SheetDescription>
        </SheetHeader>

        <FiltersForm filters={filters} onApply={onApply} />
      </SheetContent>
    </Sheet>
  )
}

function FiltersForm({ filters, onApply }: { filters: Filters; onApply: (f: Filters) => void }) {
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice)
  const [maxDistance, setMaxDistance] = useState(filters.maxDistance)
  const [schedule, setSchedule] = useState(filters.schedule)
  const [features, setFeatures] = useState<ParkingFeature[]>(filters.features)

  return (
    <form
      className="flex flex-col gap-6 overflow-y-auto px-4 pb-2"
      onSubmit={(e) => {
        e.preventDefault()
        onApply({ maxPrice, maxDistance, schedule, features })
      }}
    >
      <Field>
        <FieldLabel>Precio máximo por hora</FieldLabel>
        <div className="flex flex-col gap-2">
          <Slider
            min={400}
            max={1000}
            step={20}
            value={[maxPrice]}
            onValueChange={(v) => setMaxPrice(Array.isArray(v) ? v[0] : v)}
          />
          <span className="text-sm font-semibold text-primary">{formatCurrency(maxPrice)}</span>
        </div>
      </Field>

      <Field>
        <FieldLabel>Distancia máxima</FieldLabel>
        <div className="flex flex-col gap-2">
          <Slider
            min={1}
            max={6}
            step={0.5}
            value={[maxDistance]}
            onValueChange={(v) => setMaxDistance(Array.isArray(v) ? v[0] : v)}
          />
          <span className="text-sm font-semibold text-primary">{formatKm(maxDistance)}</span>
        </div>
      </Field>

      <FieldSet>
        <FieldLegend>Horario</FieldLegend>
        <ToggleGroup
          value={schedule ? [schedule] : []}
          onValueChange={(v) => v[0] && setSchedule(v[0])}
          className="flex-wrap justify-start"
        >
          {scheduleOptions.map((o) => (
            <ToggleGroupItem key={o.value} value={o.value} className="rounded-full px-4">
              {o.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </FieldSet>

      <FieldSet>
        <FieldLegend>Características</FieldLegend>
        <ToggleGroup
          multiple
          value={features}
          onValueChange={(v) => setFeatures(v as ParkingFeature[])}
          className="flex-wrap justify-start"
        >
          {featureOptions.map((f) => (
            <ToggleGroupItem key={f} value={f} className="rounded-full px-4">
              <FeatureIcon feature={f} />
              {featureLabels[f]}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </FieldSet>

      <SheetFooter className="flex-row gap-3 px-0">
        <SheetClose
          render={
            <Button type="button" variant="outline" className="flex-1" onClick={() => onApply(defaultFilters)}>
              Limpiar
            </Button>
          }
        />
        <SheetClose render={<Button type="submit" className="flex-1">Aplicar</Button>} />
      </SheetFooter>
    </form>
  )
}
