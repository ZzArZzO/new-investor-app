import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { subscriptions } from "@/db/schema";
import { resolveUser } from "@/lib/api-auth";
import { stripeClient } from "@/lib/stripe";
import { checkRateLimit, RATE_LIMIT_MESSAGE } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const user = await resolveUser(req);
  if (!user) return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  if (!(await checkRateLimit("portal", user.id, 10, 60 * 60 * 1000))) {
    return NextResponse.json({ message: RATE_LIMIT_MESSAGE }, { status: 429 });
  }

  const [row] = await db
    .select({ stripeCustomerId: subscriptions.stripeCustomerId })
    .from(subscriptions)
    .where(eq(subscriptions.userId, user.id));
  if (!row) return NextResponse.json({ message: "No billing account found" }, { status: 404 });

  const origin = new URL(req.url).origin;
  const stripe = stripeClient();
  const session = await stripe.billingPortal.sessions.create({
    customer: row.stripeCustomerId,
    return_url: `${origin}/settings`,
  });

  return NextResponse.json({ url: session.url });
}
