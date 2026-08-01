import Image from "next/image"
import Link from "next/link"
import { MapPin, Star } from "lucide-react"

import { FeatureBadge } from "@/components/feature-icon"
import { Button } from "@/components/ui/button"
import { formatCurrency, formatKm } from "@/lib/format"
import type { ParkingSpot } from "@/lib/mock-data"

export function ParkingCardHorizontal({ spot }: { spot: ParkingSpot }) {
  return (
    <Link
      href={`/cochera/${spot.id}`}
      className="group w-64 shrink-0 overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/50"
    >
      <div className="relative h-32 w-full overflow-hidden">
        <Image
          src={spot.image || "/placeholder.svg"}
          alt={`Cochera en ${spot.address}`}
          fill
          sizes="256px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute right-2 top-2 rounded-full bg-background/85 px-2 py-1 text-xs font-medium backdrop-blur">
          {formatKm(spot.distanceKm)}
        </span>
      </div>
      <div className="flex flex-col gap-1 p-3">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="size-3.5 fill-primary text-primary" />
          <span className="font-medium text-foreground">{spot.rating.toFixed(1)}</span>
          <span>· {spot.neighborhood}</span>
        </div>
        <p className="truncate text-sm font-semibold">{spot.title}</p>
        <p className="text-sm">
          <span className="font-bold text-primary">{formatCurrency(spot.pricePerHour)}</span>
          <span className="text-muted-foreground"> /hora</span>
        </p>
      </div>
    </Link>
  )
}

export function ParkingCardList({ spot }: { spot: ParkingSpot }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex gap-3 p-3">
        <div className="relative size-24 shrink-0 overflow-hidden rounded-xl">
          <Image
            src={spot.image || "/placeholder.svg"}
            alt={`Cochera en ${spot.address}`}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-primary text-primary" />
            <span className="font-medium text-foreground">{spot.rating.toFixed(1)}</span>
            <span className="truncate">({spot.reviews})</span>
          </div>
          <p className="truncate text-sm font-semibold">{spot.title}</p>
          <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
            <MapPin className="size-3.5 shrink-0" />
            {spot.address}
          </p>
          <p className="text-sm">
            <span className="font-bold text-primary">{formatCurrency(spot.pricePerHour)}</span>
            <span className="text-muted-foreground"> /hora · {formatKm(spot.distanceKm)}</span>
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-1.5 px-3 pb-3">
        {spot.features.slice(0, 3).map((f) => (
          <FeatureBadge key={f} feature={f} />
        ))}
        <Button asChild size="sm" className="ml-auto rounded-full">
          <Link href={`/cochera/${spot.id}`}>Ver más</Link>
        </Button>
      </div>
    </div>
  )
}
