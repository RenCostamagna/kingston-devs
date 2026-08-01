"use client"

import { useState } from "react"
import { CalendarClock, Pencil } from "lucide-react"
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
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { StatusPill } from "@/components/vehicle/status-pill"
import { setExpiration, type GarageVehicle } from "@/lib/profile"
import {
  expirationLabels,
  formatDate,
  getExpirationsOverview,
  relativeDays,
  type ExpirationKey,
} from "@/lib/vehicle-insights"

export function ExpirationsSection({ vehicle, today }: { vehicle: GarageVehicle; today: string }) {
  const [editing, setEditing] = useState<ExpirationKey | null>(null)
  const [value, setValue] = useState("")

  const items = getExpirationsOverview(vehicle.records, today)

  function openEditor(key: ExpirationKey) {
    setValue(vehicle.records.expirations[key] ?? "")
    setEditing(key)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!editing) return
    setExpiration(vehicle.id, editing, value || null)
    toast.success(value ? `${expirationLabels[editing]} actualizado` : `${expirationLabels[editing]} eliminado`)
    setEditing(null)
  }

  return (
    <div className="flex flex-col gap-2">
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li
            key={item.key}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3"
          >
            <CalendarClock className="size-4 shrink-0 text-muted-foreground" />
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-medium">{item.label}</span>
              <span className="truncate text-xs text-muted-foreground">
                {item.date ? `Vence ${formatDate(item.date)}` : "Sin fecha cargada"}
              </span>
            </div>
            <StatusPill status={item.status}>
              {item.status === "due"
                ? "Vencido"
                : item.status === "soon"
                  ? relativeDays(item.daysRemaining ?? 0)
                  : item.status === "ok"
                    ? "Al día"
                    : "Cargar"}
            </StatusPill>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 shrink-0 text-muted-foreground"
              onClick={() => openEditor(item.key)}
            >
              <Pencil className="size-3.5" />
              <span className="sr-only">Editar {item.label}</span>
            </Button>
          </li>
        ))}
      </ul>

      <Dialog open={editing !== null} onOpenChange={(next) => !next && setEditing(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>{editing ? expirationLabels[editing] : ""}</DialogTitle>
            <DialogDescription>
              Cargá la fecha de vencimiento y te avisamos cuando falte menos de un mes.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="exp-date">Fecha de vencimiento</FieldLabel>
                <Input
                  id="exp-date"
                  type="date"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <FieldDescription>Dejalo vacío para quitar el recordatorio.</FieldDescription>
              </Field>
            </FieldGroup>

            <DialogFooter>
              <DialogClose render={<Button type="button" variant="outline" />}>Cancelar</DialogClose>
              <Button type="submit">Guardar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
