import type { GarageVehicle, VehicleRecords } from "./profile"
import type { VehicleUse } from "./mock-data"

// --- fechas --------------------------------------------------------------

const MS_DAY = 86_400_000

/** Fecha local en formato YYYY-MM-DD (sin corrimiento por zona horaria). */
export function todayISO(): string {
  const d = new Date()
  const m = `${d.getMonth() + 1}`.padStart(2, "0")
  const day = `${d.getDate()}`.padStart(2, "0")
  return `${d.getFullYear()}-${m}-${day}`
}

/** Parsea YYYY-MM-DD como fecha local, evitando el desfase UTC de new Date(str). */
export function parseISO(value: string): Date {
  const [y, m, d] = value.split("-").map(Number)
  return new Date(y, (m ?? 1) - 1, d ?? 1)
}

export function daysBetween(from: string, to: string): number {
  return Math.round((parseISO(to).getTime() - parseISO(from).getTime()) / MS_DAY)
}

export function addMonths(value: string, months: number): string {
  const d = parseISO(value)
  const day = d.getDate()
  d.setMonth(d.getMonth() + months)
  // Si el mes destino es más corto, JS desborda al mes siguiente: lo corregimos.
  if (d.getDate() < day) d.setDate(0)
  const m = `${d.getMonth() + 1}`.padStart(2, "0")
  return `${d.getFullYear()}-${m}-${`${d.getDate()}`.padStart(2, "0")}`
}

export function formatDate(value: string): string {
  return parseISO(value).toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" })
}

export function formatKm(value: number): string {
  return `${Math.round(value).toLocaleString("es-AR")} km`
}

export function formatMoney(value: number): string {
  return value.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 })
}

/** "en 12 días" / "hace 3 días" / "hoy". */
export function relativeDays(days: number): string {
  if (days === 0) return "hoy"
  if (days === 1) return "mañana"
  if (days === -1) return "ayer"
  if (days > 0) return days >= 60 ? `en ${Math.round(days / 30)} meses` : `en ${days} días`
  const past = Math.abs(days)
  return past >= 60 ? `hace ${Math.round(past / 30)} meses` : `hace ${past} días`
}

// --- estado (semáforo) ---------------------------------------------------

export type Status = "ok" | "soon" | "due" | "unknown"

export const statusLabel: Record<Status, string> = {
  ok: "Al día",
  soon: "Próximo",
  due: "Vencido",
  unknown: "Sin datos",
}

// --- kilometraje ---------------------------------------------------------

/** Promedio de uso cuando todavía no hay dos lecturas para comparar. */
const DEFAULT_KM_PER_DAY: Record<VehicleUse, number> = {
  Particular: 33, // ~12.000 km/año
  Comercial: 82, // ~30.000 km/año
}

/** Con menos de 14 días entre lecturas el promedio es demasiado ruidoso. */
const MIN_DAYS_FOR_TREND = 14

/** Recordamos actualizar el odómetro pasado este plazo. */
export const ODOMETER_REMINDER_DAYS = 30

export type MileageInfo = {
  /** Última lectura cargada por el usuario. */
  lastKm: number
  lastDate: string | null
  daysSinceReading: number | null
  /** Kilometraje estimado al día de hoy. */
  estimatedKm: number
  kmPerDay: number
  /** "historial" si surge de lecturas reales, "promedio" si usa el default por uso. */
  source: "historial" | "promedio" | "sin-lecturas"
  needsUpdate: boolean
}

export function getMileageInfo(vehicle: GarageVehicle, today = todayISO()): MileageInfo {
  const readings = [...(vehicle.records?.odometer ?? [])].sort((a, b) => a.date.localeCompare(b.date))
  const last = readings.at(-1)
  const first = readings[0]

  if (!last) {
    return {
      lastKm: vehicle.mileage,
      lastDate: null,
      daysSinceReading: null,
      estimatedKm: vehicle.mileage,
      kmPerDay: DEFAULT_KM_PER_DAY[vehicle.use],
      source: "sin-lecturas",
      needsUpdate: true,
    }
  }

  const spanDays = first ? daysBetween(first.date, last.date) : 0
  const spanKm = first ? last.km - first.km : 0
  const useTrend = readings.length >= 2 && spanDays >= MIN_DAYS_FOR_TREND && spanKm > 0
  const kmPerDay = useTrend ? spanKm / spanDays : DEFAULT_KM_PER_DAY[vehicle.use]

  const daysSinceReading = Math.max(0, daysBetween(last.date, today))

  return {
    lastKm: last.km,
    lastDate: last.date,
    daysSinceReading,
    estimatedKm: Math.round(last.km + kmPerDay * daysSinceReading),
    kmPerDay,
    source: useTrend ? "historial" : "promedio",
    needsUpdate: daysSinceReading >= ODOMETER_REMINDER_DAYS,
  }
}

