export interface QuizQuestion {
  q: string;
  o: string[];
}

export type PersonaKey = "A" | "B" | "C" | "D";

export interface Persona {
  emoji: string;
  name: string;
  desc: string;
  approach: string;
}

export interface LessonCheck {
  q: string;
  o: string[];
  a: number;
  why: string;
}

export interface Lesson {
  id: string;
  pillar: string;
  crypto: boolean;
  title: string;
  core: string;
  reading: string;
  example: string;
  check: LessonCheck[];
}

export interface BrokerRow {
  name: string;
  type: string;
  regulation: string;
  cost: string;
}

export interface CryptoExchangeRow {
  name: string;
  licence: string;
  cost: string;
}

export type ToolId = "compound" | "fee" | "scam" | "sandbox" | "allocation";

export interface ToolMeta {
  id: ToolId;
  ico: string;
  name: string;
  desc: string;
  crypto: boolean;
}

export type ScamChannel = "DM" | "email" | "popup";

export interface ScamScenario {
  id: string;
  channel: ScamChannel;
  from: string;
  isScam: boolean;
  body: string;
  why: string;
  flags: string[];
}

export interface SandboxReturns {
  index: number[];
  bonds: number[];
  crypto: number[];
}

export interface SandboxScenario {
  id: string;
  name: string;
  desc: string;
  ret: SandboxReturns;
}

export type Glossary = Record<string, string>;

export interface DailyCard {
  q: string;
  a: boolean;
  why: string;
}

export interface StreakState {
  count: number;
  last: string | null;
}

export interface DailyState {
  last: string | null;
}

export type HoldingType = "index" | "bonds" | "crypto" | "other";

export interface HoldingTypeMeta {
  id: HoldingType;
  label: string;
  color: string;
}

/** A user-entered holding. Figures are self-reported — the app fetches no prices. */
export interface Holding {
  id: string;
  label: string;
  type: HoldingType;
  contributed: number;
  value?: number;
  added: string;
}

export interface ContributionState {
  last: string | null;
  count: number;
}

export interface ScamDailyState {
  last: string | null;
  streak: number;
  best: number;
}

export type WeeklyItemKind = "concept" | "myth" | "tip";

export interface WeeklyItem {
  id: string;
  kind: WeeklyItemKind;
  title: string;
  body: string;
}

export interface ActionStep {
  id: string;
  label: string;
  detail: string;
  route?: string;
}

export interface AppState {
  done: string[];
  persona: PersonaKey | null;
  streak: StreakState;
  daily: DailyState;
  xp: number;
  badges: string[];
  holdings: Holding[];
  contributions: ContributionState;
  scamDaily: ScamDailyState;
  actions: string[];
}

export interface Badge {
  id: string;
  ico: string;
  name: string;
  test: (state: AppState) => boolean;
}
