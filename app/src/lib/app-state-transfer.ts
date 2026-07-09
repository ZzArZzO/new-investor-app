import type { AppState } from "@/content/types";
import { initialAppState } from "@/lib/app-state-logic";

const REQUIRED_KEYS: (keyof AppState)[] = [
  "done",
  "persona",
  "streak",
  "daily",
  "xp",
  "badges",
  "holdings",
  "contributions",
  "scamDaily",
  "actions",
];

// Deliberately loose: an older export may predate a field added since (the
// same forward-compat gap `loadState` in use-app-state.ts handles), so we
// only require it to look like *an* AppState blob, not a complete one.
function looksLikeAppState(value: unknown): value is Partial<AppState> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const record = value as Record<string, unknown>;
  return REQUIRED_KEYS.some((key) => key in record);
}

/** Serializes progress state to a single JSON blob the user can copy elsewhere. */
export function exportState(state: AppState): string {
  return JSON.stringify(state);
}

/**
 * Parses a previously-exported blob back into AppState. Returns null on
 * anything malformed (invalid JSON, missing required keys) so callers can
 * show an inline error instead of crashing or silently adopting garbage.
 * Merges over defaults so a blob exported by an older app version (missing
 * newer fields) still hydrates safely.
 */
export function importState(raw: string): AppState | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!looksLikeAppState(parsed)) return null;
  return { ...initialAppState(), ...parsed };
}
