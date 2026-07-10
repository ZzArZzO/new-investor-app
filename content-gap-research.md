# Content Gap Research — what to teach next
*Drafted: 2026-07-10 · Research doc · Not deployed (`*.md` excluded via `.vercelignore`)*

> **Status: top 5 implemented (2026-07-10).** Two new tracks in
> `app/src/content/lessons.ts`: 🛡️ Protections & traps (l23 KID/factsheet, l24 broker-bust
> protections, l25 CFD/leverage — all free) and 🏛️ Taxes & pensions (l26 EU tax four
> questions, l27 three pillars + PEPP — both Plus). Plus 13 new glossary terms and 6 daily
> cards. Items 6–15 remain the second-wave backlog.
>
> **Wave 2 partial (2026-07-10):** items 6 (currency risk, Plus, 📈 Investing), 7
> (bear-market drill, free, 🧠 Brain & money) and 8 (finfluencer/copy-trading machinery,
> free, 🛡️ Protections & traps) implemented — plus crypto deep-dive completion (hot/cold
> transfers, PoW/PoS, stablecoins/MiCA/digital euro). Curriculum declared **v1 done at 33
> lessons / 11 tracks**; items 9–15 stay backlog until post-launch gate data justifies more.
>
> **Wave 3 — fresh external validation (2026-07-10).** Three parallel research passes
> (~100 sources: general beginner-investor behavior data, EU regulator/forum data,
> crypto-specific data) stress-tested this doc's own backlog and found: item 12 gets
> the strongest fresh evidentiary support of any backlog item (see note at item 12
> below); items 9, 10, 11, 13, 14, 15 unchanged; and ~25 genuinely new gaps not
> previously listed here. MiCA-transition language in `compliance-one-pager.md` was
> checked — already correct, no stale-content fix needed. Full findings, tables, and
> a "Wave 3 top 6" pick list: see `## Wave 3 — fresh external validation` below.
>
> **Wave 3 top 6 shipped (2026-07-10).** All 6 lessons in `app/src/content/lessons.ts`
> (l34–l39, all free): exchange-failure/MiCA segregation and wallet-drainer/seed-phrase
> hygiene (crypto deep-dive); first-order mechanics and choice-overload/capital-anchoring
> (investing); broker-switching mechanics and investor rights + FIN-NET, i.e. the
> reprioritized item 12 (protections & traps). Curriculum now **39 lessons / 11 tracks**.
> Lint, typecheck, and full test suite (124 tests) pass.
>
> **Wave 4 — readiness + Bitcoin audit, shipped (2026-07-10).** Verified the 39-lesson
> curriculum + 6-step action checklist against every major "ready to invest" checklist
> (Investor.gov, Schwab, Vanguard, FCA) — substantively sufficient, no structural hole.
> Three small fold-in fixes shipped (no new lessons needed for these): brokerage-account
> 2FA callout added to the action checklist's "Open an account" step; a %-of-income
> bridge paragraph added to "Finding your first €100" (l11); a first-year numeric
> expectation ("−15% to +25% is normal") added to "Surviving your first crash" (l31).
> Plus one new standalone lesson: **l40 "Bitcoin, specifically"** (₿ Crypto deep-dive,
> free) — Bitcoin-vs-altcoin allocation, EU Bitcoin ETPs via a normal MiFID broker
> (and why US spot Bitcoin ETFs aren't EU-accessible), and the digital-gold narrative
> told honestly. Curriculum now **40 lessons / 11 tracks**. Lint, typecheck, and full
> test suite (124 tests) pass.

Gap analysis of the 22-lesson curriculum vs competitor curricula (Finelo, Investmate, Zogo,
Bloom, Khan Academy, Morningstar, iShares/Vanguard), the EU/OECD-INFE Financial Competence
Framework for Adults (2022), Eurobarometer FL525, and beginner-demand signals
(r/eupersonalfinance, CFA Gen-Z research, 2025 search data).

## Where we're strong vs blind

**Strong (beat most competitors):** behavioral finance, scam literacy, crypto (honest),
FIRE, budgeting.

**Systematic blind spots** (near-zero coverage of two OECD framework areas):
1. **"Financial landscape"** — taxes, consumer protection, investor rights, regulation
2. **"Risk & reward" safety nets** — insurance, compensation schemes
3. EU practical mechanics — fund documents, domicile, currency
4. Macro context — rates, ECB, bonds

## Top 5 to build first

| # | Lesson | Why | Persona | Tier | Compliance |
|---|---|---|---|---|---|
| 1 | **EU investment taxes basics** (capital gains vs withholding, why UCITS ETFs are Irish-domiciled, acc vs dist per-country differences) | #1 recurring r/eupersonalfinance theme; zero gamified competitor covers it | Autopilot + Explorer | **Premium** | HIGH — generic only, "not tax advice" banner, never compute liability |
| 2 | **Reading the label: UCITS, PRIIPs KID, factsheet** (risk indicator 1–7, cost scenarios, TER, replication, acc/dist) | Uniquely EU, legally handed to every investor, nobody teaches decoding it; reinforces compliance-first brand | Starter + Autopilot | **Free** | LOW — teaches mandated disclosures |
| 3 | **"What if my broker goes bust?"** (asset segregation, €20k ICS vs €100k DGS, what's NOT covered) | Top blocker anxiety for EU beginners; monetizes our CASP/register diligence pedagogically | **Careful Starter** (their #1 lesson) | **Free** — conversion lesson | LOW |
| 4 | **Leverage kills: CFDs & margin** (ESMA data: 74–89% of retail CFD accounts lose; binary options ban; why the warning exists) | Serves Thrill Chaser safely; regulator-alignment story; anti-Investmate positioning | **Thrill Chaser** | **Free** — never paywall safety | VERY LOW — repeats regulator warnings |
| 5 | **EU pensions: 3 pillars + PEPP** (state/occupational/personal generically, pension gap, PEPP wrapper) | Explicit OECD retirement topic; only ~27% of EU citizens hold pillar-3 product; EIOPA actively campaigning | Autopilot + Starter | **Premium** (pairs with FIRE) | MED — generic, no PEPP provider naming |

## Second wave (6–15)

6. **Currency risk** — world ETF is ~60–70% USD; EUR-hedged vs unhedged trade-offs (Premium, Explorer)
7. **Surviving your first crash — bear-market drill** (applied scenario; April 2025 crash minted a drawdown generation; best push-notification moment later) (Free, Starter)
8. **Finfluencers & copy trading mechanics** — ESMA 2024 social-media/MAR warning, how to check a licence, disclosure rules (Free, Thrill Chaser)
9. **Rates, ECB, bonds** — worst-answered Eurobarometer knowledge item; fills macro void (Premium, Explorer)
10. **ESG/SFDR + greenwashing** — Article 6/8/9 labels, what ESG ratings don't measure; horizontal OECD dimension (Premium, Explorer; MED compliance — labels in flux)
11. **Financial statements 101** — biggest competitor block we lack (Finelo/Bloom/Morningstar all teach it); channels stock-picking urges into method; fictional companies only (Premium, Explorer + Thrill Chaser)
12. **Your rights as an EU investor** — why the MiFID appropriateness quiz exists, complaints → ombudsman → NCA (Free, Starter). **Wave 3 reprioritization: move this up.** ESMA's Mar 2026 Retail Investor Journey report, BaFin's 2025 complaint stats, and FIN-NET (the actual EU cross-border complaint mechanism, name it explicitly rather than "generic ombudsman") all converge on this being live and regulator-validated right now — strongest fresh support of any backlog item.
13. **Insurance & safety nets** — named OECD topic missing between emergency fund and budgeting (Premium; MED compliance, stay conceptual)
14. **Big-goal saving: house deposit vs investing, horizon buckets** — constant beginner question "need it in 4 years, ETFs?" (Premium, Autopilot)
15. **Money market funds & cash yield** — MMF vs savings vs broker interest, DGS coverage differences (Premium, Starter + Autopilot)

## Wave 3 — fresh external validation (2026-07-10)

Three parallel research passes (general beginner-investor psychology/behavior, EU regulatory/
forum data, crypto-specific data — ~100 sources) checked this doc's backlog against fresh
external evidence. Backlog reprioritization noted inline at item 12 above. Below: gaps found
that aren't in items 1–15 at all.

**General investing mechanics/psychology** (biggest single finding: 56% of Gen Z who want to
invest never start — not fear, not money, literally not knowing the first concrete step —
WallStreetZen survey):
- How to actually place a first order (market vs. limit, why limit matters pre-open) — Free
- What happens after you click buy (T+1 settlement, why cash isn't withdrawable instantly) — Free
- Choice-overload / how to pick just one fund (742,000+ products exist vs. ~30,000 in 2002;
  Barclays 2025: 38% of UK first-timers rank "deciding how to invest" among life's hardest
  decisions) — Free
- Capital-needed anchoring correction (UK respondents estimate ~£41,354 needed to start —
  ~40x reality, Wealthfront/Barclays) — Free
- Saving vs. investing vocabulary confusion (foundational, likely upstream of everything) — Free
- "Low share price ≠ cheap/good value" (distinct valuation-logic error, not a scam pattern) — Free
- How often to check your portfolio (quarterly not daily cuts perceived-loss frequency from
  25% to 12% — CNBC Select, myopic loss aversion) — Free
- Choosing a broker/account type as an upstream decision (DIY vs robo vs advisor) — Free/light

**EU-specific (regulatory/structural)**:
- Broker/depot switching mechanics — BaFin's #1 documented 2025 complaint category (Germany,
  largest EU neobroker market); transfers stalling months, missing cost-basis data — Free
- EU Savings and Investment Accounts (EU-SIA) — brand-new EU Commission recommendation,
  30 Sept 2025, tax-advantaged/provider-neutral/portable, pushed to all member states through
  2027 — timely policy hook, Free
- Withholding-tax reclaim + FASTER Directive (EU 2025/50) — BaFin #2/#3 complaint category — Premium
- Trading-app gamification / dark patterns — ESMA's active 2025–2026 supervisory priority on
  neobroker gamification (streaks, nudges, leaderboards driving riskier trading). Genuine
  differentiation opportunity, not just a gap: teaching users to spot dark patterns *in apps
  like this one* is unusually honest and on-brand — see `subscription-plan.md` hard rule 6 — Free
- Moving country — portfolio/broker/tax mechanics (real EU-wide question given free movement;
  concrete sell-before-vs-after-residency-change timing trap) — Premium
- "TER isn't the real cost" (FX conversion, tracking difference, securities-lending rebates
  invisible beyond headline TER — ESMA 2025/2026 reports) — glossary-scale, lower priority

**Crypto-specific**:
- What happens if your exchange fails (FTX: $8B lost, 2+ year bankruptcy claims; crypto isn't
  deposit-insured; MiCA requires CASP asset segregation — concrete, honest "why licensed
  matters" story) — Free
- Gas fees (practical trip-up, currently absent) — Free
- Wallet-approval drainer scams (mechanically distinct from phishing; 320,000+ victims, ~$300M
  drained 2023; impersonation-scam inflows up ~1400% YoY, Chainalysis 2026) — Free
- Seed-phrase hygiene checklist (screenshots/cloud storage/no tested recovery — practical
  companion to the existing conceptual self-custody lesson) — Free
- Staking risks (slashing, lock-ups, principal volatility still applies — honesty gap vs.
  "safe yield" marketing) — Free
- Rug pulls vs. pump-and-dumps (named, distinguishable patterns; 74,037 suspected
  pump-and-dump tokens launched in 2024 alone — Chainalysis) — Free
- Fake airdrops (compact, overlaps with drainer-scam content) — Free
- EU crypto tax — shape of the problem + DAC8 (55% of crypto owners don't realize gains are
  taxed like other investments; new EU-wide CASP tax-reporting rule, Jan 2026) — Premium
- NFT ownership clarification — fold into an existing scam card, not a standalone lesson
- DeFi / liquidity pools / impermanent loss — **recommend not building**; the math is
  genuinely harder than anything else in the curriculum, would need a sub-curriculum to teach
  honestly, out of scope for beginner-first

### Wave 3 top 6 (mirrors how the original top 5 was picked)

| # | Lesson | Why | Tier |
|---|---|---|---|
| 1 | What happens if your exchange fails | Ties custody + regulation + realistic expectations together; strongest single new gap | Free |
| 2 | How to place your first order + what happens after | Targets the single largest evidenced blocker (56% of interested Gen Z don't know the first step) | Free |
| 3 | Broker/depot switching mechanics | BaFin's #1 complaint category; nothing like it in the current 33 lessons | Free |
| 4 | Wallet-approval drainer scams + seed-phrase hygiene | Matches hard rule "scam/safety content never paywalled"; large, growing loss numbers | Free |
| 5 | Choice overload / picking one fund + capital-anchoring correction | Counters the two most-cited misconceptions directly (742,000 products, £41k anchor) | Free |
| 6 | Investor rights / complaints + FIN-NET (= reprioritized item 12) | Freshest regulator evidence of any single topic across all three research passes | Free |

Notable: every Wave 3 top pick is Free — this wave skews toward trust/safety/first-step
content, consistent with the project's free/premium logic (safety and onboarding stay free,
depth is the premium lever). Premium-worthy finds (withholding-tax/FASTER, moving-country
mechanics, EU crypto tax/DAC8) are real but second-tier by evidence strength.

Highest-confidence Wave 3 sources: ESMA Report on the Retail Investor Journey (Mar 2026),
BaFin 2025 annual complaint statistics, EU Commission EU-SIA Recommendation (Sept 2025),
Barclays "Investing Paralysis" survey (2025), NerdWallet crypto-misconceptions survey,
Chainalysis 2026 Crypto Crime Report, ESMA public statement on MiCA transition end (1 Jul 2026).

## Strategic notes

- Free/premium logic held throughout: **safety and trust content free** (2, 3, 4, 7, 8, 12), **depth premium** (1, 5, 6, 9–11, 13–15)
- Top 5 all close the OECD "financial landscape" + "risk & reward" gaps — fastest route to full framework coverage (worth citing on a methodology page later)
- Item 4 (CFD warning) + item 8 (finfluencer mechanics) complete the Thrill Chaser persona story started in persona-research.md
- Item 1 (taxes) is the EU-generic version of the deferred per-country tax tracks — teaches the concepts that exist everywhere, country packs remain the localization play (phase-gate metric #7)

Key sources: OECD/EC Financial Competence Framework for Adults · Eurobarometer FL525 ·
ESMA CFD intervention data + social-media recommendations warning · EC investor-compensation
& DGS pages · EIOPA PEPP reform · CFA Institute Gen Z & Investing · competitor curricula
(Finelo, Investmate, Zogo, Bloom, Khan, Morningstar). Full URLs in research transcript.
