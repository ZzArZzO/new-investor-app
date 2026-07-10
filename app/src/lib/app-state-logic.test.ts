import { describe, expect, it } from "vitest";
import {
  FREE_REVIEW_CARDS_PER_DAY,
  MAX_STREAK_FREEZES,
  dueReviewItems,
  initialAppState,
  remainingReviewQuota,
  withActionToggled,
  withBadgesChecked,
  withContributionLogged,
  withEmailPrefToggled,
  withHoldingAdded,
  withHoldingRemoved,
  withLessonCompleted,
  withReviewAnswered,
  withReviewItemsAdded,
  withScamDailyPlayed,
  withStreakBumped,
  withXp,
} from "./app-state-logic";
import type { AppState, Holding } from "@/content/types";

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
    expect(state.streak).toEqual({ count: 1, last: "2026-07-07", freezes: 0 });
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

describe("streak freezes", () => {
  it("bridges a single missed day by consuming a freeze", () => {
    const start = { ...initialAppState(), streak: { count: 5, last: "2026-07-05", freezes: 1 } };
    const state = withStreakBumped(start, "2026-07-07", "2026-07-06", "2026-07-05");
    expect(state.streak).toEqual({ count: 6, last: "2026-07-07", freezes: 0 });
  });

  it("resets after a single missed day when no freeze is banked", () => {
    const start = { ...initialAppState(), streak: { count: 5, last: "2026-07-05", freezes: 0 } };
    const state = withStreakBumped(start, "2026-07-07", "2026-07-06", "2026-07-05");
    expect(state.streak.count).toBe(1);
  });

  it("does not bridge a two-day gap even with freezes banked", () => {
    const start = { ...initialAppState(), streak: { count: 5, last: "2026-07-04", freezes: 2 } };
    const state = withStreakBumped(start, "2026-07-07", "2026-07-06", "2026-07-05");
    expect(state.streak.count).toBe(1);
    expect(state.streak.freezes).toBe(2);
  });

  it("earns a freeze when the streak crosses a 7-day multiple", () => {
    const start = { ...initialAppState(), streak: { count: 6, last: "2026-07-06", freezes: 0 } };
    const state = withStreakBumped(start, "2026-07-07", "2026-07-06", "2026-07-05");
    expect(state.streak).toEqual({ count: 7, last: "2026-07-07", freezes: 1 });
  });

  it("caps banked freezes at the maximum", () => {
    const start = { ...initialAppState(), streak: { count: 13, last: "2026-07-06", freezes: MAX_STREAK_FREEZES } };
    const state = withStreakBumped(start, "2026-07-07", "2026-07-06", "2026-07-05");
    expect(state.streak.freezes).toBe(MAX_STREAK_FREEZES);
  });

  it("tolerates states saved before freezes existed", () => {
    const start = { ...initialAppState(), streak: { count: 3, last: "2026-07-06" } };
    const state = withStreakBumped(start, "2026-07-07", "2026-07-06", "2026-07-05");
    expect(state.streak.count).toBe(4);
    expect(state.streak.freezes).toBe(0);
  });
});

describe("review deck", () => {
  const nextDue = (days: number) => `2026-07-${String(7 + days).padStart(2, "0")}`;

  it("queues new cards and skips ones already in the deck", () => {
    let state = withReviewItemsAdded(initialAppState(), ["check:l1:0"], "2026-07-08");
    state = withReviewItemsAdded(state, ["check:l1:0", "term:inflation"], "2026-07-09");
    expect(state.review?.items).toEqual([
      { id: "check:l1:0", due: "2026-07-08", ease: 0 },
      { id: "term:inflation", due: "2026-07-09", ease: 0 },
    ]);
  });

  it("is a no-op when every id is already queued", () => {
    const once = withReviewItemsAdded(initialAppState(), ["check:l1:0"], "2026-07-08");
    expect(withReviewItemsAdded(once, ["check:l1:0"], "2026-07-09")).toBe(once);
  });

  it("climbs the interval ladder on a correct answer", () => {
    let state = withReviewItemsAdded(initialAppState(), ["check:l1:0"], "2026-07-07");
    state = withReviewAnswered(state, "check:l1:0", true, "2026-07-07", nextDue);
    expect(state.review?.items[0]).toEqual({ id: "check:l1:0", ease: 1, due: nextDue(3) });
  });

  it("drops back to the start on a wrong answer", () => {
    let state: AppState = { ...initialAppState(), review: { items: [{ id: "check:l1:0", due: "2026-07-07", ease: 3 }], day: null, doneToday: 0 } };
    state = withReviewAnswered(state, "check:l1:0", false, "2026-07-07", nextDue);
    expect(state.review?.items[0]).toEqual({ id: "check:l1:0", ease: 0, due: nextDue(1) });
  });

  it("adds a first-time card (glossary top-up) to the deck when answered", () => {
    const state = withReviewAnswered(initialAppState(), "term:inflation", true, "2026-07-07", nextDue);
    expect(state.review?.items).toEqual([{ id: "term:inflation", ease: 0, due: nextDue(1) }]);
  });

  it("counts answered cards against the daily quota and resets next day", () => {
    let state = withReviewAnswered(initialAppState(), "term:a", true, "2026-07-07", nextDue);
    state = withReviewAnswered(state, "term:b", false, "2026-07-07", nextDue);
    expect(remainingReviewQuota(state, "2026-07-07")).toBe(FREE_REVIEW_CARDS_PER_DAY - 2);
    expect(remainingReviewQuota(state, "2026-07-08")).toBe(FREE_REVIEW_CARDS_PER_DAY);
  });

  it("returns only cards due on or before today", () => {
    const state = {
      ...initialAppState(),
      review: {
        items: [
          { id: "a", due: "2026-07-06", ease: 0 },
          { id: "b", due: "2026-07-07", ease: 0 },
          { id: "c", due: "2026-07-08", ease: 0 },
        ],
        day: null,
        doneToday: 0,
      },
    };
    expect(dueReviewItems(state, "2026-07-07").map((i) => i.id)).toEqual(["a", "b"]);
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

describe("withEmailPrefToggled", () => {
  it("flips one preference and leaves the other", () => {
    const state = withEmailPrefToggled(initialAppState(), "streak");
    expect(state.emails).toEqual({ streak: false, weekly: true });
  });

  it("treats states saved before email prefs existed as opted in", () => {
    const legacy = { ...initialAppState(), emails: undefined };
    const state = withEmailPrefToggled(legacy, "weekly");
    expect(state.emails).toEqual({ streak: true, weekly: false });
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
