"use client"

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
  return (
    <form
      className="flex flex-col gap-6 overflow-y-auto px-4 pb-2"
      onSubmit={(e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        onApply({
          maxPrice: Number(data.get("maxPrice")),
          maxDistance: Number(data.get("maxDistance")),
          schedule: String(data.get("schedule") || "cualquiera"),
          features: (data.getAll("features") as ParkingFeature[]) ?? [],
        })
      }}
    >
      <Field>
        <FieldLabel>Precio máximo por hora</FieldLabel>
        <PriceControl defaultValue={filters.maxPrice} />
      </Field>

      <Field>
        <FieldLabel>Distancia máxima</FieldLabel>
        <DistanceControl defaultValue={filters.maxDistance} />
      </Field>

      <FieldSet>
        <FieldLegend>Horario</FieldLegend>
        <ToggleGroup type="single" name="schedule" defaultValue={filters.schedule} className="flex-wrap justify-start">
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
          type="multiple"
          name="features"
          defaultValue={filters.features}
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

function PriceControl({ defaultValue }: { defaultValue: number }) {
  return (
    <div className="flex flex-col gap-2">
      <input type="hidden" name="maxPrice" defaultValue={defaultValue} id="maxPrice-input" />
      <Slider
        min={400}
        max={1000}
        step={20}
        defaultValue={[defaultValue]}
        onValueChange={(v) => {
          const input = document.getElementById("maxPrice-input") as HTMLInputElement | null
          if (input) input.value = String(v[0])
          const label = document.getElementById("maxPrice-label")
          if (label) label.textContent = formatCurrency(v[0])
        }}
      />
      <span id="maxPrice-label" className="text-sm font-semibold text-primary">
        {formatCurrency(defaultValue)}
      </span>
    </div>
  )
}

function DistanceControl({ defaultValue }: { defaultValue: number }) {
  return (
    <div className="flex flex-col gap-2">
      <input type="hidden" name="maxDistance" defaultValue={defaultValue} id="maxDistance-input" />
      <Slider
        min={1}
        max={6}
        step={0.5}
        defaultValue={[defaultValue]}
        onValueChange={(v) => {
          const input = document.getElementById("maxDistance-input") as HTMLInputElement | null
          if (input) input.value = String(v[0])
          const label = document.getElementById("maxDistance-label")
          if (label) label.textContent = formatKm(v[0])
        }}
      />
      <span id="maxDistance-label" className="text-sm font-semibold text-primary">
        {formatKm(defaultValue)}
      </span>
    </div>
  )
}
