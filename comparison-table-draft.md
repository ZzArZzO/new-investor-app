# Tool Comparison Table — Draft v2
*Last checked: 2026-07-09 — regulators, protection tiers, CASP authorizations, and most fees sourced from official pages. Only 3 crypto rows (Coinbase, Bitpanda, Bitstamp) remain `⚠️verify` — their fee pages blocked automated fetch, so those figures come from third-party sources and need a browser confirm before quoting as exact.*

> The "decoupled comparison" from the plan and `compliance-one-pager.md`. **Critical rules, non-negotiable:**
> 1. **Shown to everyone**, identically — never "your quiz result → this one tool for you." (Keeps us out of MiFID "personal recommendation" territory.)
> 2. **Facts only** — fees, minimums, what's regulated/protected. No "best," no "recommended for you," no ranking that implies suitability for an individual.
> 3. **Crypto section lists only MiCA-licensed (CASP) exchanges.** All 6 below hold a **confirmed, current** CASP authorization (checked 2026-07-09); re-verify periodically against the ESMA CASP register.
> 4. **Affiliate disclosure** visible on the table: *"Some links are affiliate links — we may earn a fee if you open an account through them, at no cost to you. This never changes what's listed or how it's ordered."*
> 5. **Regulation, protection, minimums, and CASP status are now sourced.** Remaining `⚠️` markers are on **exact trading-fee percentages only** — those are tiered/volume-dependent and change constantly; confirm each against the provider's live fee page before quoting an exact number.

---

## Section 1 — Investing: brokers & robo-advisors (traditional markets)

Columns for the live UI: **Provider · Type · Regulation/protection · Headline cost model · Minimum · Notable for (neutral facts) · Link**

| Provider | Type | Regulated / protection | Cost model | Minimum | Notable (neutral facts) |
|---|---|---|---|---|---|
| **DEGIRO** (flatexDEGIRO) | Self-directed broker | flatexDEGIRO Bank, BaFin-regulated (DE); cash guaranteed to €100k, securities held via separate custodian | €1 handling fee on Core Selection ETFs (one free trade/month per ETF); ~€3 on other ETFs | No minimum deposit | Large market/product range; market leader in NL |
| **Trade Republic** | Broker / app (licensed bank) | BaFin-regulated (DE), operates as a bank; cash covered to €100k | Flat €1 per order; recurring ETF/stock savings plans free | €1 savings plans | App-first; automated recurring ETF buys; interest paid on cash |
| **Scalable Capital** | Broker + robo | BaFin-regulated (DE); cash segregated, €100k deposit guarantee | Free Broker €0.99/trade, or PRIME+ €4.99/month flat for unlimited trades | €1 | Offers both self-directed and managed (robo) portfolios |
| **BUX** | Broker / app | AFM + DNB-regulated (NL); assets segregated, Dutch investor compensation up to €20k | Commission-free "Zero" orders and plans; €1.99 EU / €0.99 US market orders | Low (fractional, ~€1) | Dutch neo-broker, beginner-oriented UX; owned by ABN AMRO |
| **Peaks** | Robo-advisor | AFM-registered investment firm (NL); discretionary — invests for you into ETF portfolios | €1.59/month + 0.50%/yr service fee, plus fund costs | €1 | Hands-off, round-up style investing; still operating (Rabobank exited its stake in 2022) |

> Note: DEGIRO/Trade Republic/Scalable/BUX are execution brokers (you pick investments); **Peaks is a discretionary robo-advisor** (it invests for you) — the `type` column matters so the cost comparison isn't read like-for-like. Present alphabetically or by a neutral, disclosed criterion, **not** by "how good for you." (Sourced 2026-07-09: BaFin/AFM/DNB registers, provider fee pages, brokerchooser/curvo reviews.)

---

## Section 2 — Crypto: MiCA-licensed platforms (CASPs) only

