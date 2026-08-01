import { getDb, normalizePlate, type Multa, type Payment, type Vehicle } from "./db"

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

export async function recordPayment(input: {
  kind: "patente" | "multa"
  referenceId: string | null
  plate: string
  amount: number
  status: Payment["status"]
  stripeSessionId?: string | null
  stripePaymentIntent?: string | null
  idempotencyKey?: string | null
}): Promise<Payment> {
  const db = getDb()
  const { data, error } = await db
    .from("payments")
    .insert({
      kind: input.kind,
      reference_id: input.referenceId,
      plate: input.plate,
      amount: input.amount,
      status: input.status,
      stripe_session_id: input.stripeSessionId ?? null,
      stripe_payment_intent: input.stripePaymentIntent ?? null,
      idempotency_key: input.idempotencyKey ?? null,
    })
    .select("*")
    .single()
  if (error) throw new Error(error.message)
  return data as Payment
}

export async function listPaymentsByPlate(plate: string): Promise<Payment[]> {
  const db = getDb()
  const target = normalizePlate(plate)
  const { data, error } = await db.from("payments").select("*").order("created_at", { ascending: false })
  if (error) throw new Error(error.message)
  return (data as Payment[]).filter((p) => normalizePlate(p.plate) === target)
}
