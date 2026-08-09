"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { MapPin, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"

export function ParkingSearchHero() {
  const router = useRouter()
  const [location, setLocation] = useState("")

  function handleSearch() {
    const params = location.trim() ? `?q=${encodeURIComponent(location.trim())}` : ""
    router.push(`/buscar${params}`)
  }

  return (
    <section className="rounded-3xl border border-border bg-card p-5">
      <h2 className="text-pretty text-xl font-bold">¿Dónde querés estacionar?</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Encontrá cocheras cerca tuyo y reservá en segundos.
      </p>

      <div className="mt-4 flex flex-col gap-3">
        <InputGroup className="h-12 rounded-xl bg-background">
          <InputGroupAddon>
            <MapPin className="size-5 text-primary" />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Ingresá una dirección o zona"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.nativeEvent.isComposing && e.keyCode !== 229) handleSearch()
            }}
            aria-label="Ubicación"
          />
        </InputGroup>

        <Button size="lg" className="h-12 rounded-xl text-base font-semibold" onClick={handleSearch}>
          <Search data-icon="inline-start" />
          Buscar cochera
        </Button>
      </div>
    </section>
  )
}
