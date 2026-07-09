import { describe, expect, it } from "vitest";
import { shouldSendStreakWarning, shouldSendWeeklyDigest } from "./retention-rules";

describe("shouldSendStreakWarning", () => {
  const today = "2026-07-08";
  const yesterday = "2026-07-07";

  it("sends when the streak broke yesterday, is worth protecting, and hasn't been sent today", () => {
    expect(shouldSendStreakWarning({ count: 3, last: yesterday }, null, today, yesterday)).toBe(true);
  });

  it("does not send if the streak was already active today (nothing broke)", () => {
    expect(shouldSendStreakWarning({ count: 3, last: today }, null, today, yesterday)).toBe(false);
  });

  it("does not send for a 1-day streak", () => {
    expect(shouldSendStreakWarning({ count: 1, last: yesterday }, null, today, yesterday)).toBe(false);
  });

  it("does not send twice in the same day", () => {
    expect(shouldSendStreakWarning({ count: 3, last: yesterday }, today, today, yesterday)).toBe(false);
  });

  it("does not send when there's no streak state", () => {
    expect(shouldSendStreakWarning(undefined, null, today, yesterday)).toBe(false);
  });
});

describe("shouldSendWeeklyDigest", () => {
  it("sends when this week's Monday hasn't been recorded yet", () => {
    expect(shouldSendWeeklyDigest(null, "2026-07-06")).toBe(true);
    expect(shouldSendWeeklyDigest("2026-06-29", "2026-07-06")).toBe(true);
  });

  it("does not send twice for the same week", () => {
    expect(shouldSendWeeklyDigest("2026-07-06", "2026-07-06")).toBe(false);
  });
});
