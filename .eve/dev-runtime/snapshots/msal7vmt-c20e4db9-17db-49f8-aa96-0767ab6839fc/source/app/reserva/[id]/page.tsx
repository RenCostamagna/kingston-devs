import { notFound } from "next/navigation"

import { ReservationScreen } from "@/components/reservation/reservation-screen"
import { parkingSpots } from "@/lib/mock-data"

export default async function ReservaPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ day?: string; time?: string; duration?: string }>
}) {
  const { id } = await params
  const { day, time, duration } = await searchParams
  const spot = parkingSpots.find((s) => s.id === id)
  if (!spot) notFound()

  return (
    <ReservationScreen
      spot={spot}
      day={day ?? "hoy"}
      time={time ?? "10:00"}
      duration={Number(duration ?? 2)}
    />
  )
}
