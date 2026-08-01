"use client"

import { useState } from "react"
import { Gauge, Plus, TrendingUp, X } from "lucide-react"
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
} from "@/components/ui/dialog"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { addOdometerReading, removeOdometerReading, type GarageVehicle } from "@/lib/profile"
import { daysBetween, formatDate, formatKm, relativeDays, type MileageInfo } from "@/lib/vehicle-insights"

export function OdometerSection({
  vehicle,
  mileage,
  today,
}: {
  vehicle: GarageVehicle
  mileage: MileageInfo
  today: string
}) {
  const [open, setOpen] = useState(false)
  const [km, setKm] = useState("")
  const [date, setDate] = useState(today)

  const readings = [...vehicle.records.odometer].sort((a, b) => b.date.localeCompare(a.date))
  const previous = mileage.lastDate
  const kmNumber = Number(km)

  // No se puede retroceder el odómetro ni registrar una lectura futura.
  const kmError =
    km === "" ? "Ingresá el kilometraje." : kmNumber < mileage.lastKm ? "No puede ser menor a la última lectura." : null
  const dateError = date > today ? "La fecha no puede ser futura." : !date ? "Elegí una fecha." : null
  const canSave = !kmError && !dateError

  function openDialog() {
    // Precargamos la estimación: el usuario solo confirma o corrige.
    setKm(String(mileage.estimatedKm))
    setDate(today)
    setOpen(true)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!canSave) return
    addOdometerReading(vehicle.id, kmNumber, date)
    toast.success(`Kilometraje actualizado a ${formatKm(kmNumber)}`)
    setOpen(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Gauge className="size-4 text-primary" />
              {mileage.source === "sin-lecturas" ? "Kilometraje" : "Kilometraje estimado hoy"}
            </span>
            <p className="text-2xl font-bold tabular-nums">{formatKm(mileage.estimatedKm)}</p>
            <p className="text-xs text-muted-foreground">
              {previous
                ? `Última lectura: ${formatKm(mileage.lastKm)} · ${formatDate(previous)}`
                : "Todavía no registraste ninguna lectura."}
            </p>
          </div>
          <Button size="sm" className="rounded-full" onClick={openDialog}>
            <Plus />
            Actualizar
          </Button>
        </div>

        {mileage.source !== "sin-lecturas" ? (
          <p className="mt-3 flex items-center gap-1.5 border-t border-border pt-3 text-xs text-muted-foreground">
            <TrendingUp className="size-3.5 shrink-0 text-primary" />
            {mileage.source === "historial"
              ? `Recorrés unos ${Math.round(mileage.kmPerDay)} km por día según tu historial.`
              : `Estimado con un promedio de ${Math.round(mileage.kmPerDay)} km por día para uso ${vehicle.use.toLowerCase()}.`}
          </p>
        ) : null}
      </div>

      {mileage.needsUpdate ? (
        <div className="rounded-2xl border border-accent/40 bg-accent/10 p-3 text-xs text-foreground">
          {previous
            ? `Pasaron ${mileage.daysSinceReading} días desde tu última lectura. Confirmá el odómetro para mantener precisos los avisos de service.`
            : "Cargá tu primera lectura para calcular vencimientos de service por kilometraje."}
        </div>
      ) : null}

      {readings.length > 0 ? (
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium text-muted-foreground">Historial de lecturas</p>
          <ul className="flex flex-col">
            {readings.slice(0, 5).map((r) => (
              <li
                key={r.id}
                className="flex items-center justify-between gap-3 border-b border-border py-2 last:border-0"
              >
                <span className="text-sm font-medium tabular-nums">{formatKm(r.km)}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {formatDate(r.date)} · {relativeDays(daysBetween(today, r.date))}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7 shrink-0 text-muted-foreground"
                  onClick={() => removeOdometerReading(vehicle.id, r.id)}
                >
                  <X className="size-3.5" />
                  <span className="sr-only">Eliminar lectura del {formatDate(r.date)}</span>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Actualizar kilometraje</DialogTitle>
            <DialogDescription>
              Precargamos el valor estimado. Confirmalo o corregilo con lo que marca el tablero.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <FieldGroup>
              <Field data-invalid={kmError ? true : undefined}>
                <FieldLabel htmlFor="odo-km">Kilometraje actual</FieldLabel>
                <Input
                  id="odo-km"
                  inputMode="numeric"
                  autoFocus
                  value={km}
                  aria-invalid={!!kmError}
                  onChange={(e) => setKm(e.target.value.replace(/\D/g, "").slice(0, 7))}
                />
                {kmError ? (
                  <FieldError>{kmError}</FieldError>
                ) : (
                  <FieldDescription>Última lectura: {formatKm(mileage.lastKm)}.</FieldDescription>
                )}
              </Field>

              <Field data-invalid={dateError ? true : undefined}>
                <FieldLabel htmlFor="odo-date">Fecha de la lectura</FieldLabel>
                <Input
                  id="odo-date"
                  type="date"
                  max={today}
                  value={date}
                  aria-invalid={!!dateError}
                  onChange={(e) => setDate(e.target.value)}
                />
                {dateError ? <FieldError>{dateError}</FieldError> : null}
              </Field>
            </FieldGroup>

            <DialogFooter>
              <DialogClose render={<Button type="button" variant="outline" />}>Cancelar</DialogClose>
              <Button type="submit" disabled={!canSave}>
                Guardar lectura
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
