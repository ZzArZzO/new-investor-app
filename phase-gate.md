# Retention Gate — what to prove before the expensive backend
*Drafted: 2026-07-08 · Updated: 2026-07-09 · Owner decision doc · Not deployed (`*.md` excluded via `.vercelignore`)*

## Purpose

Phase 1 shipped the client-side **recurring-utility layer** (manual portfolio tracker,
daily "spot the scam" habit, weekly rotating content, first-investment action checklist)
into the Next.js app, instrumented with Vercel Web Analytics.

**Account sync already shipped ahead of this gate — and that's fine.** NextAuth +
Neon/Drizzle accounts, the settings page, cross-device state sync, and GDPR account
deletion landed on `app-mvp` (commit `3b8453b`) as **opt-in, reversible infrastructure**.
It sits *beside* the habit loop, not inside it: a signed-out visitor gets the exact same
tracker/streak/daily experience, and nothing about accounts changes the retention
behavior this gate measures. Building it early cost little and locked in nothing, so it
did not need to wait on the numbers below.

**What this gate still governs is the genuinely expensive, hard-to-reverse work:
live price alerts, push notifications, and the freemium paywall.** Those need ongoing
infra, content, and legal cost, and — unlike account plumbing — they're only worth
building if people actually come back. This doc defines the numbers that green-light
them. The core question is unchanged: did we turn a *course people finish and leave*
into a *companion people return to*?

## Ground rules before reading any number

- **Don't judge early.** Wait for **≥ 4 weeks of real traffic AND ≥ 150 unique visitors.**
  Below that it is noise, not signal.
- **Measurement honesty.** Vercel Web Analytics is cookieless and *aggregate* — it gives
  event counts, page views, and new-vs-returning visitors, but **not** true per-user
  retention cohorts. Metrics below are either directly readable (✅) or a **proxy** (◐).
  If the proxies land borderline, that ambiguity is itself the trigger to add real cohort
  analytics (PostHog) or run a manual pilot cohort **before** committing to Phase 2.

## Scorecard

Measured over the window above. Event names are the custom events wired in
`app/src/lib/analytics.ts`.

| # | Metric | How to read it | 🟢 GO | 🟡 Borderline | 🔴 No-go |
|---|--------|----------------|-------|---------------|----------|
| 1 | **Repeat-day habit** (north star) ◐ | (`daily_scam_played` + `daily_question_answered`) ÷ unique visitors. Both are once-per-day-guarded, so a ratio > 1 means people return on multiple days. | ≥ 2.0 | 1.2–2.0 | < 1.2 |
| 2 | **Second-contribution rate** ◐ | `contribution_logged` total ÷ `holding_added` total. Repeat logging = the DCA habit forming = the core companion behavior. | ≥ 0.4 | 0.2–0.4 | < 0.2 |
| 3 | **Returning-visitor share** ✅ | Vercel's new-vs-returning split over the window. Category norm is ~10%. | ≥ 25% | 12–25% | < 12% |
| 4 | **Intent → money path** ✅◐ | `action_step_completed` (provider step) ÷ visitors, plus `/compare` page views. Shows the funnel reaching the affiliate moment. | ≥ 8% | 3–8% | < 3% |
| 5 | **Activation** (context, not a gate) ✅ | `quiz_completed` ÷ visitors; `lesson_completed` count. Confirms people engage at all. | quiz ≥ 30% | 15–30% | < 15% |
| 6 | **Willingness-to-pay** (context for Phase-2 paywall scope, not a gate) ✅ | `plus_waitlist_joined` ÷ `upgrade_sheet_viewed` (interest→intent), cross-checked with `upgrade_sheet_viewed` ÷ visitors (reach). Fake-door shows real €5.99/€39.99 pricing (`subscription-plan.md`). **Only measurable once `NEXT_PUBLIC_PLUS_FAKEDOOR=1` — first launch ships with the fake-door OFF (no visible paid tier).** | join ≥ 10% | 3–10% | < 3% |
| 7 | **Country signal** (localization trigger, not a gate) ✅ | Vercel Analytics → Visitors → country breakdown: top-3 countries + share of total. App is EU-wide English; this decides *where* to localize first (language + country-specific premium tracks, e.g. pensions/tax — see `persona-research.md` scope note in `market-and-competition-research.md`). | one country ≥ 40% of visitors → start that market's localization + track pack | 25–40% — keep watching | spread thin: stay EU-generic |

## Decision rule

