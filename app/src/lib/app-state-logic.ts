import { BADGES } from "@/content/badges";
import type { AppState, Holding, PersonaKey, ReviewState } from "@/content/types";

/** Max streak freezes a user can bank. */
export const MAX_STREAK_FREEZES = 2;

/** A new freeze is earned each time the streak crosses a multiple of this. */
export const FREEZE_EARN_EVERY = 7;

export function initialAppState(): AppState {
  return {
    done: [],
    persona: null,
    streak: { count: 0, last: null, freezes: 0 },
    daily: { last: null },
    xp: 0,
    badges: [],
    holdings: [],
    contributions: { last: null, count: 0 },
    scamDaily: { last: null, streak: 0, best: 0 },
    actions: [],
    review: { items: [], day: null, doneToday: 0 },
    emails: { streak: true, weekly: true },
  };
}

/** Flips one email opt-in. Absent prefs (older saved states) count as opted in. */
export function withEmailPrefToggled(state: AppState, kind: "streak" | "weekly"): AppState {
  const emails = state.emails ?? { streak: true, weekly: true };
  return { ...state, emails: { ...emails, [kind]: !emails[kind] } };
}

/** Review state for older saved states that predate the field. */
export function reviewOf(state: AppState): ReviewState {
  return state.review ?? { items: [], day: null, doneToday: 0 };
}

export function withLessonCompleted(state: AppState, lessonId: string): AppState {
  if (state.done.includes(lessonId)) return state;
  return { ...state, done: [...state.done, lessonId] };
}

export function withPersona(state: AppState, persona: PersonaKey): AppState {
  return { ...state, persona };
}

export function withXp(state: AppState, amount: number): AppState {
  return { ...state, xp: state.xp + amount };
}

/**
 * Bumps the daily streak. +1 if last active day was yesterday. A single missed
 * day is bridged by auto-consuming a banked freeze; otherwise the streak resets
 * to 1. Crossing a FREEZE_EARN_EVERY multiple banks a new freeze (capped).
 * No-op if already bumped today.
 */
export function withStreakBumped(state: AppState, today: string, yesterday: string, dayBefore?: string): AppState {
  if (state.streak.last === today) return state;
  const freezes = state.streak.freezes ?? 0;
  const continued = state.streak.last === yesterday;
  const bridged = !continued && dayBefore != null && state.streak.last === dayBefore && freezes > 0;
  const count = continued || bridged ? state.streak.count + 1 : 1;
  const earned = count > state.streak.count && count % FREEZE_EARN_EVERY === 0 ? 1 : 0;
  const nextFreezes = Math.min(MAX_STREAK_FREEZES, freezes - (bridged ? 1 : 0) + earned);
  return { ...state, streak: { count, last: today, freezes: nextFreezes } };
}

export function withDailyAnswered(state: AppState, today: string): AppState {
  return { ...state, daily: { last: today } };
}

export function withHoldingAdded(state: AppState, holding: Holding): AppState {
  return { ...state, holdings: [...state.holdings, holding] };
}

export function withHoldingRemoved(state: AppState, id: string): AppState {
  return { ...state, holdings: state.holdings.filter((h) => h.id !== id) };
}

/** Logs one contribution. No-op if already logged today (guards against double-counting). */
export function withContributionLogged(state: AppState, today: string): AppState {
  if (state.contributions.last === today) return state;
  return { ...state, contributions: { last: today, count: state.contributions.count + 1 } };
}

/** Records today's daily scam play. Streak +1 if last play was yesterday, resets to 1 otherwise. No-op if already played today. */
export function withScamDailyPlayed(state: AppState, today: string, yesterday: string): AppState {
  if (state.scamDaily.last === today) return state;
  const streak = state.scamDaily.last === yesterday ? state.scamDaily.streak + 1 : 1;
  const best = Math.max(state.scamDaily.best, streak);
  return { ...state, scamDaily: { last: today, streak, best } };
}

export function withActionToggled(state: AppState, stepId: string): AppState {
  const done = state.actions.includes(stepId);
  return { ...state, actions: done ? state.actions.filter((id) => id !== stepId) : [...state.actions, stepId] };
}

export function withBadgeGranted(state: AppState, badgeId: string): AppState {
  if (state.badges.includes(badgeId)) return state;
  return { ...state, badges: [...state.badges, badgeId] };
}

/** Days until a card comes back, by ease level. Wrong answers drop to the start of the ladder. */
export const REVIEW_INTERVALS = [1, 3, 7, 14, 30] as const;

/** Free-tier cap on review cards per day (unlimited is a future Plus perk). */
export const FREE_REVIEW_CARDS_PER_DAY = 5;

/** Queues cards for review (due tomorrow-ish via the shortest interval). Existing cards are left untouched. */
export function withReviewItemsAdded(state: AppState, ids: string[], due: string): AppState {
  const review = reviewOf(state);
  const fresh = ids.filter((id) => !review.items.some((item) => item.id === id));
  if (fresh.length === 0) return state;
  return {
    ...state,
    review: { ...review, items: [...review.items, ...fresh.map((id) => ({ id, due, ease: 0 }))] },
  };
}

/**
 * Records one answered review card: correct climbs the interval ladder, wrong
 * drops back to the start. Cards answered for the first time (e.g. glossary
 * top-ups) join the deck. Also advances the daily counter.
 */
export function withReviewAnswered(state: AppState, id: string, correct: boolean, today: string, nextDue: (days: number) => string): AppState {
  const review = reviewOf(state);
  const existing = review.items.find((item) => item.id === id);
  const ease = correct ? Math.min((existing?.ease ?? -1) + 1, REVIEW_INTERVALS.length - 1) : 0;
  const updated = { id, ease, due: nextDue(REVIEW_INTERVALS[ease]) };
  const items = existing ? review.items.map((item) => (item.id === id ? updated : item)) : [...review.items, updated];
  const doneToday = review.day === today ? review.doneToday + 1 : 1;
  return { ...state, review: { items, day: today, doneToday } };
}

/** Cards due on or before `today`. */
export function dueReviewItems(state: AppState, today: string): ReviewState["items"] {
  return reviewOf(state).items.filter((item) => item.due <= today);
}

/** Review cards still allowed today under the free cap. */
export function remainingReviewQuota(state: AppState, today: string): number {
  const review = reviewOf(state);
  const used = review.day === today ? review.doneToday : 0;
  return Math.max(0, FREE_REVIEW_CARDS_PER_DAY - used);
}

export interface BadgeCheckResult {
  state: AppState;
  granted: string[];
}

/** Runs every badge's test against the state, granting any newly-earned ones. */
export function withBadgesChecked(state: AppState): BadgeCheckResult {
  let next = state;
  const granted: string[] = [];
  for (const badge of BADGES) {
    if (!next.badges.includes(badge.id) && badge.test(next)) {
      next = withBadgeGranted(next, badge.id);
      granted.push(badge.id);
    }
  }
  return { state: next, granted };
}
