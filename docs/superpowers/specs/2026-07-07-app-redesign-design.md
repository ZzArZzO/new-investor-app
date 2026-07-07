# New Investor App Redesign — Design Spec

Date: 2026-07-07
Status: Approved, pending implementation plan

## Context

`app/index.html` is a working prototype of the New Investor app: a single static HTML file (vanilla JS, hand-written CSS, no build step) implementing a Duolingo-style investing/crypto education product — onboarding quiz → investor persona, 9 lessons across 3 pillars, 5 interactive tools (compound playground, fee eroder, scam spotter, portfolio sandbox, core+satellite allocation), broker/exchange comparison tables, an inline glossary, and a streak/XP/badge progress system, all persisted to `localStorage`.

This spec covers a full visual and technical redesign of that app: same features and content, new design system, new component architecture, built with Next.js + Tailwind + shadcn/ui + 21st.dev (Magic MCP) instead of a single static file.

Root-level `index.html` (the public marketing landing page) is out of scope and untouched.

## Goals

- Replace the single-file prototype with a maintainable Next.js component architecture.
- Apply the "Calm Clarity" visual direction: warm, editorial, trustworthy — matching the product's explicit "no hype, no hot tips" positioning.
- Introduce a persistent bottom tab bar for top-level navigation.
- Preserve all existing content and functionality exactly (quiz, lessons, tools, tables, glossary, streak/XP/badges). No new features, no removed features.

## Non-goals

- No new features or flows beyond what exists today.
- No changes to lesson content, quiz questions, persona logic, broker/exchange listings, or scam scenarios — these are data, not part of this redesign.
- No changes to the root marketing landing page.

## Visual direction: Calm Clarity

Chosen after comparing three directions (Calm Clarity / Playful Progress / Serious Fintech Minimal) via mockups. Rationale: the product's core differentiator is refusing hype ("no price predictions," "no guaranteed returns," "what we'll never do" list) — an editorial, trust-first tone reinforces that positioning better than gamified or purely transactional-feeling UI.

### Design tokens

**Color** (light / dark):
- `paper` (background): `#F8F6EF` / `#131511`
- `ink` (primary text): `#1C231D` / `#EDEEE9`
- `muted` (secondary text): `#5E655D` / `#9CA398`
- `accent` (forest green — primary actions, links, progress): `#33553F` / `#6FCB9B`
- `accent-soft` (accent backgrounds — callouts, tags): `#E6E9DF` / `#1B2A20`
- `amber` (daily card, non-critical highlights): carried over from current palette (`#d98c2b` / `#e0a24a`)
- `red` (risk warnings only — crypto risk banners, wrong quiz answers): carried over (`#c94b3b` / `#e0705f`)
- `line` (borders/dividers): `#DEDACC` / `#2A2D26`

**Typography**:
- Display (headlines only, H1/H2): Fraunces, self-hosted via `next/font/google`, weight 500
- Body/UI: Inter, self-hosted via `next/font/google`
- Tabular figures (fees, XP, percentages, prices, streak counts): mono face with `font-variant-numeric: tabular-nums`

**Shape**: 11px radius for cards, pill radius (999px) for tags/badges/streak chip, single soft shadow scale (2 steps: resting, raised).

Both light and dark themes are first-class — dark is not an inverted afterthought, contrast is verified independently for each (per `ui-ux-pro-max` accessibility checklist: primary text ≥4.5:1, secondary text ≥3:1 in both themes).

## Architecture

