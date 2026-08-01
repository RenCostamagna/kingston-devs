"use client"

import { useRouter } from "next/navigation"
import { useMemo, useRef, useState } from "react"
import { ArrowLeft, MapPin, Search } from "lucide-react"

import { MapView } from "@/components/map-view"
import { ParkingCardList } from "@/components/parking-card"
import { defaultFilters, FiltersSheet, type Filters } from "@/components/search/filters-sheet"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { parkingSpots } from "@/lib/mock-data"
import { mockPlaceSuggestions } from "@/lib/mock-places"

export function SearchScreen({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)
  const [filters, setFilters] = useState<Filters>(defaultFilters)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const blurTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const suggestions = mockPlaceSuggestions(query)

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

  const mapSpots = useMemo(
    () => results.map((s) => ({ id: s.id, lat: s.lat, lng: s.lng, title: s.title, price: s.pricePerHour })),
    [results],
  )

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col">
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
          <div className="relative flex-1">
            <InputGroup className="h-11 rounded-xl bg-card">
              <InputGroupAddon>
                <Search className="size-4 text-muted-foreground" />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Dirección o zona"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => {
                  blurTimeout.current = setTimeout(() => setShowSuggestions(false), 120)
                }}
                aria-label="Buscar ubicación"
              />
            </InputGroup>
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute inset-x-0 top-[46px] z-[2000] flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-lg">
                {suggestions.map((place) => (
                  <button
                    key={place.id}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      if (blurTimeout.current) clearTimeout(blurTimeout.current)
                      setQuery(place.query)
                      setShowSuggestions(false)
                    }}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 text-left text-sm hover:bg-secondary"
                  >
                    <MapPin className="size-4 shrink-0 text-muted-foreground" />
                    <span className="min-w-0">
                      <span className="block truncate font-medium">{place.label}</span>
                      <span className="block truncate text-xs text-muted-foreground">{place.sublabel}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
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
        <MapView
          className="h-44 w-full"
          spots={mapSpots}
          onSelectId={(id) => router.push(`/cochera/${id}`)}
        />
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
