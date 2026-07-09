import { describe, expect, it } from "vitest";
import { composeReviewSession, checkReviewId } from "./review-logic";
import { initialAppState } from "./app-state-logic";
import { LESSONS } from "@/content/lessons";
import { GLOSSARY } from "@/content/glossary";

const TODAY = "2026-07-07";

describe("composeReviewSession", () => {
  it("returns nothing when the limit is zero", () => {
    expect(composeReviewSession(initialAppState(), TODAY, 0)).toEqual([]);
  });

  it("tops up with glossary terms when nothing is due", () => {
    const session = composeReviewSession(initialAppState(), TODAY, 5);
    expect(session).toHaveLength(5);
    for (const card of session) {
      expect(card.id.startsWith("term:")).toBe(true);
      expect(card.options).toHaveLength(3);
      expect(card.options[card.answer]).toBe(card.id.slice("term:".length));
    }
  });

  it("produces no duplicate cards in a session", () => {
    const session = composeReviewSession(initialAppState(), TODAY, 10);
    const ids = session.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("is deterministic for the same state and date", () => {
    const a = composeReviewSession(initialAppState(), TODAY, 5);
    const b = composeReviewSession(initialAppState(), TODAY, 5);
    expect(a).toEqual(b);
  });

  it("puts due check cards first and resolves them to the lesson question", () => {
    const lesson = LESSONS[0];
    const state = {
      ...initialAppState(),
      review: { items: [{ id: checkReviewId(lesson.id, 0), due: "2026-07-06", ease: 0 }], day: null, doneToday: 0 },
    };
    const session = composeReviewSession(state, TODAY, 5);
    expect(session[0].id).toBe(checkReviewId(lesson.id, 0));
    expect(session[0].question).toBe(lesson.check[0].q);
    expect(session[0].answer).toBe(lesson.check[0].a);
  });

  it("skips ids that no longer resolve to content", () => {
    const state = {
      ...initialAppState(),
      review: { items: [{ id: "check:gone:9", due: "2026-07-06", ease: 0 }], day: null, doneToday: 0 },
    };
    const session = composeReviewSession(state, TODAY, 3);
    expect(session.every((c) => c.id !== "check:gone:9")).toBe(true);
  });

  it("does not re-offer terms already in the deck as top-ups", () => {
    const term = Object.keys(GLOSSARY)[0];
    const state = {
      ...initialAppState(),
      review: { items: [{ id: `term:${term}`, due: "2026-08-01", ease: 2 }], day: null, doneToday: 0 },
    };
    const session = composeReviewSession(state, TODAY, 50);
    expect(session.some((c) => c.id === `term:${term}`)).toBe(false);
  });
});
