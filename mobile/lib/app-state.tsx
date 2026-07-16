import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { AppState, Holding, HoldingType, PersonaKey } from "@/content/types";
import { badgeById } from "@/content/badges";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { hapticSuccess } from "@/lib/haptics";
import { daysAgoStr, daysFromNowStr, todayStr, yesterdayStr } from "@/lib/date";
import {
  initialAppState,
  withActionToggled,
  withBadgeGranted,
  withBadgesChecked,
  withContributionLogged,
  withDailyAnswered,
  withEmailPrefToggled,
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

// Same key as the web app so a future account-sync feature can merge states.
const STORAGE_KEY = "ni_state_v1";
const TOAST_MS = 2600;
const SYNC_DEBOUNCE_MS = 800;

/** Heuristic: does this local state hold anything worth not silently losing? (mirrors web) */
function hasMeaningfulProgress(s: AppState): boolean {
  return s.done.length > 0 || s.persona !== null || s.xp > 0 || s.holdings.length > 0 || s.actions.length > 0;
}

async function loadState(): Promise<AppState> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw == null) return initialAppState();
    // Merge over defaults so state saved before newer fields existed still
    // hydrates with those fields present (forward-compatible migration).
    return { ...initialAppState(), ...(JSON.parse(raw) as Partial<AppState>) };
  } catch {
    return initialAppState();
  }
}

async function saveState(state: AppState): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage may be unavailable (quota) — progress just won't persist.
  }
}

export interface AddHoldingInput {
  label: string;
  type: HoldingType;
  contributed: number;
  value?: number;
}

export interface AppStateValue {
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
  queueReviewItems: (ids: string[]) => void;
  answerReviewCard: (id: string, correct: boolean) => void;
  toggleEmailPref: (kind: "streak" | "weekly") => void;
  /** Deliberate full overwrite (backup-code restore), not an incremental action. */
  replaceState: (next: AppState) => void;
  /** True for one session when signing in found existing server progress that this device's local progress wasn't merged into. */
  migrationNotice: boolean;
  /** Snapshot of this device's pre-sign-in progress, taken before the server state overwrote it. Copyable from the migration notice. */
  migrationBackup: string | null;
  dismissMigrationNotice: () => void;
}

const AppStateContext = createContext<AppStateValue | null>(null);

/** Toast text lives in its own context so its ticks don't re-render every state consumer. */
const ToastContext = createContext<string | null>(null);

function newId(): string {
  return `h${Date.now()}${Math.floor(Math.random() * 1e6)}`;
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const { token, ready } = useAuth();
  const [state, setState] = useState<AppState>(initialAppState);
  const [hydrated, setHydrated] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [migrationNotice, setMigrationNotice] = useState(false);
  const [migrationBackup, setMigrationBackup] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevBadges = useRef<string[]>([]);

  useEffect(() => {
    if (!ready) return;
    let cancelled = false;
    (async () => {
      const local = await loadState();
      if (cancelled) return;

      if (!token) {
        prevBadges.current = local.badges;
        setState(local);
        setHydrated(true);
        return;
      }

      // Signed in: server is the source of truth. Same protocol as web —
      // no row yet means first login on this device, so upload local once.
      try {
        const server = await api.getState(token);
        const resolved = server.state ?? (await api.migrateState(token, local)).state;
        if (cancelled) return;
        if (server.state && hasMeaningfulProgress(local)) {
          setMigrationNotice(true);
          // AsyncStorage gets overwritten by the very next persistence tick,
          // so this snapshot is the only surviving copy of the old progress.
          setMigrationBackup(JSON.stringify(local));
        }
        const merged = { ...initialAppState(), ...resolved };
        prevBadges.current = merged.badges;
        setState(merged);
      } catch {
        // Offline or server down — run on local state; the next PUT retries sync.
        if (cancelled) return;
        prevBadges.current = local.badges;
        setState(local);
      }
      setHydrated(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [ready, token]);

  useEffect(() => {
    if (!hydrated) return;
    // AsyncStorage is always the offline cache; the server PUT is best-effort.
    void saveState(state);
    if (!token) return;
    const handle = setTimeout(() => {
      api.putState(token, state).catch(() => {
        // Dropped PUT just means the next state change retries it.
      });
    }, SYNC_DEBOUNCE_MS);
    return () => clearTimeout(handle);
  }, [state, hydrated, token]);

  const dismissMigrationNotice = useCallback(() => setMigrationNotice(false), []);

  const replaceState = useCallback((next: AppState) => {
    // Deliberate full overwrite (backup-code restore); the persistence effect saves and syncs it.
    setState(next);
  }, []);

  const showToast = useCallback((message: string) => {
    hapticSuccess();
    setToastMessage(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(null), TOAST_MS);
  }, []);

  useEffect(() => {
    const newly = state.badges.filter((id) => !prevBadges.current.includes(id));
    prevBadges.current = state.badges;
    if (newly.length === 0) return;
    const badge = badgeById(newly[0]);
    showToast(badge ? `${badge.ico} Badge unlocked: ${badge.name}` : `Badge unlocked: ${newly[0]}`);
  }, [state.badges, showToast]);

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
    showToast(
      freezes < before
        ? "🧊 Streak freeze used, your streak survived a missed day."
        : "🧊 Streak freeze earned! It auto-covers one missed day."
    );
  }, [state.streak.freezes, hydrated, showToast]);

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

  const toggleEmailPref = useCallback((kind: "streak" | "weekly") => {
    setState((prev) => withEmailPrefToggled(prev, kind));
  }, []);

  const value = useMemo<AppStateValue>(
    () => ({
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
      queueReviewItems,
      answerReviewCard,
      toggleEmailPref,
      replaceState,
      migrationNotice,
      migrationBackup,
      dismissMigrationNotice,
    }),
    [
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
      queueReviewItems,
      answerReviewCard,
      toggleEmailPref,
      replaceState,
      migrationNotice,
      migrationBackup,
      dismissMigrationNotice,
    ]
  );

  return (
    <AppStateContext.Provider value={value}>
      <ToastContext.Provider value={toastMessage}>{children}</ToastContext.Provider>
    </AppStateContext.Provider>
  );
}

export function useAppState(): AppStateValue {
  const value = useContext(AppStateContext);
  if (!value) throw new Error("useAppState must be used inside AppStateProvider");
  return value;
}

/** Current toast text (or null). Subscribes only to toast changes, not app state. */
export function useToastMessage(): string | null {
  return useContext(ToastContext);
}
