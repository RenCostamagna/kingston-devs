"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowLeft, Calendar, Check, Clock, MapPin } from "lucide-react"

import { months } from "@/components/detail/booking-bar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/lib/format"
import type { ParkingSpot } from "@/lib/mock-data"

const dayLabels: Record<string, string> = {
  hoy: "Hoy, 12 mar",
  manana: "Mañana, 13 mar",
  jueves: "Jueves 14 mar",
  viernes: "Viernes 15 mar",
}

const monthLabels: Record<string, string> = Object.fromEntries(
  months.map((m) => [m.value, `${m.label} ${m.sub}`]),
)

type ReservationScreenProps =
  | { spot: ParkingSpot; mode: "hora"; day: string; time: string; duration: number }
  | { spot: ParkingSpot; mode: "mensual"; month: string }

export function ReservationScreen(props: ReservationScreenProps) {
  const { spot, mode } = props
  const router = useRouter()
  const [confirmed, setConfirmed] = useState(false)

  const subtotal = mode === "hora" ? spot.pricePerHour * props.duration : spot.monthlyPrice
  const serviceFee = Math.round(subtotal * 0.1)
  const total = subtotal + serviceFee

  if (confirmed) {
    return <SuccessView {...props} total={total} />
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col">
      <header className="flex items-center gap-3 px-4 pb-2 pt-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => router.back()}
          aria-label="Volver"
        >
          <ArrowLeft />
        </Button>
        <h1 className="text-lg font-bold">Confirmá tu reserva</h1>
      </header>

      <main className="flex flex-1 flex-col gap-4 px-4 py-2">
        {/* Spot summary */}
        <div className="flex gap-3 rounded-2xl border border-border bg-card p-3">
          <div className="relative size-20 shrink-0 overflow-hidden rounded-xl">
            <Image src={spot.image || "/placeholder.svg"} alt={spot.title} fill sizes="80px" className="object-cover" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{spot.title}</p>
            <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
              <MapPin className="size-3.5 shrink-0" />
              {spot.address}
            </p>
            <p className="mt-1 text-sm font-medium text-primary">
              {mode === "hora"
                ? `${formatCurrency(spot.pricePerHour)} /hora`
                : `${formatCurrency(spot.monthlyPrice)} /mes`}
            </p>
          </div>
        </div>

        {/* Booking details */}
        {mode === "hora" ? (
          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-secondary">
                <Calendar className="size-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Fecha</p>
                <p className="text-sm font-medium">{dayLabels[props.day] ?? props.day}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-secondary">
                <Clock className="size-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Horario</p>
                <p className="text-sm font-medium">
                  {props.time} · {props.duration} {props.duration === 1 ? "hora" : "horas"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-secondary">
                <Calendar className="size-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Mes de inicio</p>
                <p className="text-sm font-medium">{monthLabels[props.month] ?? props.month}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Reserva mensual con renovación automática. Podés cancelar avisando con 30 días de anticipación.
            </p>
          </div>
        )}

        {/* Price breakdown */}
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {mode === "hora"
                ? `${formatCurrency(spot.pricePerHour)} × ${props.duration} ${props.duration === 1 ? "hora" : "horas"}`
                : "Alquiler mensual"}
            </span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Cargo por servicio</span>
            <span>{formatCurrency(serviceFee)}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between text-base font-bold">
            <span>Total</span>
            <span className="text-primary">{formatCurrency(total)}</span>
          </div>
        </div>
      </main>

      <div className="sticky bottom-0 border-t border-border bg-background/95 px-4 py-4 backdrop-blur">
        <Button
          size="lg"
          className="h-12 w-full rounded-xl text-base font-semibold"
          onClick={() => setConfirmed(true)}
        >
          Confirmar reserva · {formatCurrency(total)}
        </Button>
      </div>
    </div>
  )
}

function SuccessView(props: ReservationScreenProps & { total: number }) {
  const { spot, mode, total } = props

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-primary/15">
        <div className="flex size-14 items-center justify-center rounded-full bg-primary">
          <Check className="size-8 text-primary-foreground" strokeWidth={3} />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">
          {mode === "hora" ? "¡Reserva confirmada!" : "¡Reserva mensual confirmada!"}
        </h1>
        <p className="text-pretty text-sm text-muted-foreground">
          Te esperamos en {spot.title}. Ya te enviamos los detalles por correo.
        </p>
      </div>

      <div className="w-full rounded-2xl border border-border bg-card p-4 text-left">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <span className="text-sm text-muted-foreground">Cochera</span>
          <span className="text-sm font-medium">{spot.neighborhood}</span>
        </div>
        {mode === "hora" ? (
          <>
            <div className="flex items-center justify-between border-b border-border py-3">
              <span className="text-sm text-muted-foreground">Fecha y hora</span>
              <span className="text-sm font-medium">
                {dayLabels[props.day] ?? props.day} · {props.time}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-border py-3">
              <span className="text-sm text-muted-foreground">Duración</span>
              <span className="text-sm font-medium">
                {props.duration} {props.duration === 1 ? "hora" : "horas"}
              </span>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between border-b border-border py-3">
            <span className="text-sm text-muted-foreground">Mes de inicio</span>
            <span className="text-sm font-medium">{monthLabels[props.month] ?? props.month}</span>
          </div>
        )}
        <div className="flex items-center justify-between pt-3">
          <span className="text-sm font-semibold">
            {mode === "hora" ? "Total pagado" : "Total del primer mes"}
          </span>
          <span className="text-base font-bold text-primary">{formatCurrency(total)}</span>
        </div>
      </div>

      <div className="flex w-full flex-col gap-3">
        <Button render={<Link href="/" />} nativeButton={false} size="lg" className="h-12 rounded-xl">
          Volver al inicio
        </Button>
        <Button
          render={<Link href="/buscar" />}
          nativeButton={false}
          variant="outline"
          size="lg"
          className="h-12 rounded-xl"
        >
          Buscar otra cochera
        </Button>
      </div>
    </div>
  )
}
