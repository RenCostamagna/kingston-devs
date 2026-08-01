"use client"

import { Car } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { VehicleSwitcher } from "@/components/home/vehicle-switcher"
import { useProfile } from "@/lib/profile"

export function CarHero() {
  const vehicle = useProfile()

  return (
    <header className="flex flex-col gap-5 px-5 pt-6">
      {/* Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Hola de nuevo,</p>
          <h1 className="text-2xl font-bold">Nicolás</h1>
        </div>
        <Avatar className="size-11 border border-border">
          <AvatarFallback className="bg-secondary text-sm font-semibold text-foreground">NC</AvatarFallback>
        </Avatar>
      </div>

      {/* Vehicle selector + add */}
      <VehicleSwitcher />

      {/* Car hero card */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex size-24 items-center justify-center rounded-full bg-primary/15">
            <Car className="size-12 text-primary" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-balance">
              {vehicle.brand} {vehicle.model}
            </h2>
            <p className="text-sm text-muted-foreground">
              {vehicle.year} · Patente {vehicle.plate}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
