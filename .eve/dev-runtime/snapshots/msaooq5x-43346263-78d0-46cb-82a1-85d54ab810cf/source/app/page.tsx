import { AppShell } from "@/components/app-shell"
import { OnboardingGate } from "@/components/onboarding/onboarding-gate"
import { CarHero } from "@/components/home/car-hero"
import { VehicleDetails } from "@/components/home/vehicle-details"
import { ModuleGrid } from "@/components/home/module-grid"

export default function HomePage() {
  return (
    <OnboardingGate>
      <AppShell>
        <main className="flex flex-col gap-8 pb-4">
          <CarHero />
          <VehicleDetails />
          <ModuleGrid />
        </main>
      </AppShell>
    </OnboardingGate>
  )
}
