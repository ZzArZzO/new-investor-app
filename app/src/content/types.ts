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
  /** URL segment for the published persona page (/types/[slug]). */
  slug: string;
  strengths: string[];
  blindSpots: string[];
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
  /** "plus" marks a lesson as part of the (not-yet-purchasable) Plus tier. Absent = free. */
  tier?: "plus";
}

export interface BrokerRow {
  name: string;
  type: string;
  regulation: string;
  cost: string;
  minimum: string;
  notable: string;
  link: string;
  /**
   * Editorial grouping by OBJECTIVE criterion only (user base among Dutch/EU
   * retail beginners), never preference — grouping is presentation, the data
   * stays identical for every user (compliance-one-pager.md).
   */
  mostUsed: boolean;
}

export interface CryptoExchangeRow {
  /** Same objective grouping rule as BrokerRow.mostUsed (user base, not preference). */
  mostUsed: boolean;
  name: string;
  licence: string;
  cost: string;
  notable: string;
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
  /** Earned streak freezes (max 2). One is auto-consumed to bridge a single missed day. Optional: states saved before this field existed lack it. */
  freezes?: number;
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

/** A user-entered holding. Figures are self-reported, the app fetches no prices. */
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

/** Per-kind email opt-ins. Absent field = opted in (accounts predate this setting). */
export interface EmailPrefs {
  streak: boolean;
  weekly: boolean;
}

/**
 * One spaced-repetition card. `id` encodes the source:
 * "check:<lessonId>:<questionIndex>" for a missed quick-check question,
 * "term:<glossary key>" for a glossary term.
 */
export interface ReviewItem {
  id: string;
  /** YYYY-MM-DD the card is next due. */
  due: string;
  /** Index into the review interval ladder (0 = shortest). */
  ease: number;
}

export interface ReviewState {
  items: ReviewItem[];
  /** Day the daily counter refers to. */
  day: string | null;
  /** Cards answered on `day`, free tier caps this per day. */
  doneToday: number;
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
  /** Optional: states saved before the review deck existed lack it. */
  review?: ReviewState;
  /** Optional: states saved before email preferences existed lack it. */
  emails?: EmailPrefs;
}

export interface Badge {
  id: string;
  ico: string;
  name: string;
  test: (state: AppState) => boolean;
}
