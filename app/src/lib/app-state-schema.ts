import * as z from "zod";

const holdingTypeSchema = z.enum(["index", "bonds", "crypto", "other"]);

// Generous multiples of what the app can legitimately produce, tight enough
// that a hostile client can't grow the JSONB blob without bound.
const shortStr = z.string().max(80);
const dateStr = z.string().max(20).nullable();

const holdingSchema = z.object({
  id: shortStr,
  label: z.string().max(120),
  type: holdingTypeSchema,
  contributed: z.number().finite(),
  value: z.number().finite().optional(),
  added: z.string().max(20),
});

/**
 * Mirrors AppState (content/types.ts). Loose/partial like
 * looksLikeAppState in app-state-transfer.ts, validates the PUT /api/state
 * body is shaped correctly without requiring every field, so a client on an
 * older schema version doesn't get hard-rejected. Sizes are capped at every
 * level so the payload can't be abused as unbounded storage.
 */
export const appStateSchema = z
  .object({
    done: z.array(shortStr).max(500),
    persona: z.enum(["A", "B", "C", "D"]).nullable(),
    streak: z.object({ count: z.number().finite(), last: dateStr, freezes: z.number().finite().optional() }),
    daily: z.object({ last: dateStr }),
    xp: z.number().finite(),
    badges: z.array(shortStr).max(200),
    holdings: z.array(holdingSchema).max(300),
    contributions: z.object({ last: dateStr, count: z.number().finite() }),
    scamDaily: z.object({ last: dateStr, streak: z.number().finite(), best: z.number().finite() }),
    actions: z.array(shortStr).max(300),
    review: z
      .object({
        items: z.array(z.object({ id: shortStr, due: z.string().max(20), ease: z.number().finite() })).max(3000),
        day: dateStr,
        doneToday: z.number().finite(),
      })
      .optional(),
    emails: z.object({ streak: z.boolean(), weekly: z.boolean() }).optional(),
  })
  .partial();

export type AppStateInput = z.infer<typeof appStateSchema>;

/** Hard byte ceiling for a state payload, far above any legitimate blob (~10-20 KB). */
export const MAX_STATE_BYTES = 100_000;

/**
 * Reads and parses a state request body, enforcing the byte ceiling before
 * JSON.parse so oversized payloads are rejected cheaply. Returns null when
 * the body is too large or not valid JSON.
 */
export async function readStateBody(req: Request): Promise<unknown | null> {
  const text = await req.text();
  if (text.length > MAX_STATE_BYTES) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}
