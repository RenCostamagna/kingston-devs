import { defineSchedule } from "eve/schedules"

import { formatARS } from "../../lib/db"
import { markNotificationFailed, reserveNotification } from "../../lib/notifications"
import { baseUrl } from "../../lib/url"
import { scanVehicleNotices, type ScanResult } from "../../lib/vehicle-scan"
import twilio from "../channels/twilio"

type Candidate = {
  kind: "multa" | "patente"
  referenceId: string
  plate: string
  fingerprint: string
  text: string
}

function buildCandidates(result: ScanResult): Candidate[] {
  const root = baseUrl()
  const candidates: Candidate[] = []

  for (const multa of result.newMultas) {
    const hasDiscount = multa.discountAmount != null && multa.discountUntil != null
    const discountNote = hasDiscount
      ? ` (con descuento vigente: ${formatARS(multa.discountAmount!)} hasta ${multa.discountUntil})`
      : ""
    candidates.push({
      kind: "multa",
      referenceId: multa.id,
      plate: multa.plate,
      fingerprint: multa.id,
      text: `Wheelo: nueva multa para ${multa.plate} - ${multa.description}. ${formatARS(multa.amount)}${discountNote}. Mirá cómo pagarla: ${root}/multas?multaId=${multa.id}`,
    })
  }

  for (const patente of result.updatedPatentes) {
    const dueLabel = patente.dueDate ? `vence el ${patente.dueDate}` : "tiene un nuevo saldo"
    const periodLabel = patente.period ? ` - ${patente.period}` : ""
    candidates.push({
      kind: "patente",
      referenceId: patente.vehicleId,
      plate: patente.plate,
      fingerprint: `${patente.amountDue}:${patente.dueDate ?? ""}`,
      text: `Wheelo: tu patente ${patente.plate} ${dueLabel}${periodLabel}, ${formatARS(patente.amountDue)}. Mirá cómo pagarla: ${root}/patente?plate=${patente.plate}`,
    })
  }

  return candidates
}

// receive() starts a normal agent turn on the target channel — there's no
// raw "send this literal text" primitive in eve — so the directive tells
// the model to relay the precomputed text as-is instead of composing its
// own reply from scratch.
function toDirective(text: string): string {
  return `Mandale este aviso al usuario por WhatsApp, tal cual, sin agregar saludos ni reformular nada: "${text}"`
}

export default defineSchedule({
  // Once a day (Vercel Hobby plan only allows daily cron jobs). Vercel
  // evaluates cron in UTC — 12:00 UTC is 09:00 in Argentina (UTC-3).
  cron: "0 12 * * *",
  async run({ receive, waitUntil, appAuth }) {
    const to = process.env.NOTIFY_WHATSAPP_TO
    if (!to) return

    const result = await scanVehicleNotices()
    const candidates = buildCandidates(result)

    for (const candidate of candidates) {
      const reserved = await reserveNotification({
        kind: candidate.kind,
        referenceId: candidate.referenceId,
        plate: candidate.plate,
        fingerprint: candidate.fingerprint,
        messageBody: candidate.text,
      })
      if (!reserved) continue

      // receive() resolves once the session STARTS, not once the WhatsApp
      // send completes — actual success/failure is reported later via the
      // "turn.completed"/"turn.failed" hooks on agent/channels/twilio.ts,
      // correlated back to this row through auth.attributes.notificationId.
      // Only a receive() rejection itself (the session never started at
      // all) is handled here.
      waitUntil(
        receive(twilio, {
          message: toDirective(candidate.text),
          target: { phoneNumber: `whatsapp:${to}` },
          auth: { ...appAuth, attributes: { ...appAuth.attributes, notificationId: reserved.id } },
        }).catch((err) => markNotificationFailed(reserved.id, err)),
      )
    }
  },
})
