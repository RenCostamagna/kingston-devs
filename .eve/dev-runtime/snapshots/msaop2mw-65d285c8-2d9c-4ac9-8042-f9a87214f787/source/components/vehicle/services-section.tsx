"use client"

import { useState } from "react"
import { AlertTriangle, Plus, Wrench, X } from "lucide-react"
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
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { StatusPill } from "@/components/vehicle/status-pill"
import { addServiceRecord, removeServiceRecord, type GarageVehicle } from "@/lib/profile"
import {
  formatDate,
  formatKm,
  formatMoney,
  getMaintenanceOverview,
  relativeDays,
  serviceCatalog,
  serviceTypes,
  type ServiceStatus,
  type ServiceType,
} from "@/lib/vehicle-insights"

/** Texto de "lo que ocurra primero" entre km y fecha. */
function dueLabel(item: ServiceStatus): string {
  const parts: string[] = []
  if (item.kmRemaining !== null) {
    parts.push(item.kmRemaining > 0 ? `faltan ${formatKm(item.kmRemaining)}` : `${formatKm(-item.kmRemaining)} pasados`)
  }
  if (item.daysRemaining !== null) parts.push(relativeDays(item.daysRemaining))
  return parts.join(" · ")
}

export function ServicesSection({
  vehicle,
  currentKm,
  today,
}: {
  vehicle: GarageVehicle
  currentKm: number
  today: string
}) {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<ServiceType>("aceite")
  const [date, setDate] = useState(today)
  const [km, setKm] = useState("")
  const [cost, setCost] = useState("")
  const [workshop, setWorkshop] = useState("")

  const overview = getMaintenanceOverview(vehicle.records, currentKm, today)
  const history = [...vehicle.records.services].sort((a, b) => b.date.localeCompare(a.date))

  const kmError = km === "" ? "Ingresá el kilometraje del service." : null
  const dateError = date > today ? "La fecha no puede ser futura." : !date ? "Elegí una fecha." : null
  const canSave = !kmError && !dateError

  function openDialog() {
    setType("aceite")
    setDate(today)
    setKm(String(currentKm))
    setCost("")
    setWorkshop("")
    setOpen(true)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!canSave) return
    addServiceRecord(vehicle.id, {
      type,
      date,
      km: Number(km),
      cost: cost ? Number(cost) : undefined,
      workshop: workshop.trim() || undefined,
    })
    toast.success(`${serviceCatalog[type].label} registrado`)
    setOpen(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={<Button size="sm" className="w-full rounded-full" onClick={openDialog} />}
        >
          <Plus />
          Registrar service
        </DialogTrigger>

        <DialogContent className="max-h-[85dvh] overflow-y-auto sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Registrar service</DialogTitle>
            <DialogDescription>
              Con la fecha y el kilometraje calculamos cuándo toca el próximo.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="srv-type">Tipo de trabajo</FieldLabel>
                <Select
                  value={type}
                  onValueChange={(v) => setType(v as ServiceType)}
                  items={serviceTypes.map((t) => ({ value: t, label: serviceCatalog[t].label }))}
                >
                  <SelectTrigger id="srv-type" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false} align="start" className="max-h-64">
                    <SelectGroup>
                      {serviceTypes.map((t) => (
                        <SelectItem key={t} value={t}>
                          {serviceCatalog[t].label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>

              <div className="flex gap-3">
                <Field className="flex-1" data-invalid={dateError ? true : undefined}>
                  <FieldLabel htmlFor="srv-date">Fecha</FieldLabel>
                  <Input
                    id="srv-date"
                    type="date"
                    max={today}
                    value={date}
                    aria-invalid={!!dateError}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  {dateError ? <FieldError>{dateError}</FieldError> : null}
                </Field>
                <Field className="flex-1" data-invalid={kmError ? true : undefined}>
                  <FieldLabel htmlFor="srv-km">Kilometraje</FieldLabel>
                  <Input
                    id="srv-km"
                    inputMode="numeric"
                    value={km}
                    aria-invalid={!!kmError}
                    onChange={(e) => setKm(e.target.value.replace(/\D/g, "").slice(0, 7))}
                  />
                  {kmError ? <FieldError>{kmError}</FieldError> : null}
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="srv-cost">Costo (opcional)</FieldLabel>
                <Input
                  id="srv-cost"
                  inputMode="numeric"
                  placeholder="85000"
                  value={cost}
                  onChange={(e) => setCost(e.target.value.replace(/\D/g, "").slice(0, 9))}
                />
                <FieldDescription>Lo sumamos a tu gasto anual de mantenimiento.</FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="srv-workshop">Taller (opcional)</FieldLabel>
                <Input
                  id="srv-workshop"
                  placeholder="Ej. Taller Sur"
                  value={workshop}
                  onChange={(e) => setWorkshop(e.target.value)}
                />
              </Field>
            </FieldGroup>

            <DialogFooter>
              <DialogClose render={<Button type="button" variant="outline" />}>Cancelar</DialogClose>
              <Button type="submit" disabled={!canSave}>
                Guardar service
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {overview.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
          Registrá tu primer service y calculamos automáticamente el próximo vencimiento por kilómetros o
          por tiempo, lo que ocurra primero.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {overview.map((item) => (
            <li key={item.type} className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 flex-col">
                  <span className="flex items-center gap-1.5 text-sm font-medium">
                    {item.critical ? (
                      <AlertTriangle className="size-3.5 shrink-0 text-accent" />
                    ) : (
                      <Wrench className="size-3.5 shrink-0 text-muted-foreground" />
                    )}
                    <span className="truncate">{item.label}</span>
                  </span>
                  <span className="text-xs text-muted-foreground">{dueLabel(item)}</span>
                </div>
                <StatusPill status={item.status} />
              </div>

              <Progress value={item.progress * 100} className="h-1.5" />

              <p className="text-xs text-muted-foreground">
                Último: {item.lastKm !== null ? formatKm(item.lastKm) : "—"}
                {item.lastDate ? ` · ${formatDate(item.lastDate)}` : ""}
              </p>
            </li>
          ))}
        </ul>
      )}

      {history.length > 0 ? (
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium text-muted-foreground">Historial</p>
          <ul className="flex flex-col">
            {history.slice(0, 6).map((s) => (
              <li
                key={s.id}
                className="flex items-center gap-3 border-b border-border py-2 last:border-0"
              >
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm">{serviceCatalog[s.type].label}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {formatDate(s.date)} · {formatKm(s.km)}
                    {s.workshop ? ` · ${s.workshop}` : ""}
                  </span>
                </div>
                {s.cost ? (
                  <span className="shrink-0 text-xs font-medium tabular-nums">{formatMoney(s.cost)}</span>
                ) : null}
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7 shrink-0 text-muted-foreground"
                  onClick={() => removeServiceRecord(vehicle.id, s.id)}
                >
                  <X className="size-3.5" />
                  <span className="sr-only">Eliminar {serviceCatalog[s.type].label}</span>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
