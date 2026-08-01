import Link from "next/link"
import { ArrowRight, PlusCircle, Shield } from "lucide-react"

import { AppShell } from "@/components/app-shell"
import { HomeHeader } from "@/components/home/home-header"
import { ParkingSearchHero } from "@/components/home/parking-search-hero"
import { ParkingCardHorizontal } from "@/components/parking-card"
import { Button } from "@/components/ui/button"
import { parkingSpots } from "@/lib/mock-data"

export default function HomePage() {
  const featured = parkingSpots.slice(0, 5)

  return (
    <AppShell>
      <HomeHeader />

      <main className="mt-6 flex flex-col gap-8">
        {/* Primary: parking search */}
        <div className="px-5">
          <ParkingSearchHero />
        </div>

        {/* Featured parking near you */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-5">
            <h2 className="text-lg font-bold">Cocheras cerca tuyo</h2>
            <Link href="/buscar" className="flex items-center gap-1 text-sm font-medium text-primary">
              Ver todas
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {featured.map((spot) => (
              <ParkingCardHorizontal key={spot.id} spot={spot} />
            ))}
          </div>
        </section>

        {/* Secondary: publish your own parking */}
        <section className="px-5">
          <Button
            render={<Link href="/publicar" />}
            variant="outline"
            size="lg"
            className="h-12 w-full rounded-xl border-dashed"
          >
            <PlusCircle data-icon="inline-start" />
            Publicar mi cochera
          </Button>
        </section>

        {/* Discreet: insurance */}
        <section className="px-5">
          <Link
            href="/seguro"
            className="flex items-center gap-3 rounded-2xl border border-border bg-card/50 p-4 transition-colors hover:bg-card"
          >
            <div className="flex size-10 items-center justify-center rounded-full bg-secondary">
              <Shield className="size-5 text-muted-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">Cotizá tu seguro</p>
              <p className="text-xs text-muted-foreground">
                Nuestro agente compara precios entre aseguradoras.
              </p>
            </div>
            <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
          </Link>
        </section>
      </main>
    </AppShell>
  )
}
