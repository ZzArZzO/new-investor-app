import * as z from "zod";

const holdingTypeSchema = z.enum(["index", "bonds", "crypto", "other"]);

const holdingSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: holdingTypeSchema,
  contributed: z.number(),
  value: z.number().optional(),
  added: z.string(),
});

/**
 * Mirrors AppState (content/types.ts). Loose/partial like
 * looksLikeAppState in app-state-transfer.ts — validates the PUT /api/state
 * body is shaped correctly without requiring every field, so a client on an
 * older schema version doesn't get hard-rejected.
 */
export const appStateSchema = z
  .object({
    done: z.array(z.string()),
    persona: z.enum(["A", "B", "C", "D"]).nullable(),
    streak: z.object({ count: z.number(), last: z.string().nullable(), freezes: z.number().optional() }),
    daily: z.object({ last: z.string().nullable() }),
    xp: z.number(),
    badges: z.array(z.string()),
    holdings: z.array(holdingSchema),
    contributions: z.object({ last: z.string().nullable(), count: z.number() }),
    scamDaily: z.object({ last: z.string().nullable(), streak: z.number(), best: z.number() }),
    actions: z.array(z.string()),
    review: z
      .object({
        items: z.array(z.object({ id: z.string(), due: z.string(), ease: z.number() })),
        day: z.string().nullable(),
        doneToday: z.number(),
      })
      .optional(),
  })
  .partial();

export type AppStateInput = z.infer<typeof appStateSchema>;
