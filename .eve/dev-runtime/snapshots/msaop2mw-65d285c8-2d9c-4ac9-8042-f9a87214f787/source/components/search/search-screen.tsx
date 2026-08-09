"use client"

import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { ArrowLeft, MapPin, Search } from "lucide-react"

import { MapPlaceholder } from "@/components/map-placeholder"
import { ParkingCardList } from "@/components/parking-card"
import { defaultFilters, FiltersSheet, type Filters } from "@/components/search/filters-sheet"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { parkingSpots } from "@/lib/mock-data"

const pins = [
  { top: "30%", left: "28%", price: 850, active: true },
  { top: "52%", left: "62%", price: 620 },
  { top: "68%", left: "38%", price: 700 },
  { top: "40%", left: "78%", price: 980 },
]

export function SearchScreen({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)
  const [filters, setFilters] = useState<Filters>(defaultFilters)

  const activeCount = useMemo(() => {
    let n = 0
    if (filters.maxPrice < defaultFilters.maxPrice) n++
    if (filters.maxDistance < defaultFilters.maxDistance) n++
    if (filters.schedule !== "cualquiera") n++
    n += filters.features.length
    return n
  }, [filters])

  const results = useMemo(() => {
    return parkingSpots
      .filter((s) => s.pricePerHour <= filters.maxPrice)
      .filter((s) => s.distanceKm <= filters.maxDistance)
      .filter((s) => filters.features.every((f) => s.features.includes(f)))
      .filter((s) => {
        if (filters.schedule === "24hs") return s.features.includes("24hs")
        return true
      })
      .filter((s) => {
        const q = query.trim().toLowerCase()
        if (!q) return true
        return (
          s.address.toLowerCase().includes(q) ||
          s.neighborhood.toLowerCase().includes(q) ||
          s.title.toLowerCase().includes(q)
        )
      })
      .sort((a, b) => a.distanceKm - b.distanceKm)
  }, [filters, query])

  return (
    <div className="flex min-h-dvh flex-col">
      {/* Search bar + filters */}
      <div className="sticky top-0 z-30 flex flex-col gap-3 border-b border-border bg-background/95 px-4 pb-3 pt-4 backdrop-blur">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 rounded-full"
            onClick={() => router.back()}
            aria-label="Volver"
          >
            <ArrowLeft />
          </Button>
          <InputGroup className="h-11 flex-1 rounded-xl bg-card">
            <InputGroupAddon>
              <Search className="size-4 text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Dirección o zona"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Buscar ubicación"
            />
          </InputGroup>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <FiltersSheet filters={filters} onApply={setFilters} activeCount={activeCount} />
          <span className="shrink-0 text-sm text-muted-foreground">
            {results.length} {results.length === 1 ? "resultado" : "resultados"}
          </span>
        </div>
      </div>

      {/* Map (fixed top on mobile) */}
      <div className="px-4 pt-3">
        <MapPlaceholder className="h-44 w-full" pins={pins} />
      </div>

      {/* Results list */}
      <div className="flex flex-1 flex-col gap-3 px-4 py-4">
        {results.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border bg-card/50 px-6 py-12 text-center">
            <MapPin className="size-8 text-muted-foreground" />
            <p className="font-semibold">Sin resultados</p>
            <p className="text-sm text-muted-foreground">
              Probá ampliar los filtros o buscar en otra zona.
            </p>
          </div>
        ) : (
          results.map((spot) => <ParkingCardList key={spot.id} spot={spot} />)
        )}
      </div>
    </div>
  )
}