// --- mantenimiento -------------------------------------------------------

export type ServiceType =
  | "aceite"
  | "service_general"
  | "filtro_aire"
  | "filtro_habitaculo"
  | "liquido_frenos"
  | "pastillas_frenos"
  | "bujias"
  | "correa_distribucion"
  | "neumaticos"
  | "bateria"
  | "alineacion"
  | "otro"

export type ServiceDefinition = {
  label: string
  /** Intervalo recomendado en km (null si solo se controla por tiempo). */
  km: number | null
  /** Intervalo recomendado en meses (null si solo se controla por km). */
  months: number | null
  critical?: boolean
}

/** Intervalos de referencia para uso urbano en Argentina. */
export const serviceCatalog: Record<ServiceType, ServiceDefinition> = {
  aceite: { label: "Cambio de aceite y filtro", km: 10_000, months: 12 },
  service_general: { label: "Service general", km: 10_000, months: 12 },
  filtro_aire: { label: "Filtro de aire", km: 20_000, months: 24 },
  filtro_habitaculo: { label: "Filtro de habitáculo", km: 15_000, months: 12 },
  liquido_frenos: { label: "Líquido de frenos", km: 40_000, months: 24 },
  pastillas_frenos: { label: "Pastillas de freno", km: 40_000, months: null },
  bujias: { label: "Bujías", km: 40_000, months: 48 },
  correa_distribucion: { label: "Correa de distribución", km: 80_000, months: 72, critical: true },
  neumaticos: { label: "Neumáticos", km: 50_000, months: 60 },
  bateria: { label: "Batería", km: null, months: 48 },
  alineacion: { label: "Alineación y balanceo", km: 15_000, months: 12 },
  otro: { label: "Otro", km: null, months: null },
}

export const serviceTypes = Object.keys(serviceCatalog) as ServiceType[]

export type ServiceStatus = {
  type: ServiceType
  label: string
  critical: boolean
  lastDate: string | null
  lastKm: number | null
  dueKm: number | null
  dueDate: string | null
  kmRemaining: number | null
  daysRemaining: number | null
  /** 0..1 de vida consumida del intervalo (el peor entre km y tiempo). */
  progress: number
  status: Status
}

function worstStatus(kmRemaining: number | null, daysRemaining: number | null): Status {
  if (kmRemaining === null && daysRemaining === null) return "unknown"
  const overdue = (kmRemaining !== null && kmRemaining <= 0) || (daysRemaining !== null && daysRemaining <= 0)
  if (overdue) return "due"
  const soon = (kmRemaining !== null && kmRemaining <= 1_000) || (daysRemaining !== null && daysRemaining <= 30)
  return soon ? "soon" : "ok"
}

/** Estado de un ítem de mantenimiento: vence por km o por tiempo, lo que ocurra primero. */
export function getServiceStatus(
  type: ServiceType,
  records: VehicleRecords,
  currentKm: number,
  today = todayISO(),
): ServiceStatus {
  const def = serviceCatalog[type]
  const history = records.services
    .filter((s) => s.type === type)
    .sort((a, b) => a.date.localeCompare(b.date))
  const last = history.at(-1)

  if (!last) {
    return {
      type,
      label: def.label,
      critical: Boolean(def.critical),
      lastDate: null,
      lastKm: null,
      dueKm: null,
      dueDate: null,
      kmRemaining: null,
      daysRemaining: null,
      progress: 0,
      status: "unknown",
    }
  }

  const dueKm = def.km !== null ? last.km + def.km : null
  const dueDate = def.months !== null ? addMonths(last.date, def.months) : null
  const kmRemaining = dueKm !== null ? dueKm - currentKm : null
  const daysRemaining = dueDate !== null ? daysBetween(today, dueDate) : null

  const kmProgress = def.km ? (currentKm - last.km) / def.km : 0
  const timeProgress = def.months ? daysBetween(last.date, today) / (def.months * 30.4) : 0

  return {
    type,
    label: def.label,
    critical: Boolean(def.critical),
    lastDate: last.date,
    lastKm: last.km,
    dueKm,
    dueDate,
    kmRemaining,
    daysRemaining,
    progress: Math.min(1, Math.max(0, Math.max(kmProgress, timeProgress))),
    status: worstStatus(kmRemaining, daysRemaining),
  }
}

