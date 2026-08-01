import { createClient } from "@supabase/supabase-js"

/**
 * Server-only Supabase client using the service role key. RLS is enabled on
 * every table and no anon policies exist, so all reads/writes MUST go through
 * this client, which only ever runs on the server (agent tools + RSC/route
 * handlers). Never import this from a "use client" module.
 */
export function getDb() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error("Supabase no está configurado (falta SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY).")
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

// ---- Domain types (mirror the Supabase schema) ----

export type PatenteStatus = "al_dia" | "pendiente" | "vencida"

export type Vehicle = {
  id: string
  plate: string
  brand: string
  model: string
  year: number
  owner_name: string | null
  patente_status: PatenteStatus
  patente_period: string | null
  patente_amount_due: number
  patente_due_date: string | null
  created_at: string
}

export type MultaStatus = "pendiente" | "pagada" | "en_proceso"

export type Multa = {
  id: string
  plate: string
  code: string | null
  description: string
  location: string | null
  infraction_date: string | null
  amount: number
  status: MultaStatus
  source: "manual" | "email"
  email_id: string | null
  discount_until: string | null
  discount_amount: number | null
  created_at: string
}

export type Payment = {
  id: string
  kind: "patente" | "multa"
  reference_id: string | null
  plate: string
  amount: number
  currency: string
  status: "pending" | "paid" | "failed"
  stripe_session_id: string | null
  stripe_payment_intent: string | null
  idempotency_key: string | null
  created_at: string
}

// Normalizes a plate for comparison: uppercase, no spaces/dashes.
export function normalizePlate(plate: string): string {
  return plate.toUpperCase().replace(/[\s-]/g, "")
}

export function formatARS(amount: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(amount)
}
