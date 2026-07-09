import { describe, expect, it } from "vitest";
import { appStateSchema } from "./app-state-schema";
import { initialAppState } from "./app-state-logic";

describe("appStateSchema", () => {
  it("accepts a full valid AppState", () => {
    const state = { ...initialAppState(), xp: 20, persona: "B" as const };
    expect(appStateSchema.safeParse(state).success).toBe(true);
  });

  it("accepts a partial payload (forward-compat, older clients missing newer fields)", () => {
    expect(appStateSchema.safeParse({ xp: 5 }).success).toBe(true);
  });

  it("rejects a wrong-typed field", () => {
    expect(appStateSchema.safeParse({ xp: "twenty" }).success).toBe(false);
  });

  it("rejects an invalid persona value", () => {
    expect(appStateSchema.safeParse({ persona: "Z" }).success).toBe(false);
  });

  it("rejects a holding with an invalid type", () => {
    const bad = { holdings: [{ id: "h1", label: "x", type: "stonks", contributed: 10, added: "2026-07-08" }] };
    expect(appStateSchema.safeParse(bad).success).toBe(false);
  });
});
