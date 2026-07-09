# New Investor — App Prototype (Phase 2)

A self-contained, interactive prototype of the product. **No build step, no backend, no dependencies** — just open `app/index.html` in a browser.

## What's in it
- **Archetype quiz** — 8 behavioural questions (no financial-detail inputs), tally → one of 4 personas. Result is descriptive only, not personal advice.
- **Lessons** — all 9 lessons across the three pillars (Foundations, Investing, Crypto & blockchain, Capstone), each with reading, a real example, and a 2-question interactive check. Lessons unlock in order; progress + a simple streak persist in `localStorage`.
- **Comparison table** — brokers/robo-advisors and MiCA-licensed exchanges, shown to everyone, facts-only, with affiliate disclosure + a crypto risk banner. All figures marked `*` = verify before real use.

## Compliance guardrails baked in (see `../compliance-one-pager.md`)
- Editorial voice throughout ("people often…", never "you should buy…").
- Quiz uses no income/savings data; persona output is a published, descriptive type.
- Tool comparison is shown to all users, decoupled from the quiz result.
- Crypto lessons + the crypto table carry a persistent high-risk warning; only MiCA-licensed exchanges are listed.
- Persistent "educational, not advice" disclaimer on every screen.

## Status
This is a **branch-only prototype (`app-mvp`)**, intentionally not deployed to the public site. It's for review and pilot testing, pending Phase 0 demand validation.

## Next steps if it graduates to a real build
- ~~Swap `localStorage` for real accounts~~ — **done.** Opt-in NextAuth accounts with
  cross-device sync and GDPR deletion shipped on `app-mvp` (see `../src/auth.ts` and the
  settings page). Local-only progress still works signed out; accounts sit beside it.
- Still open: the live **price-alert / push-notification** mechanics (gated on retention —
  see `../../phase-gate.md`).
- Replace the illustrative comparison data with verified, dated figures; re-check the CASP register.
- Rebuild the lesson visuals (see `../lesson-visuals/`) as live components.
- Wire the affiliate links once broker/exchange partnerships exist.
