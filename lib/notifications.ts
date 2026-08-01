import { getDb, type Notification } from "./db"

export type NotificationCandidate = {
  kind: "multa" | "patente"
  referenceId: string
  plate: string
  fingerprint: string
  channel?: string
  messageBody: string
}

const STALE_PENDING_MS = 10 * 60 * 1000

/**
 * Reserves a notification slot for this exact (kind, reference, channel,
 * fingerprint). Returns null when it was already sent, or when a concurrent
 * tick already reserved it — the caller should skip it in that case. A
 * "pending" row older than the stale threshold is treated as an abandoned
 * attempt (the process likely died between reserve and send/mark) and
 * reclaimed for a retry. This is what makes eve's at-least-once schedule
 * delivery safe to re-fire without double-sending WhatsApp messages.
 */
export async function reserveNotification(candidate: NotificationCandidate): Promise<Notification | null> {
  const db = getDb()
  const channel = candidate.channel ?? "whatsapp"

  const { data: existing, error: fetchError } = await db
    .from("notifications")
    .select("*")
    .eq("kind", candidate.kind)
    .eq("reference_id", candidate.referenceId)
    .eq("channel", channel)
    .eq("fingerprint", candidate.fingerprint)
    .maybeSingle()
  if (fetchError) throw new Error(fetchError.message)

  if (existing) {
    const row = existing as Notification
    if (row.status === "sent") return null
    const isStalePending = row.status === "pending" && Date.now() - new Date(row.created_at).getTime() > STALE_PENDING_MS
    if (row.status === "pending" && !isStalePending) return null

    const { data, error } = await db
      .from("notifications")
      .update({ status: "pending", message_body: candidate.messageBody, error: null })
      .eq("id", row.id)
      .select("*")
      .single()
    if (error) throw new Error(error.message)
    return data as Notification
  }

  const { data, error } = await db
    .from("notifications")
    .insert({
      kind: candidate.kind,
      reference_id: candidate.referenceId,
      plate: candidate.plate,
      channel,
      fingerprint: candidate.fingerprint,
      status: "pending",
      message_body: candidate.messageBody,
    })
    .select("*")
    .single()
  if (error) {
    // Unique-index race: another concurrent tick reserved it first.
    if (error.code === "23505") return null
    throw new Error(error.message)
  }
  return data as Notification
}

export async function markNotificationSent(id: string): Promise<void> {
  const db = getDb()
  const { error } = await db
    .from("notifications")
    .update({ status: "sent", sent_at: new Date().toISOString() })
    .eq("id", id)
  if (error) throw new Error(error.message)
}

export async function markNotificationFailed(id: string, err: unknown): Promise<void> {
  const db = getDb()
  const { error } = await db
    .from("notifications")
    .update({ status: "failed", error: err instanceof Error ? err.message : String(err) })
    .eq("id", id)
  if (error) throw new Error(error.message)
}
