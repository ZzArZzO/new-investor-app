import { describe, expect, it } from "vitest";
import { exportState, importState } from "./app-state-transfer";
import { initialAppState, withLessonCompleted, withXp } from "./app-state-logic";

describe("exportState / importState", () => {
  it("round-trips a state through export and import unchanged", () => {
    let state = withLessonCompleted(initialAppState(), "l1");
    state = withXp(state, 20);
    const blob = exportState(state);
    expect(importState(blob)).toEqual(state);
  });

  it("returns null for malformed JSON", () => {
    expect(importState("not json")).toBeNull();
  });

  it("returns null for unrelated JSON that doesn't look like app state", () => {
    expect(importState(JSON.stringify({ foo: "bar" }))).toBeNull();
  });

  it("merges over defaults so an older export missing a newer field still hydrates", () => {
    const partial = { ...initialAppState(), xp: 5 } as Record<string, unknown>;
    delete partial.actions;
    const result = importState(JSON.stringify(partial));
    expect(result).toEqual({ ...initialAppState(), xp: 5, actions: [] });
  });
});
