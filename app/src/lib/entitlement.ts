export type Plan = "free" | "plus";

/**
 * Interim entitlement while Plus is fake-door only: a comma-separated
 * PLUS_TESTER_EMAILS env allowlist grants the Plus experience for testing.
 * Real billing (Stripe-written `subscription` table) replaces this in Phase B —
 * see subscription-plan.md. Server-side only; the client just receives the plan.
 */
export function planForEmail(email: string | null | undefined, allowlist: string | undefined = process.env.PLUS_TESTER_EMAILS): Plan {
  if (!email || !allowlist) return "free";
  const testers = allowlist
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter((entry) => entry.length > 0);
  return testers.includes(email.toLowerCase()) ? "plus" : "free";
}
