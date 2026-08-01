import { twilioChannel } from "eve/channels/twilio"

import { markNotificationFailed, markNotificationSent } from "../../lib/notifications"

// WhatsApp via Twilio: eve's twilioChannel does no format validation on
// phone numbers, they pass straight through to Twilio's Messages API
// `To`/`From` fields — so the `whatsapp:` prefix convention Twilio uses for
// its WhatsApp Business API (same REST API as SMS) works without any extra
// config here. Only inbound replies (not used by this app's proactive-only
// flow) go through `allowFrom`.
const notifyTo = process.env.NOTIFY_WHATSAPP_TO

function notificationIdFrom(ctx: { session: { auth: { current: { attributes?: Record<string, unknown> } | null; initiator: { attributes?: Record<string, unknown> } | null } } }): string | null {
  const id = ctx.session.auth.current?.attributes?.notificationId ?? ctx.session.auth.initiator?.attributes?.notificationId
  return typeof id === "string" ? id : null
}

export default twilioChannel({
  allowFrom: notifyTo ? [`whatsapp:${notifyTo}`] : "*",
  messaging: {
    from: process.env.TWILIO_WHATSAPP_FROM ? `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}` : undefined,
  },
  events: {
    // receive() resolves once the session STARTS, not once the WhatsApp
    // send actually completes — the schedule can't tell success from
    // failure off that promise alone. These hooks are the real signal: the
    // schedule tags proactive sessions with a notificationId so we can flip
    // the notifications row here, once the turn (and the default
    // message.completed → Twilio send) actually finishes or fails.
    async "turn.completed"(_data, _channel, ctx) {
      const id = notificationIdFrom(ctx)
      if (id) await markNotificationSent(id)
    },
    async "turn.failed"(data, _channel, ctx) {
      const id = notificationIdFrom(ctx)
      if (id) await markNotificationFailed(id, data.message ?? "turn.failed")
    },
  },
})
