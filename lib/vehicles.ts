import { getDb, normalizePlate, type Multa, type PatenteStatus, type Vehicle } from "./db"

export async function findVehicleByPlate(plate: string): Promise<Vehicle | null> {
  const db = getDb()
  const target = normalizePlate(plate)
  // Fetch all and match on normalized plate so "AB 123 CD" == "AB123CD".
  const { data, error } = await db.from("vehicles").select("*")
  if (error) throw new Error(error.message)
  const match = (data as Vehicle[]).find((v) => normalizePlate(v.plate) === target)
  return match ?? null
}

export async function listVehicles(): Promise<Vehicle[]> {
  const db = getDb()
  const { data, error } = await db.from("vehicles").select("*").order("plate")
  if (error) throw new Error(error.message)
  return data as Vehicle[]
}

export async function countPendingMultas(): Promise<number> {
  const db = getDb()
  const { count, error } = await db
    .from("multas")
    .select("*", { count: "exact", head: true })
    .eq("status", "pendiente")
  if (error) throw new Error(error.message)
  return count ?? 0
}

export async function countPendingPatentes(): Promise<number> {
  const db = getDb()
  const { count, error } = await db
    .from("vehicles")
    .select("*", { count: "exact", head: true })
    .neq("patente_status", "al_dia")
  if (error) throw new Error(error.message)
  return count ?? 0
}

export async function listMultasByPlate(plate: string): Promise<Multa[]> {
  const db = getDb()
  const target = normalizePlate(plate)
  const { data, error } = await db.from("multas").select("*").order("infraction_date", { ascending: false })
  if (error) throw new Error(error.message)
  return (data as Multa[]).filter((m) => normalizePlate(m.plate) === target)
}

export async function getMultaById(id: string): Promise<Multa | null> {
  const db = getDb()
  const { data, error } = await db.from("multas").select("*").eq("id", id).maybeSingle()
  if (error) throw new Error(error.message)
  return (data as Multa) ?? null
}

export async function markMultaPaid(id: string): Promise<void> {
  const db = getDb()
  const { error } = await db.from("multas").update({ status: "pagada" }).eq("id", id)
  if (error) throw new Error(error.message)
}

export async function markVehiclePatentePaid(id: string): Promise<void> {
  const db = getDb()
  const { error } = await db
    .from("vehicles")
    .update({ patente_status: "al_dia", patente_amount_due: 0 })
    .eq("id", id)
  if (error) throw new Error(error.message)
}

/**
 * Applies a patente due-date/amount notice parsed from email to the current
 * vehicle state. Unlike multas (an event log deduped by email_id), vehicles
 * holds current state, so this only writes when the parsed values actually
 * differ from what's already stored.
 */
export async function updateVehiclePatenteDue(
  vehicleId: string,
  input: { amountDue: number; dueDate: string | null; period: string | null; paymentUrl: string | null },
): Promise<{ changed: boolean; vehicle: Vehicle | null }> {
  const db = getDb()
  const { data: existing, error: fetchError } = await db
    .from("vehicles")
    .select("*")
    .eq("id", vehicleId)
    .maybeSingle()
  if (fetchError) throw new Error(fetchError.message)
  const vehicle = existing as Vehicle | null
  if (!vehicle) return { changed: false, vehicle: null }

  const unchanged =
    Number(vehicle.patente_amount_due) === input.amountDue &&
    vehicle.patente_due_date === input.dueDate &&
    vehicle.patente_period === input.period
  if (unchanged) return { changed: false, vehicle }

  const today = new Date().toISOString().slice(0, 10)
  const status: PatenteStatus = input.dueDate && input.dueDate < today ? "vencida" : "pendiente"

  const { data, error } = await db
    .from("vehicles")
    .update({
      patente_status: status,
      patente_amount_due: input.amountDue,
      patente_due_date: input.dueDate,
      patente_period: input.period,
      payment_url: input.paymentUrl,
    })
    .eq("id", vehicleId)
    .select("*")
    .single()
  if (error) throw new Error(error.message)
  return { changed: true, vehicle: data as Vehicle }
}
