"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import type { AppState, Holding, HoldingType, PersonaKey } from "@/content/types";
import type { Plan } from "@/lib/entitlement";
import { badgeById } from "@/content/badges";
import { daysAgoStr, daysFromNowStr, todayStr, yesterdayStr } from "@/lib/date";
import {
  initialAppState,
  withActionToggled,
  withBadgeGranted,
  withBadgesChecked,
  withContributionLogged,
  withDailyAnswered,
  withHoldingAdded,
  withHoldingRemoved,
  withLessonCompleted,
  withPersona,
  withReviewAnswered,
  withReviewItemsAdded,
  withScamDailyPlayed,
  withStreakBumped,
  withXp,
} from "@/lib/app-state-logic";

const STORAGE_KEY = "ni_state_v1";

// Legacy prototype used separate localStorage keys per field; read those as a
// fallback so anyone with existing progress from the old app doesn't lose it.
const LEGACY_KEYS = {
  done: "ni_done",
  persona: "ni_persona",
  streak: "ni_streak",
  daily: "ni_daily",
  xp: "ni_xp",
  badges: "ni_badges",
} as const;

function readJSON<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw == null ? null : (JSON.parse(raw) as T);
  } catch {
    return null;
  }
}

function loadState(): AppState {
  // Merge over defaults so state saved before newer fields existed still
  // hydrates with those fields present (forward-compatible migration).
  const combined = readJSON<Partial<AppState>>(STORAGE_KEY);
  if (combined) return { ...initialAppState(), ...combined };
  return {
    ...initialAppState(),
    done: readJSON<string[]>(LEGACY_KEYS.done) ?? [],
    persona: readJSON<PersonaKey | null>(LEGACY_KEYS.persona) ?? null,
    streak: readJSON<AppState["streak"]>(LEGACY_KEYS.streak) ?? { count: 0, last: null },
    daily: readJSON<AppState["daily"]>(LEGACY_KEYS.daily) ?? { last: null },
    xp: readJSON<number>(LEGACY_KEYS.xp) ?? 0,
    badges: readJSON<string[]>(LEGACY_KEYS.badges) ?? [],
  };
}

function saveState(state: AppState): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage may be unavailable (private browsing, quota) — progress just won't persist.
  }
}

async function fetchServerState(): Promise<{ state: Partial<AppState> | null; plan: Plan }> {
  const res = await fetch("/api/state");
  const body: { state: Partial<AppState> | null; plan?: Plan } = await res.json();
  return { state: body.state, plan: body.plan === "plus" ? "plus" : "free" };
}

async function migrateLocalState(local: AppState): Promise<Partial<AppState>> {
  const res = await fetch("/api/state/migrate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(local),
  });
  const body: { state: Partial<AppState> } = await res.json();
  return body.state;
}

/** Heuristic: does this local state hold anything worth not silently losing? */
function hasMeaningfulProgress(s: AppState): boolean {
  return s.done.length > 0 || s.persona !== null || s.xp > 0 || s.holdings.length > 0 || s.actions.length > 0;
}

async function putServerState(state: AppState): Promise<void> {
  await fetch("/api/state", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(state),
  }).catch(() => {
    // Best-effort sync — a dropped PUT just means the next state change retries it.
  });
}

export interface AddHoldingInput {
  label: string;
  type: HoldingType;
  contributed: number;
  value?: number;
}

export interface UseAppStateResult {
  state: AppState;
  hydrated: boolean;
  /** "plus" when the signed-in account has the Plus experience (tester allowlist for now, Stripe later). UI-only. */
  plan: Plan;
  completeLesson: (lessonId: string) => void;
  setPersona: (persona: PersonaKey) => void;
  answerDailyQuestion: () => void;
  recordToolUse: () => void;
  recordPerfectScamRound: () => void;
  addHolding: (input: AddHoldingInput) => void;
  removeHolding: (id: string) => void;
  logContribution: () => void;
  toggleActionStep: (stepId: string) => void;
  playDailyScam: () => void;
  /** Queues spaced-repetition cards (e.g. missed quick-check questions), due tomorrow. */
  queueReviewItems: (ids: string[]) => void;
  /** Records one answered review card: schedules its next due date, awards XP, bumps the streak. */
  answerReviewCard: (id: string, correct: boolean) => void;
  toastMessage: string | null;
  replaceState: (next: AppState) => void;
  /** True for one session when signing in found existing server progress that this device's local progress wasn't merged into. */
  migrationNotice: boolean;
  dismissMigrationNotice: () => void;
}

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `h${Date.now()}${Math.floor(Math.random() * 1e6)}`;
}

