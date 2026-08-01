import { notFound } from "next/navigation"

import { ReservationScreen } from "@/components/reservation/reservation-screen"
import { parkingSpots } from "@/lib/mock-data"

export default async function ReservaPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ mode?: string; day?: string; time?: string; duration?: string; month?: string }>
}) {
  const { id } = await params
  const { mode, day, time, duration, month } = await searchParams
  const spot = parkingSpots.find((s) => s.id === id)
  if (!spot) notFound()

  if (mode === "mensual") {
    return <ReservationScreen spot={spot} mode="mensual" month={month ?? "2026-04"} />
  }

  return (
    <ReservationScreen
      spot={spot}
      mode="hora"
      day={day ?? "hoy"}
      time={time ?? "10:00"}
      duration={Number(duration ?? 2)}
    />
  )
}
