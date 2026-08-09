"use client"

import { useState } from "react"
import { Fuel, Plus, X } from "lucide-react"
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
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { addFuelLog, removeFuelLog, type GarageVehicle } from "@/lib/profile"
import { formatDate, formatKm, formatMoney, getCostSummary } from "@/lib/vehicle-insights"

function Metric({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-2xl border border-border bg-card p-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-lg font-semibold tabular-nums">{value}</span>
      {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
    </div>
  )
}

export function CostsSection({
  vehicle,
  currentKm,
  today,
}: {
  vehicle: GarageVehicle
  currentKm: number
  today: string
}) {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState(today)
  const [km, setKm] = useState("")
  const [liters, setLiters] = useState("")
  const [cost, setCost] = useState("")

  const summary = getCostSummary(vehicle.records, today)
  const logs = [...vehicle.records.fuel].sort((a, b) => b.date.localeCompare(a.date))

  const kmError = km === "" ? "Ingresá el kilometraje." : null
  const litersError = !liters || Number(liters) <= 0 ? "Ingresá los litros cargados." : null
  const costError = !cost || Number(cost) <= 0 ? "Ingresá el importe." : null
  const dateError = date > today ? "La fecha no puede ser futura." : null
  const canSave = !kmError && !litersError && !costError && !dateError

  function openDialog() {
    setDate(today)
    setKm(String(currentKm))
    setLiters("")
    setCost("")
    setOpen(true)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!canSave) return
    addFuelLog(vehicle.id, {
      date,
      km: Number(km),
      liters: Number(liters.replace(",", ".")),
      cost: Number(cost),
    })
    toast.success("Carga registrada")
    setOpen(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <Metric
          label="Consumo promedio"
          value={summary.kmPerLiter ? `${summary.kmPerLiter.toFixed(1)} km/l` : "—"}
          hint={summary.kmPerLiter ? "Según tus cargas" : "Necesita 2 cargas"}
        />
        <Metric
          label="Costo por km"
          value={summary.costPerKm ? formatMoney(summary.costPerKm) : "—"}
          hint="Solo combustible"
        />
        <Metric label="Combustible (30 días)" value={formatMoney(summary.fuelLast30)} />
        <Metric label="Mantenimiento (12 meses)" value={formatMoney(summary.maintenanceLast365)} />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={<Button size="sm" variant="outline" className="w-full rounded-full" onClick={openDialog} />}
        >
          <Plus />
          Registrar carga de combustible
        </DialogTrigger>

        <DialogContent className="max-h-[85dvh] overflow-y-auto sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Registrar carga</DialogTitle>
            <DialogDescription>
              Cargá siempre el tanque lleno para que el consumo promedio sea preciso.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <FieldGroup>
              <div className="flex gap-3">
                <Field className="flex-1" data-invalid={dateError ? true : undefined}>
                  <FieldLabel htmlFor="fuel-date">Fecha</FieldLabel>
                  <Input
                    id="fuel-date"
                    type="date"
                    max={today}
                    value={date}
                    aria-invalid={!!dateError}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  {dateError ? <FieldError>{dateError}</FieldError> : null}
                </Field>
                <Field className="flex-1" data-invalid={kmError ? true : undefined}>
                  <FieldLabel htmlFor="fuel-km">Kilometraje</FieldLabel>
                  <Input
                    id="fuel-km"
                    inputMode="numeric"
                    value={km}
                    aria-invalid={!!kmError}
                    onChange={(e) => setKm(e.target.value.replace(/\D/g, "").slice(0, 7))}
                  />
                  {kmError ? <FieldError>{kmError}</FieldError> : null}
                </Field>
              </div>

              <div className="flex gap-3">
                <Field className="flex-1" data-invalid={litersError ? true : undefined}>
                  <FieldLabel htmlFor="fuel-liters">Litros</FieldLabel>
                  <Input
                    id="fuel-liters"
                    inputMode="decimal"
                    placeholder="42.5"
                    value={liters}
                    aria-invalid={!!litersError}
                    onChange={(e) => setLiters(e.target.value.replace(/[^\d.,]/g, "").slice(0, 6))}
                  />
                  {litersError ? <FieldError>{litersError}</FieldError> : null}
                </Field>
                <Field className="flex-1" data-invalid={costError ? true : undefined}>
                  <FieldLabel htmlFor="fuel-cost">Importe</FieldLabel>
                  <Input
                    id="fuel-cost"
                    inputMode="numeric"
                    placeholder="55000"
                    value={cost}
                    aria-invalid={!!costError}
                    onChange={(e) => setCost(e.target.value.replace(/\D/g, "").slice(0, 9))}
                  />
                  {costError ? <FieldError>{costError}</FieldError> : null}
                </Field>
              </div>
              <FieldDescription>
                El consumo se calcula con los km recorridos entre cargas consecutivas.
              </FieldDescription>
            </FieldGroup>

            <DialogFooter>
              <DialogClose render={<Button type="button" variant="outline" />}>Cancelar</DialogClose>
              <Button type="submit" disabled={!canSave}>
                Guardar carga
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {logs.length > 0 ? (
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium text-muted-foreground">Últimas cargas</p>
          <ul className="flex flex-col">
            {logs.slice(0, 5).map((f) => (
              <li key={f.id} className="flex items-center gap-3 border-b border-border py-2 last:border-0">
                <Fuel className="size-4 shrink-0 text-muted-foreground" />
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm tabular-nums">
                    {f.liters.toLocaleString("es-AR")} l · {formatMoney(f.cost)}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {formatDate(f.date)} · {formatKm(f.km)}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7 shrink-0 text-muted-foreground"
                  onClick={() => removeFuelLog(vehicle.id, f.id)}
                >
                  <X className="size-3.5" />
                  <span className="sr-only">Eliminar carga del {formatDate(f.date)}</span>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
