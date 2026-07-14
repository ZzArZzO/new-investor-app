import { sql } from "drizzle-orm";
import { db } from "@/db/client";
import { rateLimits } from "@/db/schema";

/**
 * Fixed-window rate limiter backed by the rate_limit table. One atomic
 * upsert per check: the window either continues (count + 1) or resets.
 * DB-backed because serverless instances share no memory; the guarded
 * routes are low-frequency (auth, billing), so one extra query is cheap.
 */
export async function checkRateLimit(scope: string, identifier: string, limit: number, windowMs: number): Promise<boolean> {
  const key = `${scope}:${identifier}`;
  const cutoff = new Date(Date.now() - windowMs);

  const rows = await db
    .insert(rateLimits)
    .values({ key, windowStart: new Date(), count: 1 })
    .onConflictDoUpdate({
      target: rateLimits.key,
      set: {
        count: sql`CASE WHEN ${rateLimits.windowStart} <= ${cutoff} THEN 1 ELSE ${rateLimits.count} + 1 END`,
        windowStart: sql`CASE WHEN ${rateLimits.windowStart} <= ${cutoff} THEN now() ELSE ${rateLimits.windowStart} END`,
      },
    })
    .returning({ count: rateLimits.count });

  return (rows[0]?.count ?? 1) <= limit;
}

/**
 * Client IP for per-IP limits. On Vercel, x-forwarded-for's first entry is
 * set by the platform and trustworthy; the fallback keys unknown clients
 * into one shared bucket rather than failing open per request.
 */
export function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

/** Standard 429 body so every guarded route answers the same way. */
export const RATE_LIMIT_MESSAGE = "Too many attempts. Try again in a few minutes.";
