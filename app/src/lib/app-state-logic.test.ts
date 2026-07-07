import { describe, expect, it } from "vitest";
import {
  initialAppState,
  withActionToggled,
  withBadgesChecked,
  withContributionLogged,
  withHoldingAdded,
  withHoldingRemoved,
  withLessonCompleted,
  withScamDailyPlayed,
  withStreakBumped,
  withXp,
} from "./app-state-logic";
import type { Holding } from "@/content/types";

const holding: Holding = { id: "h1", label: "World index ETF", type: "index", contributed: 1000, added: "2026-07-07" };

describe("withLessonCompleted", () => {
  it("adds a new lesson id to done", () => {
    const state = withLessonCompleted(initialAppState(), "l1");
    expect(state.done).toEqual(["l1"]);
  });

  it("is a no-op if the lesson is already done", () => {
    const state = withLessonCompleted(initialAppState(), "l1");
    const again = withLessonCompleted(state, "l1");
    expect(again).toBe(state);
  });
});

describe("withXp", () => {
  it("accumulates across calls", () => {
    let state = initialAppState();
    state = withXp(state, 20);
    state = withXp(state, 5);
    expect(state.xp).toBe(25);
  });
});

describe("withStreakBumped", () => {
  it("starts a streak at 1 on first use", () => {
    const state = withStreakBumped(initialAppState(), "2026-07-07", "2026-07-06");
    expect(state.streak).toEqual({ count: 1, last: "2026-07-07" });
  });

  it("increments when the last active day was yesterday", () => {
    const state = withStreakBumped(
      { ...initialAppState(), streak: { count: 3, last: "2026-07-06" } },
      "2026-07-07",
      "2026-07-06",
    );
    expect(state.streak.count).toBe(4);
  });

  it("resets to 1 when a day was missed", () => {
    const state = withStreakBumped(
      { ...initialAppState(), streak: { count: 5, last: "2026-07-01" } },
      "2026-07-07",
      "2026-07-06",
    );
    expect(state.streak.count).toBe(1);
  });

  it("is a no-op if already bumped today", () => {
    const already = { ...initialAppState(), streak: { count: 2, last: "2026-07-07" } };
    const state = withStreakBumped(already, "2026-07-07", "2026-07-06");
    expect(state).toBe(already);
  });
});

describe("withBadgesChecked", () => {
  it("grants firststep once at least one lesson is done", () => {
    const state = withLessonCompleted(initialAppState(), "l1");
    const { state: checked, granted } = withBadgesChecked(state);
    expect(granted).toContain("firststep");
    expect(checked.badges).toContain("firststep");
  });

  it("does not re-grant a badge already owned", () => {
    let state = withLessonCompleted(initialAppState(), "l1");
    state = withBadgesChecked(state).state;
    const { granted } = withBadgesChecked(state);
    expect(granted).toEqual([]);
  });

  it("grants foundations only once both l1 and l2 are done", () => {
    let state = withLessonCompleted(initialAppState(), "l1");
    let result = withBadgesChecked(state);
    expect(result.granted).not.toContain("foundations");

    state = withLessonCompleted(result.state, "l2");
    result = withBadgesChecked(state);
    expect(result.granted).toContain("foundations");
  });

  it("grants portfolio once a holding exists", () => {
    const state = withHoldingAdded(initialAppState(), holding);
    expect(withBadgesChecked(state).granted).toContain("portfolio");
  });
});

describe("holdings", () => {
  it("adds and removes a holding", () => {
    const added = withHoldingAdded(initialAppState(), holding);
    expect(added.holdings).toHaveLength(1);
    const removed = withHoldingRemoved(added, "h1");
    expect(removed.holdings).toHaveLength(0);
  });
});

describe("withContributionLogged", () => {
  it("increments the count on a new day", () => {
    const state = withContributionLogged(initialAppState(), "2026-07-07");
    expect(state.contributions).toEqual({ last: "2026-07-07", count: 1 });
  });

  it("is a no-op if already logged today", () => {
    const once = withContributionLogged(initialAppState(), "2026-07-07");
    const twice = withContributionLogged(once, "2026-07-07");
    expect(twice).toBe(once);
  });
});

describe("withScamDailyPlayed", () => {
  it("starts a spotting streak at 1", () => {
    const state = withScamDailyPlayed(initialAppState(), "2026-07-07", "2026-07-06");
    expect(state.scamDaily).toEqual({ last: "2026-07-07", streak: 1, best: 1 });
  });

  it("increments and tracks the best streak on consecutive days", () => {
    const start = { ...initialAppState(), scamDaily: { last: "2026-07-06", streak: 4, best: 4 } };
    const state = withScamDailyPlayed(start, "2026-07-07", "2026-07-06");
    expect(state.scamDaily).toEqual({ last: "2026-07-07", streak: 5, best: 5 });
  });

  it("resets the streak but keeps best after a missed day", () => {
    const start = { ...initialAppState(), scamDaily: { last: "2026-07-01", streak: 5, best: 9 } };
    const state = withScamDailyPlayed(start, "2026-07-07", "2026-07-06");
    expect(state.scamDaily).toEqual({ last: "2026-07-07", streak: 1, best: 9 });
  });

  it("is a no-op if already played today", () => {
    const start = { ...initialAppState(), scamDaily: { last: "2026-07-07", streak: 2, best: 2 } };
    expect(withScamDailyPlayed(start, "2026-07-07", "2026-07-06")).toBe(start);
  });
});

describe("withActionToggled", () => {
  it("toggles a step on and off", () => {
    const on = withActionToggled(initialAppState(), "open");
    expect(on.actions).toEqual(["open"]);
    const off = withActionToggled(on, "open");
    expect(off.actions).toEqual([]);
  });
});
