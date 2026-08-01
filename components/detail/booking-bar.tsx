"use client"

import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { ParkingSpot } from "@/lib/mock-data"

const days = [
  { value: "hoy", label: "Hoy", sub: "Mar 12" },
  { value: "manana", label: "Mañana", sub: "Mié 13" },
  { value: "jueves", label: "Jue", sub: "14" },
  { value: "viernes", label: "Vie", sub: "15" },
]

const times = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"]
const durations = [1, 2, 3, 4]

export const months = [
  { value: "2026-04", label: "Abril", sub: "2026" },
  { value: "2026-05", label: "Mayo", sub: "2026" },
  { value: "2026-06", label: "Junio", sub: "2026" },
  { value: "2026-07", label: "Julio", sub: "2026" },
]

type Mode = "hora" | "mensual"

export function BookingBar({ spot }: { spot: ParkingSpot }) {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>("hora")
  const [day, setDay] = useState("hoy")
  const [time, setTime] = useState("10:00")
  const [duration, setDuration] = useState(2)
  const [month, setMonth] = useState(months[0].value)

  const total = useMemo(
    () => (mode === "hora" ? spot.pricePerHour * duration : spot.monthlyPrice),
    [mode, spot.pricePerHour, spot.monthlyPrice, duration],
  )

  function reserve() {
    const params =
      mode === "hora"
        ? new URLSearchParams({ mode, day, time, duration: String(duration) })
        : new URLSearchParams({ mode, month })
    router.push(`/reserva/${spot.id}?${params.toString()}`)
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Mode */}
      <div className="flex gap-1 rounded-xl bg-secondary p-1">
        <button
          type="button"
          onClick={() => setMode("hora")}
          className={cn(
            "flex-1 rounded-lg py-2 text-sm font-semibold transition-colors",
            mode === "hora" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground",
          )}
        >
          Por hora
        </button>
        <button
          type="button"
          onClick={() => setMode("mensual")}
          className={cn(
            "flex-1 rounded-lg py-2 text-sm font-semibold transition-colors",
            mode === "mensual" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground",
          )}
        >
          Mensual
        </button>
      </div>

      {mode === "hora" ? (
        <>
          {/* Date */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold">Fecha</p>
            <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {days.map((d) => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => setDay(d.value)}
                  className={cn(
                    "flex min-w-16 flex-col items-center rounded-xl border px-3 py-2 text-sm transition-colors",
                    day === d.value
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-card text-muted-foreground",
                  )}
                >
                  <span className="font-semibold">{d.label}</span>
                  <span className="text-xs">{d.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Time */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold">Horario de ingreso</p>
            <div className="flex flex-wrap gap-2">
              {times.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTime(t)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                    time === t
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-card text-muted-foreground",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold">Duración</p>
            <div className="flex gap-2">
              {durations.map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setDuration(h)}
                  className={cn(
                    "flex-1 rounded-xl border py-2 text-sm font-medium transition-colors",
                    duration === h
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-card text-muted-foreground",
                  )}
                >
                  {h} {h === 1 ? "hora" : "horas"}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold">Mes de inicio</p>
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {months.map((m) => (
              <button
                key={m.value}
                type="button"
                onClick={() => setMonth(m.value)}
                className={cn(
                  "flex min-w-20 flex-col items-center rounded-xl border px-3 py-2 text-sm transition-colors",
                  month === m.value
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-card text-muted-foreground",
                )}
              >
                <span className="font-semibold">{m.label}</span>
                <span className="text-xs">{m.sub}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Cochera fija todos los días del mes, con renovación automática. Podés cancelar avisando con 30 días de anticipación.
          </p>
        </div>
      )}

      {/* Sticky reserve bar */}
      <div className="sticky bottom-0 -mx-4 mt-2 flex items-center justify-between gap-4 border-t border-border bg-background/95 px-4 py-4 backdrop-blur">
        <div>
          <p className="text-xs text-muted-foreground">{mode === "hora" ? "Total estimado" : "Precio mensual"}</p>
          <p className="text-xl font-bold">{formatCurrency(total)}</p>
        </div>
        <Button size="lg" className="h-12 flex-1 rounded-xl text-base font-semibold" onClick={reserve}>
          Reservar
        </Button>
      </div>
    </div>
  )
}
