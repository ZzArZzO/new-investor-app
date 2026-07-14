import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import type Stripe from "stripe";
import { db } from "@/db/client";
import { subscriptions } from "@/db/schema";
import { stripeClient } from "@/lib/stripe";

interface SubscriptionPatch {
  stripeSubscriptionId: string;
  status: string;
  priceId: string | null;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean;
}

function patchFromSubscription(sub: Stripe.Subscription): SubscriptionPatch {
  const item = sub.items.data[0];
  const periodEnd = item?.current_period_end;
  return {
    stripeSubscriptionId: sub.id,
    status: sub.status,
    priceId: item?.price.id ?? null,
    currentPeriodEnd: periodEnd ? new Date(periodEnd * 1000) : null,
    cancelAtPeriodEnd: sub.cancel_at_period_end,
  };
}

async function upsertForCustomer(customerId: string, patch: SubscriptionPatch): Promise<void> {
  const [existing] = await db
    .select({ userId: subscriptions.userId })
    .from(subscriptions)
    .where(eq(subscriptions.stripeCustomerId, customerId));
  // No row yet means checkout.session.completed hasn't landed for this
  // customer, nothing to attach this update to; 200-noop per spec.
  if (!existing) return;

  await db
    .update(subscriptions)
    .set({ ...patch, updatedAt: new Date() })
    .where(eq(subscriptions.userId, existing.userId));
}

async function handleCheckoutCompleted(stripe: Stripe, session: Stripe.Checkout.Session): Promise<void> {
  const userId = session.client_reference_id;
  const customerId = typeof session.customer === "string" ? session.customer : session.customer?.id;
  const subscriptionId = typeof session.subscription === "string" ? session.subscription : session.subscription?.id;
  if (!userId || !customerId || !subscriptionId) return;

  const sub = await stripe.subscriptions.retrieve(subscriptionId);
  await db
    .insert(subscriptions)
    .values({ userId, stripeCustomerId: customerId, ...patchFromSubscription(sub) })
    .onConflictDoUpdate({
      target: subscriptions.userId,
      set: { stripeCustomerId: customerId, ...patchFromSubscription(sub), updatedAt: new Date() },
    });
}

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers.get("stripe-signature");
  if (!secret || !signature) return NextResponse.json({ message: "Webhook not configured" }, { status: 400 });

  const body = await req.text();
  const stripe = stripeClient();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch {
    return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutCompleted(stripe, event.data.object);
      break;
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object;
      const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer.id;
      await upsertForCustomer(customerId, patchFromSubscription(sub));
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
