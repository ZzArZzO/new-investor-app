import Stripe from "stripe";

/**
 * Single Stripe client, hosted Checkout + Customer Portal only (no custom
 * payment UI, see subscription-plan.md Phase B). Throws at call time, not
 * import time, so routes that don't touch Stripe still work without the key set.
 */
export function stripeClient(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not configured");
  return new Stripe(key);
}

export const PLUS_PRICE_IDS = {
  monthly: process.env.STRIPE_PRICE_ID_MONTHLY,
  annual: process.env.STRIPE_PRICE_ID_ANNUAL,
} as const;

export type PlusInterval = keyof typeof PLUS_PRICE_IDS;

export function priceIdForInterval(interval: PlusInterval): string {
  const id = PLUS_PRICE_IDS[interval];
  if (!id) throw new Error(`STRIPE_PRICE_ID_${interval.toUpperCase()} not configured`);
  return id;
}