/** Ítems con historial, ordenados por urgencia. */
export function getMaintenanceOverview(
  records: VehicleRecords,
  currentKm: number,
  today = todayISO(),
): ServiceStatus[] {
  const order: Record<Status, number> = { due: 0, soon: 1, ok: 2, unknown: 3 }
  return serviceTypes
    .filter((t) => t !== "otro")
    .map((t) => getServiceStatus(t, records, currentKm, today))
    .filter((s) => s.status !== "unknown")
    .sort((a, b) => order[a.status] - order[b.status] || b.progress - a.progress)
}

// --- vencimientos --------------------------------------------------------

export type ExpirationKey = "vtv" | "seguro" | "patente" | "licencia"

export const expirationLabels: Record<ExpirationKey, string> = {
  vtv: "VTV",
  seguro: "Póliza de seguro",
  patente: "Patente (impuesto)",
  licencia: "Licencia de conducir",
}

export const expirationKeys = Object.keys(expirationLabels) as ExpirationKey[]

export type ExpirationStatus = {
  key: ExpirationKey
  label: string
  date: string | null
  daysRemaining: number | null
  status: Status
}

export function getExpirationStatus(
  key: ExpirationKey,
  records: VehicleRecords,
  today = todayISO(),
): ExpirationStatus {
  const date = records.expirations[key] ?? null
  if (!date) {
    return { key, label: expirationLabels[key], date: null, daysRemaining: null, status: "unknown" }
  }
  const daysRemaining = daysBetween(today, date)
  const status: Status = daysRemaining < 0 ? "due" : daysRemaining <= 30 ? "soon" : "ok"
  return { key, label: expirationLabels[key], date, daysRemaining, status }
}

export function getExpirationsOverview(records: VehicleRecords, today = todayISO()): ExpirationStatus[] {
  const order: Record<Status, number> = { due: 0, soon: 1, ok: 2, unknown: 3 }
  return expirationKeys
    .map((k) => getExpirationStatus(k, records, today))
    .sort((a, b) => order[a.status] - order[b.status] || (a.daysRemaining ?? 0) - (b.daysRemaining ?? 0))
}

// --- costos y consumo ----------------------------------------------------

export type CostSummary = {
  /** Consumo promedio en km por litro (requiere al menos dos cargas). */
  kmPerLiter: number | null
  fuelLast30: number
  maintenanceLast365: number
  costPerKm: number | null
  totalFuel: number
  totalMaintenance: number
}

export function getCostSummary(records: VehicleRecords, today = todayISO()): CostSummary {
  const fuel = [...records.fuel].sort((a, b) => a.date.localeCompare(b.date))

  // Método de tanque lleno: los litros de una carga cubren los km recorridos desde la anterior.
  // La primera carga queda fuera del cálculo porque no sabemos cuántos km cubrió.
  let kmSpan = 0
  let litersUsed = 0
  let costUsed = 0
  for (let i = 1; i < fuel.length; i++) {
    const delta = fuel[i].km - fuel[i - 1].km
    if (delta > 0 && fuel[i].liters > 0) {
      kmSpan += delta
      litersUsed += fuel[i].liters
      costUsed += fuel[i].cost
    }
  }

  const totalFuel = fuel.reduce((sum, f) => sum + f.cost, 0)
  const totalMaintenance = records.services.reduce((sum, s) => sum + (s.cost ?? 0), 0)

  const fuelLast30 = fuel
    .filter((f) => daysBetween(f.date, today) <= 30)
    .reduce((sum, f) => sum + f.cost, 0)

  const maintenanceLast365 = records.services
    .filter((s) => daysBetween(s.date, today) <= 365)
    .reduce((sum, s) => sum + (s.cost ?? 0), 0)

  return {
    kmPerLiter: litersUsed > 0 && kmSpan > 0 ? kmSpan / litersUsed : null,
    fuelLast30,
    maintenanceLast365,
    costPerKm: kmSpan > 0 ? costUsed / kmSpan : null,
    totalFuel,
    totalMaintenance,
  }
}

// --- resumen general -----------------------------------------------------

/** Cantidad de ítems vencidos o por vencer, para el badge del encabezado. */
export function countAlerts(records: VehicleRecords, currentKm: number, today = todayISO()): number {
  const services = getMaintenanceOverview(records, currentKm, today)
  const expirations = getExpirationsOverview(records, today)
  return [...services, ...expirations].filter((i) => i.status === "due" || i.status === "soon").length
}