/** localStorage-backed progress state: done lessons, persona, streak, daily question, XP, badges. */
export function useAppState(): UseAppStateResult {
  const [state, setState] = useState<AppState>(initialAppState);
  const [hydrated, setHydrated] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevBadges = useRef<string[]>([]);
  const { status } = useSession();
  const [migrationNotice, setMigrationNotice] = useState(false);
  const [plan, setPlan] = useState<Plan>("free");

  useEffect(() => {
    // Deliberate one-time sync after mount: SSR has no access to
    // localStorage/session, so state starts at defaults and adopts real
    // values here to avoid a hydration mismatch (same pattern as next-themes).
    if (status === "loading") return;

    if (status === "authenticated") {
      (async () => {
        const local = loadState();
        const server = await fetchServerState();
        // No row yet for this user = first login on this device — upload
        // whatever's in localStorage once (server wins on future logins).
        const resolved = server.state ?? (await migrateLocalState(local));
        if (server.state && hasMeaningfulProgress(local)) setMigrationNotice(true);
        const merged = { ...initialAppState(), ...resolved };
        prevBadges.current = merged.badges;
        setPlan(server.plan);
        setState(merged);
        setHydrated(true);
      })();
      return;
    }

    const loaded = loadState();
    prevBadges.current = loaded.badges;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(loaded);
    setHydrated(true);
  }, [status]);

  useEffect(() => {
    if (!hydrated) return;
    if (status === "authenticated") {
      const handle = setTimeout(() => putServerState(state), 800);
      return () => clearTimeout(handle);
    }
    saveState(state);
  }, [state, hydrated, status]);

  useEffect(() => {
    const newly = state.badges.filter((id) => !prevBadges.current.includes(id));
    prevBadges.current = state.badges;
    if (newly.length === 0) return;
    const badge = badgeById(newly[0]);
    const message = badge ? `${badge.ico} Badge unlocked: ${badge.name}` : `Badge unlocked: ${newly[0]}`;
    setToastMessage(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(null), 2600);
  }, [state.badges]);

  const prevFreezes = useRef<number | null>(null);
  useEffect(() => {
    const freezes = state.streak.freezes ?? 0;
    // First reading after hydration is baseline, not a change.
    if (!hydrated || prevFreezes.current === null) {
      prevFreezes.current = hydrated ? freezes : null;
      return;
    }
    const before = prevFreezes.current;
    prevFreezes.current = freezes;
    if (freezes === before) return;
    const message =
      freezes < before
        ? "🧊 Streak freeze used — your streak survived a missed day."
        : "🧊 Streak freeze earned! It auto-covers one missed day.";
    setToastMessage(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(null), 2600);
  }, [state.streak.freezes, hydrated]);

  const completeLesson = useCallback((lessonId: string) => {
    setState((prev) => {
      if (prev.done.includes(lessonId)) return prev;
      let next = withLessonCompleted(prev, lessonId);
      next = withXp(next, 20);
      next = withStreakBumped(next, todayStr(), yesterdayStr(), daysAgoStr(2));
      return withBadgesChecked(next).state;
    });
  }, []);

  const setPersona = useCallback((persona: PersonaKey) => {
    setState((prev) => withPersona(prev, persona));
  }, []);

  const answerDailyQuestion = useCallback(() => {
    setState((prev) => {
      const today = todayStr();
      if (prev.daily.last === today) return prev;
      let next = withDailyAnswered(prev, today);
      next = withXp(next, 5);
      next = withStreakBumped(next, today, yesterdayStr(), daysAgoStr(2));
      return withBadgesChecked(next).state;
    });
  }, []);

  const recordToolUse = useCallback(() => {
    setState((prev) => withBadgeGranted(prev, "tinkerer"));
  }, []);

  const recordPerfectScamRound = useCallback(() => {
    setState((prev) => withBadgeGranted(prev, "scamsleuth"));
  }, []);

  const addHolding = useCallback((input: AddHoldingInput) => {
    setState((prev) => {
      const holding: Holding = { id: newId(), added: todayStr(), ...input };
      return withBadgesChecked(withHoldingAdded(prev, holding)).state;
    });
  }, []);

  const removeHolding = useCallback((id: string) => {
    setState((prev) => withHoldingRemoved(prev, id));
  }, []);

  const logContribution = useCallback(() => {
    setState((prev) => {
      const today = todayStr();
      if (prev.contributions.last === today) return prev;
      let next = withContributionLogged(prev, today);
      next = withXp(next, 10);
      next = withStreakBumped(next, today, yesterdayStr(), daysAgoStr(2));
      return withBadgesChecked(next).state;
    });
  }, []);

  const toggleActionStep = useCallback((stepId: string) => {
    setState((prev) => withBadgesChecked(withActionToggled(prev, stepId)).state);
  }, []);

  const playDailyScam = useCallback(() => {
    setState((prev) => {
      const today = todayStr();
      if (prev.scamDaily.last === today) return prev;
      let next = withScamDailyPlayed(prev, today, yesterdayStr());
      next = withXp(next, 5);
      next = withStreakBumped(next, today, yesterdayStr(), daysAgoStr(2));
      return withBadgesChecked(next).state;
    });
  }, []);

  const queueReviewItems = useCallback((ids: string[]) => {
    setState((prev) => withReviewItemsAdded(prev, ids, daysFromNowStr(1)));
  }, []);

  const answerReviewCard = useCallback((id: string, correct: boolean) => {
    setState((prev) => {
      let next = withReviewAnswered(prev, id, correct, todayStr(), (days) => daysFromNowStr(days));
      next = withXp(next, 3);
      next = withStreakBumped(next, todayStr(), yesterdayStr(), daysAgoStr(2));
      return withBadgesChecked(next).state;
    });
  }, []);

  const replaceState = useCallback((next: AppState) => {
    // A deliberate full overwrite (import), not an incremental action —
    // bypasses the reducer helpers above on purpose.
    setState(next);
  }, []);

  const dismissMigrationNotice = useCallback(() => setMigrationNotice(false), []);

  return {
    state,
    hydrated,
    // Plus is account-bound: signing out always reads as free.
    plan: status === "authenticated" ? plan : "free",
    completeLesson,
    setPersona,
    answerDailyQuestion,
    recordToolUse,
    recordPerfectScamRound,
    addHolding,
    removeHolding,
    logContribution,
    toggleActionStep,
    playDailyScam,
    queueReviewItems,
    answerReviewCard,
    toastMessage,
    replaceState,
    migrationNotice,
    dismissMigrationNotice,
  };
}
