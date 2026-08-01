"use client"

import { useSyncExternalStore } from "react"

import { vehicle, type Vehicle } from "./mock-data"

export const PROFILE_KEY = "wheelo:profile"
export const GARAGE_KEY = "wheelo:garage"

export type UserProfile = Vehicle

/** A vehicle stored in the garage, identified so it can be selected/removed. */
export type GarageVehicle = UserProfile & { id: string }

export type Garage = {
  vehicles: GarageVehicle[]
  selectedId: string
}

export const defaultProfile: UserProfile = vehicle

function makeId() {
  return `veh-${Math.random().toString(36).slice(2, 10)}`
}

function buildGarage(vehicles: GarageVehicle[], selectedId?: string): Garage {
  const list = vehicles.length > 0 ? vehicles : [{ ...defaultProfile, id: makeId() }]
  const selected = list.some((v) => v.id === selectedId) ? (selectedId as string) : list[0].id
  return { vehicles: list, selectedId: selected }
}

export const defaultGarage: Garage = buildGarage([{ ...defaultProfile, id: "veh-default" }])

function readGarage(): Garage {
  if (typeof window === "undefined") return defaultGarage
  try {
    const raw = window.localStorage.getItem(GARAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<Garage>
      const vehicles = (parsed.vehicles ?? [])
        .filter(Boolean)
        .map((v) => ({ ...defaultProfile, ...v, id: v.id || makeId() }))
      return buildGarage(vehicles, parsed.selectedId)
    }

    // Migrate a pre-garage single profile saved during onboarding.
    const legacy = window.localStorage.getItem(PROFILE_KEY)
    if (legacy) {
      const parsed = JSON.parse(legacy) as Partial<UserProfile>
      return buildGarage([{ ...defaultProfile, ...parsed, id: makeId() }])
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
  const created: GarageVehicle = { ...profile, id: makeId() }
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

/** Reactive garage state. Server render uses the default so hydration matches. */
export function useGarage(): Garage {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/** Reactive selected vehicle. */
export function useProfile(): UserProfile {
  const garage = useGarage()
  return garage.vehicles.find((v) => v.id === garage.selectedId) ?? defaultProfile
}
