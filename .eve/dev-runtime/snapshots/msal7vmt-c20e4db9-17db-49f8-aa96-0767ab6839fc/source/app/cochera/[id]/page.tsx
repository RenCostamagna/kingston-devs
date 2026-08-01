import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock, MapPin, Star } from "lucide-react"

import { AppShell } from "@/components/app-shell"
import { BookingBar } from "@/components/detail/booking-bar"
import { Gallery } from "@/components/detail/gallery"
import { FeatureBadge } from "@/components/feature-icon"
import { MapPlaceholder } from "@/components/map-placeholder"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { formatCurrency, formatKm } from "@/lib/format"
import { getParkingSpot, parkingSpots } from "@/lib/mock-data"

export function generateStaticParams() {
  return parkingSpots.map((s) => ({ id: s.id }))
}

export default async function CocheraPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const spot = getParkingSpot(id)
  if (!spot) notFound()

  return (
    <AppShell>
      <div className="relative">
        <Link
          href="/buscar"
          aria-label="Volver"
          className="absolute left-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-background/80 backdrop-blur"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <Gallery images={spot.gallery} alt={spot.title} />
      </div>

      <main className="flex flex-col gap-5 px-4 pt-4">
        <header className="flex flex-col gap-2">
          <div className="flex items-center gap-1 text-sm">
            <Star className="size-4 fill-primary text-primary" />
            <span className="font-semibold">{spot.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">· {spot.reviews} reseñas</span>
          </div>
          <h1 className="text-pretty text-2xl font-bold">{spot.title}</h1>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4" />
            {spot.address}
          </p>
          <p className="text-lg">
            <span className="font-bold text-primary">{formatCurrency(spot.pricePerHour)}</span>
            <span className="text-muted-foreground"> /hora · a {formatKm(spot.distanceKm)}</span>
          </p>
        </header>

        <div className="flex items-center gap-1.5 rounded-xl bg-secondary px-3 py-2.5 text-sm">
          <Clock className="size-4 text-primary" />
          {spot.available}
        </div>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold">Características</h2>
          <div className="flex flex-wrap gap-2">
            {spot.features.map((f) => (
              <FeatureBadge key={f} feature={f} />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold">Descripción</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{spot.description}</p>
        </section>

        <section className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
          <Avatar className="size-11">
            <AvatarFallback className="bg-secondary font-semibold">
              {spot.host
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{spot.host}</p>
            <p className="text-xs text-muted-foreground">Anfitrión · {spot.size} · {spot.neighborhood}</p>
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold">Ubicación</h2>
          <MapPlaceholder className="h-40 w-full" showCenter pins={[{ top: "50%", left: "50%" }]} />
        </section>

        <Separator />

        <section className="flex flex-col gap-2 pb-2">
          <h2 className="text-base font-semibold">Elegí fecha y horario</h2>
          <BookingBar spot={spot} />
        </section>
      </main>
    </AppShell>
  )
}
