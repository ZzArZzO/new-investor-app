"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AppState, Holding, HoldingType, PersonaKey } from "@/content/types";
import { badgeById } from "@/content/badges";
import { todayStr, yesterdayStr } from "@/lib/date";
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

export interface AddHoldingInput {
  label: string;
  type: HoldingType;
  contributed: number;
  value?: number;
}

export interface UseAppStateResult {
  state: AppState;
  hydrated: boolean;
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
  toastMessage: string | null;
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

  useEffect(() => {
    // Deliberate one-time sync from localStorage after mount: SSR has no
    // access to it, so state starts at defaults and adopts real values here
    // to avoid a hydration mismatch (same pattern as next-themes).
    const loaded = loadState();
    prevBadges.current = loaded.badges;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(loaded);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveState(state);
  }, [state, hydrated]);

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

  const completeLesson = useCallback((lessonId: string) => {
    setState((prev) => {
      if (prev.done.includes(lessonId)) return prev;
      let next = withLessonCompleted(prev, lessonId);
      next = withXp(next, 20);
      next = withStreakBumped(next, todayStr(), yesterdayStr());
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
      next = withStreakBumped(next, today, yesterdayStr());
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
      next = withStreakBumped(next, today, yesterdayStr());
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
      next = withStreakBumped(next, today, yesterdayStr());
      return withBadgesChecked(next).state;
    });
  }, []);

  return {
    state,
    hydrated,
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
    toastMessage,
  };
}
