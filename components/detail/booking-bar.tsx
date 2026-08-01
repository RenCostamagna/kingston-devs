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

export function BookingBar({ spot }: { spot: ParkingSpot }) {
  const router = useRouter()
  const [day, setDay] = useState("hoy")
  const [time, setTime] = useState("10:00")
  const [duration, setDuration] = useState(2)

  const total = useMemo(() => spot.pricePerHour * duration, [spot.pricePerHour, duration])

  function reserve() {
    const params = new URLSearchParams({
      day,
      time,
      duration: String(duration),
    })
    router.push(`/reserva/${spot.id}?${params.toString()}`)
  }

  return (
    <div className="flex flex-col gap-5">
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

      {/* Sticky reserve bar */}
      <div className="sticky bottom-0 -mx-4 mt-2 flex items-center justify-between gap-4 border-t border-border bg-background/95 px-4 py-4 backdrop-blur">
        <div>
          <p className="text-xs text-muted-foreground">Total estimado</p>
          <p className="text-xl font-bold">{formatCurrency(total)}</p>
        </div>
        <Button size="lg" className="h-12 flex-1 rounded-xl text-base font-semibold" onClick={reserve}>
          Reservar
        </Button>
      </div>
    </div>
  )
}
