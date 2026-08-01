"use client"

import { Car, Gauge } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useProfile } from "@/lib/profile"

export function HomeHeader() {
  const vehicle = useProfile()
  return (
    <header className="flex flex-col gap-4 px-5 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Hola de nuevo,</p>
          <h1 className="text-2xl font-bold">Nicolás</h1>
        </div>
        <Avatar className="size-11 border border-border">
          <AvatarFallback className="bg-secondary text-sm font-semibold text-foreground">NC</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
        <div className="flex size-11 items-center justify-center rounded-xl bg-primary/15">
          <Car className="size-6 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">
            {vehicle.brand} {vehicle.model} · {vehicle.year}
          </p>
          <p className="text-xs text-muted-foreground">Patente {vehicle.plate}</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5">
          <Gauge className="size-4 text-primary" />
          <span className="text-xs font-medium">{vehicle.mileage.toLocaleString("es-AR")} km</span>
        </div>
      </div>
    </header>
  )
}
