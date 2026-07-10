# Revenue Stream Options — beyond affiliate-only
*Drafted: 2026-07-09 · Proposal for a founder decision, not a settled plan*

## Why this exists

`market-and-competition-research.md` (verdict, line 64) names the **affiliate-only revenue
model as one of the two weakest links** in the concept, for three concrete reasons:

1. **Nobody proves it in this niche.** The two most successful "Duolingo for finance"
   players monetize differently — **Finelo** by direct subscription (~$14–40/mo), **Zogo**
   by B2B2C licensing to banks/credit unions. No one runs pure education-to-broker-affiliate
   at scale here, which is either an unclaimed gap *or* a sign the unit economics don't clear.
2. **Affiliate needs scale we won't have early.** NerdWallet's model works at ~21M monthly
   visitors (~$47/conversion). A new education app has neither the traffic nor the SEO head
   start of the incumbent NL broker-comparison sites (Finner.nl et al.).
3. **Regulation is aimed straight at it.** The EU **Retail Investment Strategy** (agreed
   18 Dec 2025) tightens finfluencer/paid-referral rules over the next ~24–30 months — the
   exact mechanism affiliate revenue depends on, landing over the same window a v1 would scale.

**This doc lays out the two credible fallback/complement directions so the choice is
deliberate.** It does not pick one — that's a founder call (see end).

---

## Option A — Direct subscription (freemium)

Comparator: **Finelo** (1.5M learners, 1.15M paying, ~$14–40/mo tiers).

**Shape.** Core lessons + the daily habit stay free (they're the acquisition funnel and the
retention engine the gate measures). A paid tier sits on top: e.g. deeper tracks, the price
alerts / push notifications, richer portfolio tracking, or an ad-free/priority experience.

| ✅ For | ❌ Against |
|---|---|
| Revenue scales with *value delivered*, not with steering people to a broker | Asks money from beginners who haven't invested a euro yet — high price sensitivity |
| Sidesteps the RIS finfluencer/referral tightening almost entirely | Needs enough premium depth to justify a recurring charge — that's real content/build cost |
| Proven in this exact niche (Finelo) | Freemium conversion is typically low single-digit %; needs volume |
| Aligns incentives: we win when the learner keeps learning | The paywall itself is Phase-2, gated on retention (`phase-gate.md`) — can't lead with it |

**Fit with what's built.** The account layer that already shipped (`app-mvp`) is the exact
prerequisite for subscriptions — identity, per-user state, a settings surface. A paywall
would bolt onto it rather than needing new plumbing.

**Status update (2026-07-09).** Option A now has a concrete design and a live test:
`subscription-plan.md` fixes the tier split and pricing (€5.99/mo · €39.99/yr), and the app
ships a **fake-door "Plus" waitlist** (locked deep-dive tracks + tracker insights card →
upgrade sheet → email capture at the real price). Willingness-to-pay is read weekly as
metric #6 in `phase-gate.md`. Real Stripe billing remains gated on the retention scorecard.

---

## Option B — B2B / white-label licensing

Comparator: **Zogo** (1,200+ modules, licensed to banks/credit unions who pay to engage
their own customers).

**Shape.** License the curriculum + gamified engine to a bank, neobroker, employer, or
financial-education program, who deploys it to *their* users under *their* brand (or co-brand).
Revenue is a B2B contract, not per-consumer.

| ✅ For | ❌ Against |
|---|---|
| **Structurally sidesteps** the RIS affiliate/finfluencer rules — we're a content vendor, not a promoter (the research flags this explicitly as the Zogo advantage) | Enterprise sales cycle: slow, relationship-driven, few large customers |
| Revenue per deal is large and recurring; not dependent on consumer traffic/scale | Product must be white-label-ready (theming, multi-tenant) — more build than a B2C paywall |
| A bank's compliance umbrella can absorb regulatory surface we'd otherwise carry alone | Cedes the direct consumer relationship + brand; harder to also run B2C |
| Proven in this niche (Zogo) | Depends on landing partners — a chicken-and-egg cold start |

**Fit with what's built.** Less direct than Option A — the current app is B2C-shaped
(consumer accounts, consumer copy). White-label would need a multi-tenant/theming layer.
But the *curriculum and content* (the hard-to-copy asset) port over regardless.

---

## Not either/or

These compose. A realistic path: **prove B2C retention first (the gate), add a subscription
tier as the primary revenue engine, keep affiliate as a disclosed secondary stream, and
treat B2B/white-label as the hedge if consumer economics or the RIS rules make B2C referral
unviable.** Affiliate doesn't have to die — it just shouldn't be the *only* leg.

## The decision (open — founder call)

Not resolved here. What to decide, and roughly when:

- **Now / cheap:** confirm the subscription-first *instinct* so Phase-2 premium features are
  designed as sellable from the start, not retrofitted.
- **After Phase 0 + the retention gate:** the real numbers (does anyone come back? which
  pillar converts?) should drive whether the paid tier is worth building at all.
- **Opportunistic:** B2B/white-label is worth exploring the moment a credible partner
  surfaces — it doesn't have to wait on B2C metrics, and it's the cleanest regulatory posture.

**Related:** `market-and-competition-research.md` (the weak-link analysis this responds to),
`phase-gate.md` (why the paywall specifically is gated on retention),
`compliance-one-pager.md` (the RIS affiliate-rule risk driving the need for a fallback),
`referral-program-spec.md` (referral reward gating — engagement-gated by design).
