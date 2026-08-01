"use client"

import { CalendarClock, CircleDollarSign, Gauge, TrendingUp, Wrench } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CostsSection } from "@/components/vehicle/costs-section"
import { ExpirationsSection } from "@/components/vehicle/expirations-section"
import { MarketValueSection } from "@/components/vehicle/market-value-section"
import { OdometerSection } from "@/components/vehicle/odometer-section"
import { ServicesSection } from "@/components/vehicle/services-section"
import { StatusDot } from "@/components/vehicle/status-pill"
import { useToday } from "@/hooks/use-today"
import { useSelectedVehicle } from "@/lib/profile"
import {
  formatKm,
  getExpirationsOverview,
  getMaintenanceOverview,
  getMileageInfo,
  type Status,
} from "@/lib/vehicle-insights"

/** Peor estado de una lista, para el indicador del encabezado. */
function worst(statuses: Status[]): Status {
  if (statuses.includes("due")) return "due"
  if (statuses.includes("soon")) return "soon"
  return statuses.includes("ok") ? "ok" : "unknown"
}

function SectionTrigger({
  icon: Icon,
  title,
  summary,
  status,
}: {
  icon: React.ElementType
  title: string
  summary: string
  status?: Status
}) {
  return (
    <span className="flex min-w-0 flex-1 items-center gap-3 pr-2">
      <Icon className="size-4 shrink-0 text-primary" />
      <span className="flex min-w-0 flex-col text-left">
        <span className="truncate font-medium">{title}</span>
        <span className="truncate text-xs font-normal text-muted-foreground">{summary}</span>
      </span>
      {status ? <span className="ml-auto flex shrink-0 items-center pr-1">{<StatusDot status={status} />}</span> : null}
    </span>
  )
}

export function VehicleDetails() {
  const vehicle = useSelectedVehicle()
  const today = useToday()

  // Los cálculos dependen del día actual: esperamos al montaje para no romper la hidratación.
  if (!today) {
    return (
      <section className="px-5">
        <div className="h-14 animate-pulse rounded-2xl bg-card" aria-hidden="true" />
        <span className="sr-only">Cargando datos del vehículo</span>
      </section>
    )
  }

  const mileage = getMileageInfo(vehicle, today)
  const currentKm = mileage.estimatedKm
  const services = getMaintenanceOverview(vehicle.records, currentKm, today)
  const expirations = getExpirationsOverview(vehicle.records, today)

  const expirationAlerts = expirations.filter((e) => e.status === "due" || e.status === "soon").length
  const serviceAlerts = services.filter((s) => s.status === "due" || s.status === "soon").length
  const loaded = expirations.filter((e) => e.date).length

  return (
    <section className="flex flex-col gap-2 px-5">
      <h2 className="text-sm font-semibold text-muted-foreground">Datos del vehículo</h2>

      <Accordion className="rounded-3xl border border-border bg-card/40 px-4">
        <AccordionItem value="odometro">
          <AccordionTrigger>
            <SectionTrigger
              icon={Gauge}
              title="Kilometraje"
              summary={`${formatKm(currentKm)}${mileage.source === "sin-lecturas" ? "" : " estimados hoy"}`}
              status={mileage.needsUpdate ? "soon" : "ok"}
            />
          </AccordionTrigger>
          <AccordionContent>
            <OdometerSection vehicle={vehicle} mileage={mileage} today={today} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="vencimientos">
          <AccordionTrigger>
            <SectionTrigger
              icon={CalendarClock}
              title="Vencimientos"
              summary={
                expirationAlerts > 0
                  ? `${expirationAlerts} requieren atención`
                  : loaded > 0
                    ? `${loaded} al día`
                    : "Cargá VTV, seguro y patente"
              }
              status={worst(expirations.map((e) => e.status))}
            />
          </AccordionTrigger>
          <AccordionContent>
            <ExpirationsSection vehicle={vehicle} today={today} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="mantenimiento">
          <AccordionTrigger>
            <SectionTrigger
              icon={Wrench}
              title="Mantenimiento"
              summary={
                services.length === 0
                  ? "Sin services registrados"
                  : serviceAlerts > 0
                    ? `${serviceAlerts} próximos o vencidos`
                    : `${services.length} al día`
              }
              status={worst(services.map((s) => s.status))}
            />
          </AccordionTrigger>
          <AccordionContent>
            <ServicesSection vehicle={vehicle} currentKm={currentKm} today={today} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="costos">
          <AccordionTrigger>
            <SectionTrigger
              icon={CircleDollarSign}
              title="Costos y consumo"
              summary={
                vehicle.records.fuel.length > 0
                  ? `${vehicle.records.fuel.length} cargas registradas`
                  : "Registrá tus cargas de combustible"
              }
            />
          </AccordionTrigger>
          <AccordionContent>
            <CostsSection vehicle={vehicle} currentKm={currentKm} today={today} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="valor">
          <AccordionTrigger>
            <SectionTrigger icon={TrendingUp} title="Valor de mercado" summary="Referencia ACARA" />
          </AccordionTrigger>
          <AccordionContent>
            <MarketValueSection vehicle={vehicle} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}
