# Subscription Plan — "New Investor Plus"
*Drafted: 2026-07-09 · Owner decision doc · Not deployed (`*.md` excluded via `.vercelignore`)*

The concrete freemium design behind Option A in `revenue-stream-options.md`. Phase A
(fake-door willingness-to-pay test) is **shipped in the app**; Phase B (real billing) stays
gated on the retention scorecard in `phase-gate.md`.

## Hard rules (compliance + strategy, non-negotiable)

1. **The comparison tables stay identical for every user, free forever.** Gating or
   personalizing them turns editorial comparison into steered recommendation
   (`compliance-one-pager.md`). Plus never changes *what anyone is shown or recommended* —
   only what is taught, and what is computed on the user's own inputs.
2. **The core curriculum (Foundations, Investing, Crypto, Capstone) and the new Money-basics
   and Brain-&-money tracks stay free** — acquisition funnel, mission, and the habit engine
   the retention gate measures.
3. **The daily habit loop stays free**: daily question, daily scam, streaks (incl. freezes),
   XP, badges, tools, tracker, comparison tables, account sync.
4. **Scam/safety education is never paywalled.**
5. **No real billing ships before the retention gate passes** (`phase-gate.md`).

## Tiers

### Free — "New Investor"
Everything live today: quiz + persona, 17 free lessons across 7 tracks, all 5 tools, daily
question + daily scam + streak freezes, manual tracker, comparison tables, account sync,
weekly digest, spaced-repetition review at **5 cards/day**.

### Paid — "New Investor Plus" · €5.99/month or €39.99/year (annual anchored, ≈ €3.33/mo)

| Gated | Status |
|---|---|
| Deep-dive tracks: Financial independence (2 of 3 lessons), Real estate (1 of 2), Crypto deep-dive (2 of 3) — first lesson of each track free as teaser | Content shipped, fake-door locked |
| Unlimited daily review cards | Cap shipped; lift is a one-line change |
| Portfolio insights: fees paid + allocation drift vs the user's **own** targets (descriptive math, never a recommendation) | Not built — Phase B |
| CSV import (DEGIRO / Trade Republic / Bitvavo exports, parsed client-side) | Not built — Phase B |
| Advanced calculators (FIRE number, DCA vs lump-sum) | Not built — Phase B |
| Later wave: live daily-close valuation + user-defined price alerts (needs price pipeline + vendor; strict copy review) | Not built — Phase C |

**Price rationale.** Finelo charges ~$14–40/mo behind discount-pressure funnels this brand
explicitly rejects; Duolingo Super (~€7–13/mo) is the honest-freemium reference. The
audience is pre-first-euro beginners: €5.99 reads as "two coffees", €39.99/yr sits under the
"is this subscription-worthy" threshold. Slightly underpriced on purpose — raising later for
new users is easy, lowering is not. One product, two intervals; no lifetime plans, no tiers
(YAGNI).

## Phase A — shipped (fake-door, zero billing)

- Locked "Plus" lesson rows + locked "Portfolio insights" card on the tracker, all opening
  one `UpgradeSheet` (`app/src/components/plus/`): honest "coming soon", real prices shown,
  waitlist email capture via the existing Formspree pattern (`source: plus_waitlist`,
  `price_shown: 5.99m-39.99y`).
- Analytics: `upgrade_sheet_viewed`, `plus_waitlist_joined` (props: `feature`,
  `price_shown`) in `app/src/lib/analytics.ts`.
- Read in the weekly ritual (`phase-gate.md` §6): waitlist-join ÷ sheet-view, and
  sheet-view ÷ visitors.

## Phase B — real billing (build ONLY when the gate passes)

**Shape: Stripe hosted Checkout + Customer Portal + one webhook.** No custom payment UI.
Enable **iDEAL** (dominant NL payment method) and **Stripe Tax** from day one.

1. **Entitlement lives in a new `subscription` table** (`app/src/db/schema.ts`), one row
   per user, written **only** by the Stripe webhook/checkout flow — never inside the
   client-writable `user_app_state.state` jsonb:
   `userId (PK, FK cascade) · stripeCustomerId · stripeSubscriptionId · status · priceId · currentPeriodEnd · cancelAtPeriodEnd · updatedAt`
2. **Routes** (each follows the existing `auth() → 401 → db` pattern):
   - `POST /api/billing/checkout` — find-or-create customer, Checkout Session
     (`mode: subscription`, `client_reference_id: userId`), return `{ url }`
   - `POST /api/billing/portal` — Customer Portal session (cancel/card/invoices = Stripe's UI)
   - `POST /api/stripe/webhook` — signature-verified raw body; handle exactly
     `checkout.session.completed`, `customer.subscription.updated`,
     `customer.subscription.deleted` → upsert the row; 200-noop everything else
3. **Server check**: `getEntitlement(userId)` — `status ∈ {active, trialing} AND
   currentPeriodEnd > now` (stale webhook state fails safe). **Client delivery**: extend
   `GET /api/state` to return `{ state, plan: "free" | "plus" }`; thread `plan` through
   `use-app-state.ts`. Plan is never put in the JWT and never trusted from the client for
   server decisions. Client-bundle soft-gating of premium lesson text is accepted at this
   scale.
4. **Flip the fake-door**: `UpgradeSheet` waitlist mode → checkout mode; `LockedCard` +
   plus lesson rows honor `plan`.
5. **Legal**: finish the privacy policy (already a launch blocker), add Stripe as
   subprocessor, EU 14-day withdrawal consent checkbox (Stripe Checkout built-in),
   refund/cancellation terms page.
6. **Tests**: `isEntitled` matrix, webhook signature + event upserts, checkout 401,
   `plan` in GET /api/state. Manual E2E via Stripe test mode + `stripe listen`.
7. **Rollout**: founding-member coupon to the Phase-A waitlist first, 2 weeks, then all
   upgrade surfaces on.

**Explicitly not building**: metering, multiple tiers, seats, dunning UI, in-app invoices,
server-enforced content APIs, Stripe Connect.

## Risks

- **Webhook = single source of billing truth.** Mitigate: period-end grace, Stripe retries,
  a "refresh subscription status" button in settings that re-fetches from the API.
- **Persona→premium coupling creep.** Premium must never change what is *recommended* —
  only what is taught/computed on user-set inputs. Watch every future insights feature.
- **Fake-door pollutes retention reads slightly.** Locked surfaces are few and logged
  distinctly; interpret metric #1–#3 accordingly.
- **Content debt is the real cost.** Plus sells mostly content; the NL-specific tracks
  (pensions pijler 1/2/3, box-3 taxes) remain unwritten and are the strongest premium moat —
  next content batch.

## Open questions (founder)

1. Founding-member offer: first-year discount (e.g. €29/yr) vs. permanent price-lock?
2. Legal entity + VAT registration to hang the Stripe account on?
3. Price-data vendor budget ceiling for the Phase-C alerts wave?
4. NL Dutch localization before Phase B (every new string adds retrofit cost)?
5. Lawyer review timing: before public launch of the fake-door, or only before real billing?
