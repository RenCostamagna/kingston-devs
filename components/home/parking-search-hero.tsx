"use client"

import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import { MapPin, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { mockPlaceSuggestions } from "@/lib/mock-places"

export function ParkingSearchHero() {
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const blurTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const suggestions = mockPlaceSuggestions(location)

  function go(query: string) {
    const params = query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""
    router.push(`/buscar${params}`)
  }

  function selectSuggestion(query: string) {
    if (blurTimeout.current) clearTimeout(blurTimeout.current)
    setLocation(query)
    setShowSuggestions(false)
    go(query)
  }

  return (
    <section className="rounded-3xl border border-border bg-card p-5">
      <h2 className="text-pretty text-xl font-bold">¿Dónde querés estacionar?</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Encontrá cocheras cerca tuyo y reservá en segundos.
      </p>

      <div className="relative mt-4 flex flex-col gap-3">
        <InputGroup className="h-12 rounded-xl bg-background">
          <InputGroupAddon>
            <MapPin className="size-5 text-primary" />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Ingresá una dirección o zona"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => {
              blurTimeout.current = setTimeout(() => setShowSuggestions(false), 120)
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.nativeEvent.isComposing && e.keyCode !== 229) go(location)
            }}
            aria-label="Ubicación"
          />
        </InputGroup>

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute inset-x-0 top-[52px] z-[2000] flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-lg">
            {suggestions.map((place) => (
              <button
                key={place.id}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => selectSuggestion(place.query)}
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

        <Button size="lg" className="h-12 rounded-xl text-base font-semibold" onClick={() => go(location)}>
          <Search data-icon="inline-start" />
          Buscar cochera
        </Button>
      </div>
    </section>
  )
}
