import { ACTION_STEPS } from "./action-steps";
import { FREE_LESSONS } from "./lessons";
import type { AppState, Badge } from "./types";

export const BADGES: Badge[] = [
  { id: "firststep", ico: "🌱", name: "First step", test: (s: AppState) => s.done.length >= 1 },
  {
    id: "foundations",
    ico: "🧱",
    name: "Foundations",
    test: (s: AppState) => s.done.includes("l1") && s.done.includes("l2"),
  },
  // Graduate = every free lesson done (Plus-tier lessons can't gate a badge).
  { id: "graduate", ico: "🎓", name: "Graduate", test: (s: AppState) => FREE_LESSONS.every((l) => s.done.includes(l.id)) },
  // awarded on a perfect scam round
  { id: "scamsleuth", ico: "🕵️", name: "Scam sleuth", test: (s: AppState) => s.badges.includes("scamsleuth") },
  { id: "weekstreak", ico: "🔥", name: "7-day streak", test: (s: AppState) => (s.streak?.count ?? 0) >= 7 },
  // awarded on first tool use
  { id: "tinkerer", ico: "🛠️", name: "Tinkerer", test: (s: AppState) => s.badges.includes("tinkerer") },
  { id: "portfolio", ico: "📊", name: "Portfolio started", test: (s: AppState) => (s.holdings?.length ?? 0) >= 1 },
  { id: "committed", ico: "📅", name: "3 contributions", test: (s: AppState) => (s.contributions?.count ?? 0) >= 3 },
  {
    id: "actiontaker",
    ico: "✅",
    name: "Action taker",
    test: (s: AppState) => (s.actions?.length ?? 0) >= ACTION_STEPS.length,
  },
  { id: "scamweek", ico: "🛡️", name: "Scam-safe week", test: (s: AppState) => (s.scamDaily?.best ?? 0) >= 7 },
];

export function badgeById(id: string): Badge | undefined {
  return BADGES.find((b) => b.id === id);
}