- **Framework**: Next.js 15, App Router, TypeScript.
- **Styling**: Tailwind CSS, theme extended with the tokens above (as CSS custom properties + Tailwind theme config, not raw hex in components).
- **Component base**: shadcn/ui primitives (Button, Card, Tabs, Progress, Dialog, Slider, Table) as the foundation, so 21st.dev/Magic-generated components — which target shadcn/ui + Tailwind — drop in without a styling mismatch.
- **Location**: replaces `app/` in place. To avoid `app/app/` ambiguity (repo folder `app/` vs Next's own `app/` router convention), the Next project uses a `src/` layout: `app/src/app/**`, `app/package.json`, `app/next.config.ts` at the `app/` root.
- **Deployment**: Vercel, matching the existing repo's deployment model. `app/` remains excluded from the *public* landing-page deploy per the existing `2a0003d` decision — this redesign doesn't change that; whether/when the app itself gets its own public deployment is a separate decision outside this spec.

## Navigation

Persistent bottom tab bar, 4 items: **Home**, **Lessons**, **Tools**, **Compare** (within the ≤5-item mobile nav best practice). Routes:

- `/` — Home (hero, daily question, "what we'll never do", progress card)
- `/quiz` — onboarding quiz (pushed from Home's CTA, not a tab)
- `/result` — persona result (pushed from quiz completion)
- `/lessons` — lesson list
- `/lessons/[id]` — single lesson (reading, callouts, risk banner, embedded tool where applicable, quick-check quiz)
- `/tools` — tools hub grid
- `/tools/[id]` — individual tool, or in-page expansion (matches current in-hub expansion behavior — decide at implementation time based on whichever preserves the current UX best)
- `/compare` — broker/exchange comparison tables

Active tab is visually highlighted; quiz/result/lesson-detail screens show a back affordance instead of the tab bar changing state, consistent with `nav-hierarchy` (primary tab nav vs. secondary/detail navigation stay visually distinct).

## Component inventory

**Hand-built primitives** (shadcn-based, styled to tokens above): `Button` (primary/ghost variants), `Card`, `Tag`/`Pill` (streak chip, XP chip, badge chip), `ProgressBar`, `BottomTabBar`, `TopBar` (brand + streak pill), `StatTile` (tabular-nums), `SegmentedControl` (used in tool controls).

**21st.dev / Magic MCP generated** (fed the token system above so output matches Calm Clarity, not a generic shadcn default): `HeroCard`, `DailyQuestionCard`, `LessonRow`/lesson list, `QuizFlow` (question + options + progress), `PersonaResult`, `ScamSpotter` message-card UI.

**Hand-built charts** (Recharts, reusing existing calculation logic from the prototype verbatim): compound-growth playground chart, fee-eroder bars, portfolio-sandbox chart, core+satellite allocation donut.

**Content-driven, low-visual-risk**: `ComparisonTable` (broker/crypto), inline `GlossaryTerm` popover, `Toast`.

**Content data**: `LESSONS`, `QUIZ`, `PERSONAS`, `TOOLS`, `BROKERS`, `CRYPTO`, `SCAM_SCENARIOS`, `SANDBOX_SCENARIOS`, `GLOSSARY`, `DAILY_CARDS`, `BADGES` move from the current single `<script>` block into typed `app/src/content/*.ts` modules — same data, same shape, no behavioral change, just typed and extracted.

## State management

Same model as today: `localStorage`-backed state (`done` lesson ids, `persona`, `streak`, `daily`, `xp`, `badges`), same derivation logic (streak counting, badge test functions, XP accrual). Wrapped in one `useAppState` hook (read/write `localStorage` safely, expose state + mutators) instead of the current global `state` object + manual DOM writes. No change to what's stored or how badges/streaks are computed — only how the UI reacts to it (React re-render vs. manual DOM mutation).

## Testing

- Unit tests for the pure calculation logic behind the 3 numeric tools (compound growth, fee erosion, portfolio sandbox sequences) — these are pure functions, cheap to test, and the highest-value thing to protect since they're financial-education math.
- Integration tests for the two stateful flows most likely to break silently: quiz → persona assignment, and lesson-complete → XP/badge award.
- One E2E smoke path (quiz → first lesson → complete → tools) to confirm the rebuilt app doesn't regress the core loop.
- Manual accessibility + dark-mode pass against the `ui-ux-pro-max` checklist (contrast, touch targets, focus states, tap feedback) before calling the redesign done.

## Build order

1. Scaffold Next.js + Tailwind + shadcn + fonts (Fraunces, Inter) in `app/`
2. Port content arrays to typed `content/*.ts` modules (no behavior change)
3. Design tokens (Tailwind theme + CSS variables) + hand-built primitives
4. Bottom tab shell + route skeletons for all 4 top-level routes
5. Home screen (hero, daily question, "what we'll never do", progress card)
6. Lessons list + single-lesson view + quick-check quiz
7. Onboarding quiz + persona result flow
8. 5 interactive tools (reuse existing math verbatim, restyle only)
9. Comparison tables + glossary popovers
10. `useAppState` hook wiring (streak/XP/badges), replacing the manual-DOM version
11. 21st.dev/Magic polish pass on the bespoke components (§ Component inventory)
12. Testing (unit + integration + E2E smoke) and accessibility/dark-mode verification pass

## Open items for the implementation plan

- Whether `/tools/[id]` is a separate route per tool or an in-page expansion within `/tools` (current prototype expands in-place within the hub) — implementation detail, not a design decision, resolve during planning.
- Exact shadcn components to install vs. hand-roll (e.g. whether `Table` primitive is worth pulling in for 2 comparison tables, or a plain styled `<table>` suffices).
