import Stripe from "stripe"

let cached: Stripe | null = null

export function getStripe(): Stripe {
  if (cached) return cached
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error("Stripe no está configurado (falta STRIPE_SECRET_KEY).")
  cached = new Stripe(key)
  return cached
}

function baseUrl(): string {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return "http://localhost:3000"
}

/**
 * Creates a one-time Stripe Checkout Session. The amount is always recomputed
 * server-side from the DB before this is called — never trusted from the model.
 * An idempotency key prevents a replayed tool step from double-charging.
 */
export async function createCheckoutSession(input: {
  description: string
  amount: number // in ARS (major units)
  successPath: string
  cancelPath: string
  metadata: Record<string, string>
  idempotencyKey: string
}): Promise<{ id: string; url: string | null }> {
  const stripe = getStripe()
  const root = baseUrl()

  const session = await stripe.checkout.sessions.create(
    {
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: toUsdCents(input.amount),
            product_data: { name: input.description },
          },
        },
      ],
      metadata: input.metadata,
      success_url: `${root}${input.successPath}`,
      cancel_url: `${root}${input.cancelPath}`,
    },
    { idempotencyKey: input.idempotencyKey },
  )

  return { id: session.id, url: session.url }
}

// Stripe test mode doesn't support ARS in many accounts, so we settle in USD
// using an approximate FX rate. This is a demo settlement, not a real one.
const ARS_PER_USD = 1050

function toUsdCents(ars: number): number {
  const usd = ars / ARS_PER_USD
  return Math.max(50, Math.round(usd * 100)) // Stripe min charge safeguard
}