- **GO — build Phase 2** if **#1 and #2 are green**, **#3 is green or high-borderline**,
  and **#4 shows real intent (≥ borderline)**. Translation: people come back, log repeat
  contributions, and a slice moves toward opening an account. The backend/alerts/paywall
  now have something worth retaining.
- **BORDERLINE — iterate Phase 1, do not build backend.** Fix the weakest metric first
  (usually #1 or #2: sharpen onboarding, make the daily habit more compelling, tighten the
  tracker loop), then re-measure. Cheapest possible way to move the number.
- **NO-GO — the finite-goal ceiling is real.** If #1 < 1.2 and #2 < 0.2 after a fair
  window, people use it once and leave. Don't sink weeks into a backend — **pivot to
  B2B / white-label** (the Zogo route, which sidesteps both the ceiling and the EU
  Retail Investment Strategy affiliate-rule risk) or rethink the wedge.

## Caveats

- **#2 cannot be computed precisely from aggregate counts** ("users who logged ≥ 2"). The
  ratio is a proxy. If it lands in the 0.2–0.4 grey zone — where the decision hinges —
  that is exactly when adding **PostHog** (real retention cohorts) or a **manual pilot
  cohort** (invite ~20–30 people you can personally follow up with) pays for itself.
  Aggregate analytics is enough to *reject* or *strongly confirm*; it is weak in the middle.
- **These thresholds are starting points**, calibrated to beat category norms. Tune them
  once you see your real baseline.
- **One-time Duolingo sanity-check.** These thresholds are calibrated to generic category
  norms, not to the closest proven habit-app comparator. Once the ≥ 4-week / ≥ 150-visitor
  bar is cleared, do a single pass comparing #1 (repeat-day) and #3 (returning share)
  against Duolingo's disclosed public numbers (DAU/MAU, day-1/day-30 retention) as an
  external reference point — a one-off calibration check, not an ongoing task.

## Prerequisites (so the gate is measurable)

- Vercel **Web Analytics enabled** on the `app` project (dashboard toggle).
- The app is **served to real users** (the preview deploy, or promoted) — instrumentation
  only produces data once people actually use it.
- Enough traffic driven to clear the ≥ 150-visitor / ≥ 4-week bar.

## Weekly reading ritual (Monday, ~5 min)

Pull the numbers the same way each week and log one row so you watch the *trend*, not a
single snapshot.

1. Vercel → **`app`** project → **Analytics**. Set the date range to **last 4 weeks** (or
   since launch).
2. From **Visitors**: record unique **Visitors (V)**, the **Returning %**, and the **top-3
   countries with their share** (this is the localization trigger — metric #7). Until the
   app is deployed publicly, read country data from the landing-page project instead.
3. From **Events**, record counts: `daily_scam_played` (DS), `daily_question_answered`
   (DQ), `holding_added` (HA), `contribution_logged` (CL), `action_step_completed` (AS),
   `quiz_completed` (QC), `lesson_completed` (LC), `tool_opened`, `upgrade_sheet_viewed`
   (UV), `plus_waitlist_joined` (WJ), `review_session_completed`.
4. From **Pages**, record `/compare` views.
5. Compute the five gate metrics:
   - **#1 Repeat-day habit** = (DS + DQ) ÷ V
   - **#2 Second-contribution** = CL ÷ HA
   - **#3 Returning share** = Returning %
   - **#4 Intent** = AS(provider) ÷ V (cross-check with `/compare` views)
   - **#5 Activation** = QC ÷ V
   - **#6 Willingness-to-pay** = WJ ÷ UV (context; also note UV ÷ V)
   - **#7 Country signal** = top country's share of V (≥ 40% sustained → localize that market)
6. If **V < 150 or < 4 weeks of traffic → write "insufficient, keep collecting"** and stop.
   Otherwise colour each metric 🟢/🟡/🔴 against the scorecard and apply the decision rule.

### Running log

| Week ending | V | #1 repeat-day | #2 2nd-contrib | #3 returning | #4 intent | #5 activation | Read |
|---|---|---|---|---|---|---|---|
| _e.g. 2026-08-10_ | _180_ | _1.6 🟡_ | _0.3 🟡_ | _18% 🟡_ | _6% 🟡_ | _34% 🟢_ | _iterate_ |
|  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |

## Related

- Retention-layer plan and worth-it analysis: `~/.claude/plans/elegant-napping-sedgewick.md`
- Market / regulatory context (finite-goal ceiling, EU RIS affiliate risk, B2B hedge):
  `market-and-competition-research.md`