> **Hard gate:** a platform appears here **only** if it holds a current MiCA CASP authorization. All 6 below were verified on **2026-07-09** against the **ESMA central CASP register** (the master CSV on esma.europa.eu, ~336 authorised CASPs — the gold-standard primary source, not a mirror), matched by legal entity, LEI, regulator, authorization date, and service scope, and corroborated by the [AMF France CASP white list](https://www.amf-france.org/en/warnings/white-lists/daspcasp/) + the Austrian FMA notice for Bitpanda. Every dated claim matches the register exactly; all carry a full EU/EEA passport. **Re-verify before any formal sign-off — ESMA refreshes the CSV weekly and authorizations can be withdrawn.**

| Exchange | Legal entity (ESMA register) | LEI | CASP authorization (regulator, date) | Cost model | Notable (neutral facts) |
|---|---|---|---|---|---|
| **Bitvavo** | Bitvavo B.V. | 724500MX2WBKDJP9HE56 | ✅ AFM, Netherlands (26 Jun 2025) | Maker/taker from 0.15% / 0.25% (entry tier) | NL-based; operates a trading platform |
| **Finst** | Finst B.V. | 724500UI8UD7HKGVJX65 | ✅ AFM, Netherlands (24 Jul 2025) | Flat 0.15% per trade, no spread markup | NL-based, ex-DEGIRO founders. **Scoped as a brokerage (execution + RTO), not an order-book "trading platform"** — still a fully authorised CASP; avoid calling it an "exchange" specifically. |
| **Kraken** | Payward Europe Solutions Limited | 254900641D8KNHUZYX24 | ✅ Central Bank of Ireland (25 Jun 2025) | Kraken Pro maker/taker from 0.40% / 0.80% (entry tier) | Full exchange scope. Ireland, not Luxembourg. (A separate *Payward Global Solutions Ltd* also exists — the retail exchange is *Europe Solutions*.) |
| **Coinbase** | Coinbase Luxembourg S.A. | 984500F14CA4571AAC11 | ✅ CSSF, Luxembourg (20 Jun 2025) | Advanced Trade from 0.40% / 0.60%; simple/instant buys ~1.49% + fee ⚠️verify | Full exchange scope. **CASP holder is Coinbase Luxembourg S.A. — NOT "Coinbase Europe Limited" (a pre-MiCA DASP registration).** |
| **Bitpanda** | Bitpanda GmbH | 5493007WZ7IFULIL8G21 | ✅ FMA, Austria (9 Apr 2025) | Standard buys ~1.49% spread; Fusion pro tier from ~0.25% ⚠️verify | Full exchange scope. (Distinct from *Bitpanda Asset Management GmbH* / BaFin and *BP23 CA Ltd* / MFSA — the exchange is *Bitpanda GmbH*, FMA.) |
| **Bitstamp** | Bitstamp Europe S.A. | 549300XIBGTJ0PLIEO72 | ✅ CSSF, Luxembourg (15 May 2025) | Maker/taker from 0.30% / 0.40% (entry tier) ⚠️verify | Operates a trading platform; long-established EU exchange |

**Mandatory crypto banner above this section (always visible):**
> ⚠️ *Crypto is high-risk — prices are extremely volatile and you can lose your entire investment. There is generally no investor-compensation scheme. Only ever use MiCA-licensed platforms, and never invest more than you can afford to lose.*

No coin recommendations. No "top coins." No price talk. Exchanges only, framed as *where* regulated trading happens — not *what* to buy.

---

## Data-maintenance checklist (before publish + quarterly)

- [x] Re-verify every crypto exchange against the ESMA CASP register; remove any that lost/lack authorization. *(All 6 confirmed 2026-07-09.)*
- [~] Re-check every **exact fee %** against the provider's live pricing page. *(Done 2026-07-09 for Bitvavo, Finst, Kraken, Peaks + all 5 brokers from official pages. Still open: Coinbase, Bitpanda, Bitstamp — official pages blocked automated fetch, confirm in a browser.)*
- [x] Confirm each broker's current NL availability and regulator. *(Done 2026-07-09; Peaks confirmed still operating.)*
- [ ] Confirm affiliate disclosure is visible and the ordering criterion is neutral and disclosed. *(App wiring pending — affiliate links not live yet.)*
- [ ] Confirm the table is identical for all users (not filtered by quiz result). *(Verify at implementation.)*

## How this plugs into the app (per the plan)

- Lives on the archetype **result screen** and in Lesson 5 / the crypto capstone — but as "here's the landscape, shown to everyone," with the persona text kept purely descriptive beside it.
- This is the primary **affiliate revenue** surface. Two streams to instrument: broker signups and MiCA-licensed crypto-exchange signups (crypto referral often pays more — confirm real EU rates in Phase 2).
