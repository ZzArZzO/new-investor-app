import { describe, expect, it } from "vitest";
import { appStateSchema, MAX_STATE_BYTES, readStateBody } from "./app-state-schema";
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

  it("rejects oversized string entries", () => {
    expect(appStateSchema.safeParse({ done: ["x".repeat(1000)] }).success).toBe(false);
  });

  it("rejects unbounded arrays", () => {
    const bad = { done: Array.from({ length: 501 }, (_, i) => `l${i}`) };
    expect(appStateSchema.safeParse(bad).success).toBe(false);
  });

  it("rejects non-finite numbers", () => {
    expect(appStateSchema.safeParse({ xp: Infinity }).success).toBe(false);
  });
});

describe("readStateBody", () => {
  function reqWith(body: string): Request {
    return new Request("https://x.test", { method: "PUT", body });
  }

  it("parses a normal JSON body", async () => {
    expect(await readStateBody(reqWith('{"xp":5}'))).toEqual({ xp: 5 });
  });

  it("rejects bodies over the byte ceiling without parsing them", async () => {
    const huge = `"${"x".repeat(MAX_STATE_BYTES + 10)}"`;
    expect(await readStateBody(reqWith(huge))).toBeNull();
  });

  it("rejects invalid JSON", async () => {
    expect(await readStateBody(reqWith("{not json"))).toBeNull();
  });
});
