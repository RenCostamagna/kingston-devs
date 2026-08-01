"use client"

import { useState } from "react"
import { Car, Plus } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { addVehicle, defaultProfile, selectVehicle, useGarage } from "@/lib/profile"
import type { FuelType, VehicleUse } from "@/lib/mock-data"

const FUEL_OPTIONS: FuelType[] = ["Nafta", "Diésel", "GNC", "Híbrido", "Eléctrico"]

type Form = {
  brand: string
  model: string
  year: string
  plate: string
  mileage: string
  fuel: FuelType
  use: VehicleUse
  zone: string
}

const emptyForm: Form = {
  brand: "",
  model: "",
  year: "",
  plate: "",
  mileage: "",
  fuel: "Nafta",
  use: "Particular",
  zone: "",
}

export function VehicleSwitcher() {
  const garage = useGarage()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<Form>(emptyForm)

  function set<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  const canSave = form.brand.trim().length > 0 && form.model.trim().length > 0 && form.plate.trim().length > 2

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!canSave) return

    addVehicle({
      brand: form.brand.trim(),
      model: form.model.trim(),
      year: Number(form.year) || new Date().getFullYear(),
      plate: form.plate.trim().toUpperCase(),
      mileage: Number(form.mileage) || 0,
      fuel: form.fuel,
      use: form.use,
      zone: form.zone.trim() || defaultProfile.zone,
      preference: defaultProfile.preference,
    })

    toast.success(`${form.brand.trim()} ${form.model.trim()} agregado a tu garage`)
    setForm(emptyForm)
    setOpen(false)
  }

  return (
    <div className="flex items-center gap-2">
      <Select
        value={garage.selectedId}
        onValueChange={(value) => selectVehicle(value as string)}
        items={garage.vehicles.map((v) => ({
          value: v.id,
          label: `${v.brand} ${v.model}`,
        }))}
      >
        <SelectTrigger className="h-11 flex-1 rounded-full" aria-label="Seleccionar vehículo">
          <Car className="text-primary" />
          <SelectValue placeholder="Elegí un vehículo" />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false} align="start">
          <SelectGroup>
            {garage.vehicles.map((v) => (
              <SelectItem key={v.id} value={v.id}>
                <span className="flex flex-col">
                  <span className="font-medium">
                    {v.brand} {v.model}
                  </span>
                  <span className="text-xs text-muted-foreground">{v.plate}</span>
                </span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={<Button variant="outline" size="icon" className="size-11 shrink-0 rounded-full" />}
        >
          <Plus />
          <span className="sr-only">Agregar vehículo</span>
        </DialogTrigger>
        <DialogContent className="max-h-[85dvh] overflow-y-auto sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Agregar vehículo</DialogTitle>
            <DialogDescription>
              Sumá otro auto a tu garage para cotizar seguros y buscar cocheras con sus datos.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="new-brand">Marca</FieldLabel>
                <Input
                  id="new-brand"
                  placeholder="Ej. Toyota"
                  value={form.brand}
                  onChange={(e) => set("brand", e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="new-model">Modelo</FieldLabel>
                <Input
                  id="new-model"
                  placeholder="Ej. Corolla"
                  value={form.model}
                  onChange={(e) => set("model", e.target.value)}
                />
              </Field>
              <div className="flex gap-3">
                <Field className="flex-1">
                  <FieldLabel htmlFor="new-year">Año</FieldLabel>
                  <Input
                    id="new-year"
                    inputMode="numeric"
                    placeholder="2022"
                    value={form.year}
                    onChange={(e) => set("year", e.target.value.replace(/\D/g, "").slice(0, 4))}
                  />
                </Field>
                <Field className="flex-1">
                  <FieldLabel htmlFor="new-mileage">Kilometraje</FieldLabel>
                  <Input
                    id="new-mileage"
                    inputMode="numeric"
                    placeholder="32000"
                    value={form.mileage}
                    onChange={(e) => set("mileage", e.target.value.replace(/\D/g, "").slice(0, 7))}
                  />
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="new-plate">Patente</FieldLabel>
                <Input
                  id="new-plate"
                  placeholder="AE 482 KP"
                  value={form.plate}
                  onChange={(e) => set("plate", e.target.value.toUpperCase().slice(0, 10))}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="new-zone">Zona habitual</FieldLabel>
                <Input
                  id="new-zone"
                  placeholder="Ej. Belgrano, CABA"
                  value={form.zone}
                  onChange={(e) => set("zone", e.target.value)}
                />
              </Field>
              <FieldSet>
                <FieldLegend className="text-sm">Combustible</FieldLegend>
                <ToggleGroup
                  value={[form.fuel]}
                  onValueChange={(v) => v[0] && set("fuel", v[0] as FuelType)}
                  variant="outline"
                  className="flex-wrap justify-start"
                >
                  {FUEL_OPTIONS.map((f) => (
                    <ToggleGroupItem key={f} value={f} className="rounded-full px-4">
                      {f}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </FieldSet>
              <FieldSet>
                <FieldLegend className="text-sm">Tipo de uso</FieldLegend>
                <ToggleGroup
                  value={[form.use]}
                  onValueChange={(v) => v[0] && set("use", v[0] as VehicleUse)}
                  variant="outline"
                  className="flex-wrap justify-start"
                >
                  <ToggleGroupItem value="Particular" className="rounded-full px-4">
                    Particular
                  </ToggleGroupItem>
                  <ToggleGroupItem value="Comercial" className="rounded-full px-4">
                    Comercial
                  </ToggleGroupItem>
                </ToggleGroup>
              </FieldSet>
            </FieldGroup>

            <DialogFooter>
              <DialogClose render={<Button type="button" variant="outline" />}>Cancelar</DialogClose>
              <Button type="submit" disabled={!canSave}>
                Guardar vehículo
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
