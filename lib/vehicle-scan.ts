import { getDb, normalizePlate } from "./db"
import { fetchVehicleEmails, gmailConfigured } from "./gmail"
import { findVehicleByPlate, updateVehiclePatenteDue } from "./vehicles"

export type ScanResult = {
  mode: "gmail" | "demo"
  newMultas: Array<{
    id: string
    code: string
    plate: string
    description: string
    amount: number
    discountAmount: number | null
    discountUntil: string | null
    paymentUrl: string | null
  }>
  updatedPatentes: Array<{
    vehicleId: string
    plate: string
    amountDue: number
    dueDate: string | null
    period: string | null
    paymentUrl: string | null
  }>
  skippedPatentePlates: string[]
}

/**
 * Shared core behind both the on-demand "revisá mi mail" tool and the
 * proactive schedule: one Gmail pass, classified into multas (event log,
 * deduped by email_id) and patente notices (current vehicle state, only
 * written when the parsed amount/date actually changed).
 */
export async function scanVehicleNotices(opts?: { plate?: string }): Promise<ScanResult> {
  const db = getDb()
  const { multas, patentes } = await fetchVehicleEmails()

  const target = opts?.plate ? normalizePlate(opts.plate) : null
  const relevantMultas = target ? multas.filter((e) => normalizePlate(e.plate) === target) : multas
  const relevantPatentes = target ? patentes.filter((e) => normalizePlate(e.plate) === target) : patentes

  const newMultas: ScanResult["newMultas"] = []
  for (const email of relevantMultas) {
    const { data: existing } = await db.from("multas").select("id").eq("email_id", email.emailId).maybeSingle()
    if (existing) continue

    const { data, error } = await db
      .from("multas")
      .insert({
        plate: email.plate,
        code: email.code,
        description: email.description,
        location: email.location,
        infraction_date: email.infractionDate,
        amount: email.amount,
        status: "pendiente",
        source: "email",
        email_id: email.emailId,
        discount_until: email.discountUntil,
        discount_amount: email.discountAmount,
        payment_url: email.paymentUrl,
      })
      .select("id")
      .single()
    if (error || !data) continue

    newMultas.push({
      id: (data as { id: string }).id,
      code: email.code,
      plate: email.plate,
      description: email.description,
      amount: email.amount,
      discountAmount: email.discountAmount,
      discountUntil: email.discountUntil,
      paymentUrl: email.paymentUrl,
    })
  }

  const updatedPatentes: ScanResult["updatedPatentes"] = []
  const skippedPatentePlates: string[] = []
  for (const email of relevantPatentes) {
    const vehicle = await findVehicleByPlate(email.plate)
    if (!vehicle) {
      skippedPatentePlates.push(email.plate)
      continue
    }
    const result = await updateVehiclePatenteDue(vehicle.id, {
      amountDue: email.amount,
      dueDate: email.dueDate,
      period: email.period,
      paymentUrl: email.paymentUrl,
    })
    if (result.changed) {
      updatedPatentes.push({
        vehicleId: vehicle.id,
        plate: vehicle.plate,
        amountDue: email.amount,
        dueDate: email.dueDate,
        period: email.period,
        paymentUrl: email.paymentUrl,
      })
    }
  }

  return {
    mode: gmailConfigured() ? "gmail" : "demo",
    newMultas,
    updatedPatentes,
    skippedPatentePlates,
  }
}
