import { BADGES } from "@/content/badges";
import type { AppState, Holding, PersonaKey } from "@/content/types";

export function initialAppState(): AppState {
  return {
    done: [],
    persona: null,
    streak: { count: 0, last: null },
    daily: { last: null },
    xp: 0,
    badges: [],
    holdings: [],
    contributions: { last: null, count: 0 },
    scamDaily: { last: null, streak: 0, best: 0 },
    actions: [],
  };
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

/** Bumps the daily streak: +1 if last active day was yesterday, resets to 1 otherwise. No-op if already bumped today. */
export function withStreakBumped(state: AppState, today: string, yesterday: string): AppState {
  if (state.streak.last === today) return state;
  const count = state.streak.last === yesterday ? state.streak.count + 1 : 1;
  return { ...state, streak: { count, last: today } };
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
