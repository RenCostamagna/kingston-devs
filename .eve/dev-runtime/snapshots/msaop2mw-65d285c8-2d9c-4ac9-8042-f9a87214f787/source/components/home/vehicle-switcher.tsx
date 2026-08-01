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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
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
import { useAcaraBrands, useAcaraModels } from "@/hooks/use-acara"
import { addVehicle, defaultProfile, selectVehicle, useGarage } from "@/lib/profile"
import { formatPlate, normalizePlate, validatePlate, validateYear } from "@/lib/vehicle-validation"
import type { FuelType, VehicleUse } from "@/lib/mock-data"

const FUEL_OPTIONS: FuelType[] = ["Nafta", "Diésel", "GNC", "Híbrido", "Eléctrico"]

type Form = {
  brandId: number | null
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
  brandId: null,
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
  const [touched, setTouched] = useState({ year: false, plate: false })

  const { brands, isLoading: loadingBrands, error: brandsError } = useAcaraBrands()
  const { models, isLoading: loadingModels } = useAcaraModels(form.brandId)

  const yearError = validateYear(form.year)
  const plateError = validatePlate(form.plate)
  const canSave = !!form.brand && !!form.model && !yearError && !plateError

  function set<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function handleBrandChange(brandName: string) {
    const brand = brands.find((b) => b.name === brandName)
    // Al cambiar de marca los modelos ya no aplican.
    setForm((f) => ({ ...f, brand: brandName, brandId: brand?.id ?? null, model: "" }))
  }

  function reset() {
    setForm(emptyForm)
    setTouched({ year: false, plate: false })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setTouched({ year: true, plate: true })
    if (!canSave) return

    addVehicle({
      brand: form.brand,
      model: form.model,
      year: Number(form.year),
      plate: formatPlate(form.plate),
      mileage: Number(form.mileage) || 0,
      fuel: form.fuel,
      use: form.use,
      zone: form.zone.trim() || defaultProfile.zone,
      preference: defaultProfile.preference,
    })

    toast.success(`${form.brand} ${form.model} agregado a tu garage`)
    reset()
    setOpen(false)
  }

  const brandPlaceholder = loadingBrands
    ? "Cargando marcas…"
    : brandsError
      ? "No disponible"
      : "Elegí la marca"

  const modelPlaceholder = !form.brandId
    ? "Elegí primero la marca"
    : loadingModels
      ? "Cargando modelos…"
      : "Elegí el modelo"

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

      <Dialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next)
          if (!next) reset()
        }}
      >
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
                <Select
                  value={form.brand || null}
                  onValueChange={(value) => handleBrandChange(value as string)}
                  items={brands.map((b) => ({ value: b.name, label: b.name }))}
                  disabled={loadingBrands || !!brandsError}
                >
                  <SelectTrigger id="new-brand" className="w-full">
                    <SelectValue placeholder={brandPlaceholder} />
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false} align="start" className="max-h-72">
                    <SelectGroup>
                      {brands.map((b) => (
                        <SelectItem key={b.id} value={b.name}>
                          {b.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FieldDescription>
                  {brandsError
                    ? "No pudimos conectar con la guía de ACARA. Probá de nuevo más tarde."
                    : "Marcas de la Guía Oficial de Precios de ACARA."}
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="new-model">Modelo</FieldLabel>
                <Select
                  value={form.model || null}
                  onValueChange={(value) => set("model", value as string)}
                  items={models.map((m) => ({ value: m.name, label: m.name }))}
                  disabled={!form.brandId || loadingModels || models.length === 0}
                >
                  <SelectTrigger id="new-model" className="w-full">
                    <SelectValue placeholder={modelPlaceholder} />
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false} align="start" className="max-h-72">
                    <SelectGroup>
                      {models.map((m) => (
                        <SelectItem key={m.id} value={m.name}>
                          {m.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>

              <div className="flex gap-3">
                <Field className="flex-1" data-invalid={touched.year && yearError ? true : undefined}>
                  <FieldLabel htmlFor="new-year">Año</FieldLabel>
                  <Input
                    id="new-year"
                    inputMode="numeric"
                    placeholder="2022"
                    value={form.year}
                    aria-invalid={touched.year && !!yearError}
                    onBlur={() => setTouched((t) => ({ ...t, year: true }))}
                    onChange={(e) => set("year", e.target.value.replace(/\D/g, "").slice(0, 4))}
                  />
                  {touched.year && yearError ? <FieldError>{yearError}</FieldError> : null}
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

              <Field data-invalid={touched.plate && plateError ? true : undefined}>
                <FieldLabel htmlFor="new-plate">Patente</FieldLabel>
                <Input
                  id="new-plate"
                  placeholder="AE482KP"
                  autoCapitalize="characters"
                  autoComplete="off"
                  value={form.plate}
                  aria-invalid={touched.plate && !!plateError}
                  onBlur={() => setTouched((t) => ({ ...t, plate: true }))}
                  onChange={(e) => set("plate", normalizePlate(e.target.value).slice(0, 7))}
                />
                {touched.plate && plateError ? (
                  <FieldError>{plateError}</FieldError>
                ) : (
                  <FieldDescription>Formato argentino: AAA123 o AA123BB.</FieldDescription>
                )}
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
