import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { subscriptions } from "@/db/schema";
import { resolveUser } from "@/lib/api-auth";
import { priceIdForInterval, stripeClient, type PlusInterval } from "@/lib/stripe";
import { checkRateLimit, RATE_LIMIT_MESSAGE } from "@/lib/rate-limit";

const VALID_INTERVALS: readonly PlusInterval[] = ["monthly", "annual"];

function isPlusInterval(value: unknown): value is PlusInterval {
  return typeof value === "string" && (VALID_INTERVALS as readonly string[]).includes(value);
}

async function findOrCreateCustomerId(userId: string, email: string | null): Promise<string> {
  const [existing] = await db
    .select({ stripeCustomerId: subscriptions.stripeCustomerId })
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId));
  if (existing) return existing.stripeCustomerId;

  const stripe = stripeClient();
  const customer = await stripe.customers.create({ email: email ?? undefined, metadata: { userId } });
  await db
    .insert(subscriptions)
    .values({ userId, stripeCustomerId: customer.id, status: "incomplete" })
    .onConflictDoUpdate({ target: subscriptions.userId, set: { stripeCustomerId: customer.id } });
  return customer.id;
}

export async function POST(req: Request) {
  const user = await resolveUser(req);
  if (!user) return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  if (!(await checkRateLimit("checkout", user.id, 5, 60 * 60 * 1000))) {
    return NextResponse.json({ message: RATE_LIMIT_MESSAGE }, { status: 429 });
  }

  const body: unknown = await req.json().catch(() => ({}));
  const interval = (body as { interval?: unknown })?.interval;
  if (!isPlusInterval(interval)) {
    return NextResponse.json({ message: "interval must be 'monthly' or 'annual'" }, { status: 400 });
  }

  const origin = new URL(req.url).origin;
  const customerId = await findOrCreateCustomerId(user.id, user.email);
  const stripe = stripeClient();
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    client_reference_id: user.id,
    line_items: [{ price: priceIdForInterval(interval), quantity: 1 }],
    automatic_tax: { enabled: true },
    payment_method_types: ["card", "ideal"],
    success_url: `${origin}/settings?checkout=success`,
    cancel_url: `${origin}/settings?checkout=cancelled`,
  });

  return NextResponse.json({ url: session.url });
}
