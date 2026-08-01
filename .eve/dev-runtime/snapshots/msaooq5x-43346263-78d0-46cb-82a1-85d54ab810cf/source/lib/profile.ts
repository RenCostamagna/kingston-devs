"use client"

import { useSyncExternalStore } from "react"

import { vehicle, type Vehicle } from "./mock-data"
import { todayISO, type ExpirationKey, type ServiceType } from "./vehicle-insights"

export const PROFILE_KEY = "wheelo:profile"
export const GARAGE_KEY = "wheelo:garage"

export type UserProfile = Vehicle

/** Lectura del odómetro cargada por el usuario en una fecha puntual. */
export type OdometerReading = { id: string; km: number; date: string }

export type ServiceRecord = {
  id: string
  type: ServiceType
  date: string
  km: number
  cost?: number
  workshop?: string
  notes?: string
}

export type FuelLog = { id: string; date: string; km: number; liters: number; cost: number }

export type VehicleRecords = {
  odometer: OdometerReading[]
  services: ServiceRecord[]
  expirations: Partial<Record<ExpirationKey, string>>
  fuel: FuelLog[]
}

export const emptyRecords: VehicleRecords = { odometer: [], services: [], expirations: {}, fuel: [] }

/** A vehicle stored in the garage, identified so it can be selected/removed. */
export type GarageVehicle = UserProfile & { id: string; records: VehicleRecords }

export type Garage = {
  vehicles: GarageVehicle[]
  selectedId: string
}

export const defaultProfile: UserProfile = vehicle

