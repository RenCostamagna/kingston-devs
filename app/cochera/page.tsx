import Link from "next/link"
import { ArrowRight, PlusCircle } from "lucide-react"

import { AppShell } from "@/components/app-shell"
import { ModuleHeader } from "@/components/module-header"
import { ParkingSearchHero } from "@/components/home/parking-search-hero"
import { ParkingCardHorizontal } from "@/components/parking-card"
import { Button } from "@/components/ui/button"
import { parkingSpots } from "@/lib/mock-data"

export default function CocheraPage() {
  const featured = parkingSpots.slice(0, 5)

  return (
    <AppShell>
      <ModuleHeader title="Cocheras" subtitle="Estacioná o alquilá tu lugar" />

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
            {featured.map((spot, index) => (
              <ParkingCardHorizontal key={spot.id} spot={spot} priority={index === 0} />
            ))}
          </div>
        </section>

        {/* Secondary: publish your own parking */}
        <section className="px-5">
          <Button
            render={<Link href="/publicar" />}
            nativeButton={false}
            variant="outline"
            size="lg"
            className="h-12 w-full rounded-xl border-dashed"
          >
            <PlusCircle data-icon="inline-start" />
            Publicar mi cochera
          </Button>
        </section>
      </main>
    </AppShell>
  )
}
