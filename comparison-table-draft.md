# Tool Comparison Table — Draft v1

> **Prototype exists at `/comparison/index.html`** — updated 2026-07-06 with sourced data (provider pages + secondary trackers, not a fresh live pull) replacing most of the placeholders below; a few figures remain `⚠️verify` (BUX/DEGIRO minimums, Peaks' fund manager, a Bitstamp fee conflict across sources). Full citations are on the page itself. It's `noindex`, not linked from anywhere on the live site, and carries a large "DRAFT — not live" banner. Do not link it from the site or add real affiliate tracking until the checklist at the bottom of this file is done and the lawyer has signed off per `compliance-one-pager.md` — sourced data is not the same as legal sign-off.

> The "decoupled comparison" from the plan and `compliance-one-pager.md`. **Critical rules, non-negotiable:**
> 1. **Shown to everyone**, identically — never "your quiz result → this one tool for you." (Keeps us out of MiFID "personal recommendation" territory.)
> 2. **Facts only** — fees, minimums, what's regulated/protected. No "best," no "recommended for you," no ranking that implies suitability for an individual.
> 3. **Crypto section lists only MiCA-licensed (CASP) exchanges.** Re-verify against the ESMA CASP register before publishing and periodically after.
> 4. **Affiliate disclosure** visible on the table: *"Some links are affiliate links — we may earn a fee if you open an account through them, at no cost to you. This never changes what's listed or how it's ordered."*
> 5. **Every euro figure below is a placeholder marked `⚠️verify`** — pricing changes constantly; confirm each against the provider's current page before going live, and add a "last checked" date.

---

## Section 1 — Investing: brokers & robo-advisors (traditional markets)

Columns for the live UI: **Provider · Type · Regulation/protection · Headline cost model · Minimum · Notable for (neutral facts) · Link**

| Provider | Type | Regulated / protection | Cost model | Minimum | Notable (neutral facts) |
|---|---|---|---|---|---|
| **DEGIRO** (flatexDEGIRO) | Self-directed broker | EU-regulated; German bank deposit protection on cash | Low per-trade fees; some ETFs on a core selection ⚠️verify | Low ⚠️verify | Large market/product range; market leader in NL |
| **Trade Republic** | Broker / app | EU-regulated (German BaFin); deposit protection on cash ⚠️verify | Commission-free ETF savings plans; small per-order fee ⚠️verify | €1 savings plans ⚠️verify | App-first; automated recurring ETF buys |
| **Scalable Capital** | Broker + robo | EU-regulated; deposit protection on cash ⚠️verify | Flat-fee subscription tiers; ETF savings plans ⚠️verify | Low ⚠️verify | Offers both self-directed and managed portfolios |
| **BUX** | Broker / app | AFM-regulated (NL); assets segregated, cash deposit-guaranteed up to €100k ⚠️verify | Commission-free core; currency/other fees ⚠️verify | Low ⚠️verify | Dutch neo-broker, beginner-oriented UX |
| **Peaks** / bank robo products | Robo-advisor | Verify current regulator/status ⚠️verify | Managed-portfolio % fee ⚠️verify | Low ⚠️verify | Hands-off, rounds-up style investing (verify current offering) |

> Note: confirm each provider's *current* regulatory status and product availability in NL before listing — some change entities/brands. Present alphabetically or by a neutral, disclosed criterion, **not** by "how good for you."

---

## Section 2 — Crypto: MiCA-licensed exchanges only

> **Hard gate:** a platform appears here **only** if it holds a current MiCA CASP authorization (check the [ESMA CASP register](https://casptracker.eu/)). As of 6 July 2026, 283 firms hold CASP licenses. The ones below were reported licensed — **re-verify each before publishing.**

| Exchange | CASP authorization (verify) | Cost model | Notable (neutral facts) |
|---|---|---|---|
| **Bitvavo** | Netherlands (AFM) ⚠️verify | Trading fees ⚠️verify | NL-based; widely used in the Netherlands |
| **Finst** | Netherlands (AFM) ⚠️verify | Trading fees ⚠️verify | NL-based, low-fee positioning ⚠️verify |
| **Kraken** | Luxembourg (CSSF) / Ireland ⚠️verify | Trading fees ⚠️verify | Large global exchange |
| **Coinbase** | Luxembourg ⚠️verify | Trading fees ⚠️verify | Large global exchange, beginner-oriented UX |
| **Bitpanda** | EU (Austria) ⚠️verify | Trading/spread fees ⚠️verify | EU-based, offers crypto + other assets |
| **Bitstamp** | Luxembourg ⚠️verify | Trading fees ⚠️verify | Long-established EU exchange |

**Mandatory crypto banner above this section (always visible):**
> ⚠️ *Crypto is high-risk — prices are extremely volatile and you can lose your entire investment. There is generally no investor-compensation scheme. Only ever use MiCA-licensed platforms, and never invest more than you can afford to lose.*

No coin recommendations. No "top coins." No price talk. Exchanges only, framed as *where* regulated trading happens — not *what* to buy.

---

## Data-maintenance checklist (before publish + quarterly)

- [ ] Re-verify every crypto exchange against the ESMA CASP register; remove any that lost/lack authorization.
- [ ] Re-check every fee/minimum against the provider's live pricing page; update "last checked: YYYY-MM-DD".
- [ ] Confirm each broker's current NL availability and regulator.
- [ ] Confirm affiliate disclosure is visible and the ordering criterion is neutral and disclosed.
- [ ] Confirm the table is identical for all users (not filtered by quiz result).

## How this plugs into the app (per the plan)

- Lives on the archetype **result screen** and in Lesson 5 / the crypto capstone — but as "here's the landscape, shown to everyone," with the persona text kept purely descriptive beside it.
- This is the primary **affiliate revenue** surface. Two streams to instrument: broker signups and MiCA-licensed crypto-exchange signups (crypto referral often pays more — confirm real EU rates in Phase 2).