function makeId(prefix = "veh") {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`
}

/** Completa los registros faltantes al leer datos guardados por versiones previas. */
function normalizeRecords(records?: Partial<VehicleRecords>): VehicleRecords {
  return {
    odometer: records?.odometer ?? [],
    services: records?.services ?? [],
    expirations: records?.expirations ?? {},
    fuel: records?.fuel ?? [],
  }
}

function buildGarage(vehicles: GarageVehicle[], selectedId?: string): Garage {
  const list =
    vehicles.length > 0 ? vehicles : [{ ...defaultProfile, id: makeId(), records: normalizeRecords() }]
  const selected = list.some((v) => v.id === selectedId) ? (selectedId as string) : list[0].id
  return { vehicles: list, selectedId: selected }
}

export const defaultGarage: Garage = buildGarage([
  { ...defaultProfile, id: "veh-default", records: normalizeRecords() },
])

function readGarage(): Garage {
  if (typeof window === "undefined") return defaultGarage
  try {
    const raw = window.localStorage.getItem(GARAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<Garage>
      const vehicles = (parsed.vehicles ?? [])
        .filter(Boolean)
        .map((v) => ({ ...defaultProfile, ...v, id: v.id || makeId(), records: normalizeRecords(v.records) }))
      return buildGarage(vehicles, parsed.selectedId)
    }

    // Migrate a pre-garage single profile saved during onboarding.
    const legacy = window.localStorage.getItem(PROFILE_KEY)
    if (legacy) {
      const parsed = JSON.parse(legacy) as Partial<UserProfile>
      return buildGarage([{ ...defaultProfile, ...parsed, id: makeId(), records: normalizeRecords() }])
    }
  } catch {
    // ignore malformed/unavailable storage
  }
  return defaultGarage
}

// --- store ---------------------------------------------------------------

let cache: Garage | null = null
const listeners = new Set<() => void>()

function emit() {
  for (const l of listeners) l()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot(): Garage {
  if (!cache) cache = readGarage()
  return cache
}

function getServerSnapshot(): Garage {
  return defaultGarage
}

function writeGarage(next: Garage) {
  cache = next
  try {
    window.localStorage.setItem(GARAGE_KEY, JSON.stringify(next))
    // Keep the legacy key in sync so older readers see the selected vehicle.
    const selected = next.vehicles.find((v) => v.id === next.selectedId)
    if (selected) window.localStorage.setItem(PROFILE_KEY, JSON.stringify(selected))
  } catch {
    // ignore write errors (private mode, quota, etc.)
  }
  emit()
}

// --- public API ----------------------------------------------------------

export function loadGarage(): Garage {
  return getSnapshot()
}

/** Reads the currently selected vehicle. */
export function loadProfile(): UserProfile {
  const g = getSnapshot()
  return g.vehicles.find((v) => v.id === g.selectedId) ?? defaultProfile
}

/** Replaces the selected vehicle (used by onboarding for the first vehicle). */
export function saveProfile(profile: UserProfile) {
  const g = getSnapshot()
  writeGarage({
    ...g,
    vehicles: g.vehicles.map((v) => (v.id === g.selectedId ? { ...v, ...profile } : v)),
  })
}

export function addVehicle(profile: UserProfile): GarageVehicle {
  const g = getSnapshot()
  // El km inicial cuenta como la primera lectura del odómetro.
  const created: GarageVehicle = {
    ...profile,
    id: makeId(),
    records: {
      ...emptyRecords,
      odometer: [{ id: makeId("odo"), km: profile.mileage, date: todayISO() }],
    },
  }
  writeGarage({ vehicles: [...g.vehicles, created], selectedId: created.id })
  return created
}

export function selectVehicle(id: string) {
  const g = getSnapshot()
  if (!g.vehicles.some((v) => v.id === id) || g.selectedId === id) return
  writeGarage({ ...g, selectedId: id })
}

export function removeVehicle(id: string) {
  const g = getSnapshot()
  if (g.vehicles.length <= 1) return
  const vehicles = g.vehicles.filter((v) => v.id !== id)
  writeGarage(buildGarage(vehicles, g.selectedId === id ? vehicles[0].id : g.selectedId))
}

// --- registros del vehículo ---------------------------------------------

/** Aplica un cambio sobre los registros de un vehículo del garage. */
function updateRecords(vehicleId: string, fn: (records: VehicleRecords) => VehicleRecords) {
  const g = getSnapshot()
  writeGarage({
    ...g,
    vehicles: g.vehicles.map((v) => (v.id === vehicleId ? { ...v, records: fn(v.records) } : v)),
  })
}

/** Registra una lectura del odómetro y sincroniza el km del vehículo. */
export function addOdometerReading(vehicleId: string, km: number, date: string) {
  const g = getSnapshot()
  const reading: OdometerReading = { id: makeId("odo"), km, date }
  writeGarage({
    ...g,
    vehicles: g.vehicles.map((v) => {
      if (v.id !== vehicleId) return v
      const odometer = [...v.records.odometer.filter((r) => r.date !== date), reading].sort((a, b) =>
        a.date.localeCompare(b.date),
      )
      // mileage refleja siempre la última lectura para el resto de la app.
      return { ...v, mileage: odometer.at(-1)?.km ?? km, records: { ...v.records, odometer } }
    }),
  })
}

export function removeOdometerReading(vehicleId: string, readingId: string) {
  updateRecords(vehicleId, (r) => ({ ...r, odometer: r.odometer.filter((x) => x.id !== readingId) }))
}

export function addServiceRecord(vehicleId: string, record: Omit<ServiceRecord, "id">) {
  updateRecords(vehicleId, (r) => ({
    ...r,
    services: [...r.services, { ...record, id: makeId("srv") }].sort((a, b) => b.date.localeCompare(a.date)),
  }))
}

export function removeServiceRecord(vehicleId: string, recordId: string) {
  updateRecords(vehicleId, (r) => ({ ...r, services: r.services.filter((x) => x.id !== recordId) }))
}

export function setExpiration(vehicleId: string, key: ExpirationKey, date: string | null) {
  updateRecords(vehicleId, (r) => {
    const expirations = { ...r.expirations }
    if (date) expirations[key] = date
    else delete expirations[key]
    return { ...r, expirations }
  })
}

export function addFuelLog(vehicleId: string, log: Omit<FuelLog, "id">) {
  updateRecords(vehicleId, (r) => ({
    ...r,
    fuel: [...r.fuel, { ...log, id: makeId("fuel") }].sort((a, b) => b.date.localeCompare(a.date)),
  }))
}

export function removeFuelLog(vehicleId: string, logId: string) {
  updateRecords(vehicleId, (r) => ({ ...r, fuel: r.fuel.filter((x) => x.id !== logId) }))
}

/** Reactive garage state. Server render uses the default so hydration matches. */
export function useGarage(): Garage {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/** Reactive selected vehicle. */
export function useProfile(): UserProfile {
  return useSelectedVehicle()
}

/** Reactive selected vehicle including its id and records. */
export function useSelectedVehicle(): GarageVehicle {
  const garage = useGarage()
  return garage.vehicles.find((v) => v.id === garage.selectedId) ?? garage.vehicles[0]
}
