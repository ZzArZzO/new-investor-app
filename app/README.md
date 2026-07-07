# New Investor — App

Next.js (App Router) + Tailwind + shadcn/ui rebuild of the investing/crypto education app. Same content and features
as the original static prototype (now preserved at `legacy-prototype/`), redesigned with the "Calm Clarity" visual
direction: warm paper background, Fraunces serif headlines, muted forest green, editorial and low-hype tone.

See `docs/superpowers/specs/2026-07-07-app-redesign-design.md` (repo root) for the full design spec.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `src/content/` — typed data modules (lessons, quiz, personas, tools, comparison tables, glossary, badges)
- `src/lib/` — pure logic: date/format helpers, tool math (compound/fee/sandbox calculations), app-state reducers
- `src/hooks/` — `useAppState` (localStorage-backed progress) + its React context provider
- `src/components/` — `ui/` (shadcn primitives + Calm Clarity primitives), `layout/` (top bar, bottom tab bar),
  `home/`, `lessons/`, `tools/` (the 5 interactive tools)
- `src/app/(main)/` — the 4 tab routes (Home, Lessons, Tools, Compare); `src/app/quiz` and `src/app/result` are
  full-screen flows outside the tab shell

## Scripts

- `npm run dev` / `npm run build` / `npm start`
- `npm run lint`
- `npm test` — Vitest unit tests for the pure math/logic modules (`tool-math`, `app-state-logic`, quiz scoring)
