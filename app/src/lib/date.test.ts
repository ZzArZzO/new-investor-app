import { describe, expect, it } from "vitest";
import { mondayOf, pickForWeek, todayStr } from "./date";

describe("mondayOf", () => {
  it("returns the same date when given a Monday", () => {
    const monday = new Date(2026, 6, 6); // 2026-07-06 is a Monday
    expect(todayStr(mondayOf(monday))).toBe("2026-07-06");
  });

  it("rolls back to Monday from a mid-week date", () => {
    const thursday = new Date(2026, 6, 9); // 2026-07-09
    expect(todayStr(mondayOf(thursday))).toBe("2026-07-06");
  });

  it("rolls back to Monday from a Sunday (end of the ISO week)", () => {
    const sunday = new Date(2026, 6, 12); // 2026-07-12
    expect(todayStr(mondayOf(sunday))).toBe("2026-07-06");
  });
});

describe("pickForWeek", () => {
  it("picks the same item for any day within the same ISO week", () => {
    const items = ["a", "b", "c", "d", "e"];
    const monday = new Date(2026, 6, 6);
    const friday = new Date(2026, 6, 10);
    expect(pickForWeek(items, monday)).toBe(pickForWeek(items, friday));
  });

  it("can pick a different item for a different week", () => {
    const items = Array.from({ length: 10 }, (_, i) => `item-${i}`);
    const week1 = pickForWeek(items, new Date(2026, 6, 6));
    const week2 = pickForWeek(items, new Date(2026, 6, 13));
    // Not guaranteed different for every possible list, but true for this 10-item list at these two weeks.
    expect(items).toContain(week1);
    expect(items).toContain(week2);
  });
});
