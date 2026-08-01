import mockData from "./mock-plates.json"
import { normalizePlate, type Multa, type Vehicle } from "./db"

/**
 * Local, hardcoded plates for demoing consultation flows without depending
 * on Supabase — used only by the read-only get_patente_status/list_multas/
 * get_*_payment_link tools. Payment confirmation still requires a real
 * Supabase row, so confirm_*_payment does not apply to these plates.
 */
const mockVehicles = mockData.vehicles as Vehicle[]
const mockMultas = mockData.multas as Multa[]

export function findMockVehicleByPlate(plate: string): Vehicle | null {
  const target = normalizePlate(plate)
  return mockVehicles.find((v) => normalizePlate(v.plate) === target) ?? null
}

export function listMockMultasByPlate(plate: string): Multa[] {
  const target = normalizePlate(plate)
  return mockMultas.filter((m) => normalizePlate(m.plate) === target)
}

export function findMockMultaById(id: string): Multa | null {
  return mockMultas.find((m) => m.id === id) ?? null
}
