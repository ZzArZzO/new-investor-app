import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { subscriptions } from "@/db/schema";

export type Plan = "free" | "plus";

const ACTIVE_STATUSES = new Set(["active", "trialing"]);

/**
 * Interim entitlement while Plus billing ramps up: a comma-separated
 * PLUS_TESTER_EMAILS env allowlist grants the Plus experience for testing,
 * independent of real billing. Kept alongside getEntitlement() below.
 */
export function planForEmail(email: string | null | undefined, allowlist: string | undefined = process.env.PLUS_TESTER_EMAILS): Plan {
  if (!email || !allowlist) return "free";
  const testers = allowlist
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter((entry) => entry.length > 0);
  return testers.includes(email.toLowerCase()) ? "plus" : "free";
}

/**
 * Real billing entitlement, read from the Stripe-webhook-written `subscription`
 * table (see subscription-plan.md Phase B). Stale webhook state fails safe:
 * an expired currentPeriodEnd reads as free even if status is still "active".
 */
export async function getEntitlement(userId: string): Promise<Plan> {
  const [row] = await db
    .select({ status: subscriptions.status, currentPeriodEnd: subscriptions.currentPeriodEnd })
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId));
  if (!row) return "free";
  if (!ACTIVE_STATUSES.has(row.status)) return "free";
  if (row.currentPeriodEnd && row.currentPeriodEnd.getTime() <= Date.now()) return "free";
  return "plus";
}

/** Combined plan resolution: tester allowlist OR a real active subscription. */
export async function planForUser(userId: string, email: string | null | undefined): Promise<Plan> {
  if (planForEmail(email) === "plus") return "plus";
  return getEntitlement(userId);
}
