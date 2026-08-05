# IonQ (IONQ) — Company Analysis

> **What this is:** internal research on a single company, same format as `amd-analysis.md`. Honest, sourced, no price targets, no recommendation.
>
> **What this is not:** advice, and definitely not app content — see the compliance note at the end. IonQ is a pre-commercial, highly speculative stock; publishing anything resembling a view on it would breach the guardrails in `compliance-one-pager.md` more clearly than AMD would.
>
> **Status: Q2 2026 results are OUT and the call is done** (released after the close, call 4:30pm ET, 5 Aug 2026). Actuals and post-call read are in §0 below. Sections 1–6 were written pre-print and are preserved as the *setup*.

---

## 0. Q2 2026 — ACTUAL RESULTS (released 5 Aug 2026, after close)

| Metric | Actual | Bar | Verdict |
|---|---|---|---|
| Revenue | **$80.1m, +287% YoY** | $65–68m guided | ✅ **Big beat** — ~$13m above the midpoint |
| Adjusted EPS | **($0.33)** | ($0.35) est | ✅ Beat |
| Adjusted EBITDA | **($120.3m)** | — | ⚠️ Worse than Q1's ($96.8m) |
| Cash + investments | **$3.0bn** (30 Jun) → **~$2.0bn pro-forma** post-SkyWater cash | $3.1bn prior | ⚠️ ~$1bn out the door |
| Remaining performance obligations | **+297% YoY** | — | ✅ Strong forward book |
| FY2026 revenue guide | **$280–290m** (from $260–270m) | — | ✅ Raised **$20m** |
| FY2026 adj. EBITDA guide | **($310–330m)** | ($310–330m) | ➖ Unchanged |
| After-hours move | **+0.93% to $40.30** | — | ➖ Flat, after **+8.63% into the print** |

Revenue mix disclosed: international ~50%, commercial ~60%, multi-product ~25% of the quarter. CEO Niccolò de Masi called it the fifth consecutive record quarter. A second acquisition, **Nexus**, also closed alongside SkyWater.

### The number that doesn't add up — and it's the important one

**The FY2026 guide was raised by exactly $20m. SkyWater does ~$442m a year.**

Consolidated from 31 July, SkyWater should contribute roughly **five months of a ~$110m-per-quarter business — on the order of $180m** to 2026 revenue. The guide went up $20m. Meanwhile Q2 alone beat its own guided midpoint by ~$13.6m.

**So the raise is approximately just the Q2 beat flowing through.** Secondary reporting is asserting that the new $280–290m range "reflects the inclusion of SkyWater's expected contribution." That is very hard to reconcile with the arithmetic. Two readings, and they point in opposite directions:

- **(a) The guide still excludes SkyWater** (most consistent with the numbers). Then consolidated FY2026 revenue will land far above the guide — plausibly **$450m+** — and anyone modelling off $280–290m is materially wrong in the bullish direction. It would also mean IonQ chose *not* to inflate its headline with acquired revenue, which is to its credit.
- **(b) The guide includes SkyWater.** Then SkyWater is being recognised at roughly **$20m against a ~$180m run-rate expectation** — which would demand an explanation (purchase-accounting write-down of acquired deferred revenue, intercompany elimination, or genuinely weak foundry utilisation).

**This is unresolved and it is the single most important thing to verify** — the primary release and the 10-Q are the source of truth, and the release page is not yet retrievable. Do not model off the $280–290m figure until it's clear which basis it's on. *(This is the same class of ambiguity as AMD's GAAP-vs-non-GAAP margin line yesterday, which resolved benignly once the primary source was available. Flagging beats assuming.)*

### A second thing worth catching: the implied H2 burn

FY adjusted EBITDA guidance was left **unchanged at ($310–330m)**. But H1 actual burn is already **($217.1m)** — Q1's ($96.8m) plus Q2's ($120.3m). That leaves only **($93–113m) for the whole of H2**, implying roughly **$47–57m per quarter against Q2's $120m — a halving of the burn rate.**

Management's stated bridge is that SkyWater's positive EBITDA (12% margin in FY2025) offsets accelerating research spend. That may well work. But it is a significant implicit assumption sitting inside an unchanged-looking guidance line, and it deserves more scrutiny than "guidance reaffirmed" implies.

### Technology and the reaction

- **256-qubit system:** first engineering prototype **on track for demonstration by end of 2026** — the near-term proof point identified in §6, reaffirmed rather than slipped. Note that at least one outside analysis argues IonQ's stated 2026 capacity and 256-qubit timeline don't fully reconcile across calls; worth tracking, not yet a demonstrated problem.
- **The muted reaction is the story.** A 287% revenue beat, a raise, and a strong RPO book produced **+0.93% after hours**. The stock had already run **+8.63% into the print**, so the move happened *before* the news.
- **The ~23% short interest did not squeeze.** Either shorts covered into the pre-print rally, or a beat of this size simply wasn't enough to force them. The asymmetric-squeeze risk flagged in §6 did not materialise on this catalyst.

**Net read:** operationally this was a genuinely strong quarter — the beat is real, the forward book grew, the technical milestone held, and the balance sheet is still formidable at ~$2bn pro-forma. But the two numbers that most affect how you'd value the company — what the FY guide actually contains, and how the burn halves in H2 — are both less clear after this print than the headlines suggest. **Same pattern as AMD the day before: strong results, flat-to-negative reaction, because the good news was already in the price.**

---

## 1. Snapshot

| | |
|---|---|
| Ticker | IONQ (NYSE) |
| Share price | **$38.85** (close, Mon 3 Aug 2026, **+6.6%**) |
| Shares outstanding | **373.3m — up ~45% year-over-year** |
| Market cap | **≈ $14.5bn** |
| 2026 high | **$72.07** (29 May 2026) — currently **~46% below it** |
| Recent low | ~$32.86 (late July) |
| Beta | **3.23** |
| FY2025 revenue | $130.0m (+202%) |
| FY2025 net loss | **($510.4m)**, EPS ($1.82) |
| FY2026 revenue guidance | **$260–270m** (raised from $225–245m) |
| FY2026 adj. EBITDA guidance | **loss of $310–330m** |
| Cash + investments | **$3.1bn** |
| Price / 2026E sales | **~55×** |
| Short interest | **~22.8% of float** (Feb 2026 reading) |

Monday's +6.6% came from two things: a Wedbush *outperform* initiation, and the **closing of the SkyWater acquisition on 31 July**.

---

## 2. What IonQ actually is

A trapped-ion quantum computing company — and, as of four days ago, **also a semiconductor foundry**. That second part is new and it changes how every number below should be read.

The core business is still pre-commercial in the meaningful sense: revenue comes from government contracts, research partnerships, and system sales to national labs and enterprises running pilots, not from a product that customers buy because it does economically useful work better than a classical computer. That threshold — "quantum advantage" on a commercially valuable problem — has not been crossed by anyone.

**Technology position (genuinely a leader, this isn't hype):**
- **Oxford Ionics** (acquired 2025) uses *electronic* qubit control rather than lasers, and has demonstrated **99.97% two-qubit gate fidelity** — among the best disclosed in the industry. Its 2D ion-trap design claims up to 300× higher trap density than 1D approaches.
- A **256-qubit processor targeted for 2026** at 99.99% fidelity, underpinning a roadmap to millions of qubits by 2030.
- **Tempo** — first IonQ system using barium ions, giving better gate/readout error rates and letting them use visible-light lasers instead of UV.

Fidelity is the right metric to care about, and IonQ's is excellent. The open question is whether trapped ions can be *scaled* — they're slower than superconducting qubits, and nobody has demonstrated the interconnect density required for millions of them.

---

## 3. The numbers, honestly read

### Q1 2026 (most recent actual)
- Revenue **$64.7m**, +755% YoY (from $7.6m), ~30% above guidance midpoint
- **GAAP net income $805.4m, EPS $2.19** ← **this is an accounting artifact, not profit**
- **Operating loss ($271.5m)**
- Adjusted EBITDA **($96.8m)**, including ~$85m of SkyWater-related costs
- Cash + investments **$3.1bn**

**The single most important thing to understand about IonQ's reported numbers:** that $805m "profit" came from a **$1.06bn non-cash gain on warrant liabilities** — a mark-to-market swing on financial instruments, not a dollar of business performance. Warrant liabilities are marked *up* when the stock rises and *down* when it falls, so they manufacture GAAP losses in good quarters and GAAP profits in bad ones. **The operating loss of $271.5m is the real number.** Any headline tomorrow leading with GAAP EPS is close to meaningless in either direction.

### The dilution
Shares outstanding are up **~45% year-over-year** to 373.3m, on top of a 34% increase the year before. IonQ has funded itself through at-the-market equity programmes and stock-funded acquisitions. The $3.1bn cash pile is real and covers roughly a decade at the current ~$320m annual EBITDA burn — but existing shareholders paid for it by owning a steadily smaller fraction of the company. **Cash runway is not a risk here; dilution is the mechanism by which it stopped being one.**

### SkyWater changes the shape of the company
Closed **31 July 2026** — i.e. *after* the June quarter, so tomorrow's Q2 is clean, but everything after it is not comparable.

| | IonQ standalone (2026E) | SkyWater (FY2025 actual) |
|---|---|---|
| Revenue | $260–270m | **$442.1m** (+29%) |
| Gross margin | quantum-systems economics | **20.7% non-GAAP** |
| Adj. EBITDA margin | deeply negative | **+12%** |

Read that table twice. **From Q3, the majority of IonQ's revenue will come from a low-margin contract semiconductor foundry.** The combined company is a ~$700m+ revenue business whose largest segment carries ~21% gross margins and is cyclical, capital-intensive, and has nothing to do with quantum advantage.

The strategic logic is real — owning fabrication and packaging is claimed to accelerate the 2-million-qubit architecture by up to a year through faster wafer iteration. Vertical integration in a physics-limited field is a defensible idea. But the *financial* consequence is that "IonQ revenue growth" and "IonQ price/sales" become much weaker signals than they were last quarter, and consolidated gross margin will fall sharply for reasons that say nothing about the quantum business.

---

## 4. The bull case

1. **Best-in-class fidelity, and fidelity is what matters.** 99.97% two-qubit gates is a real, verifiable technical lead, not a press release. Error rates — not qubit counts — are the binding constraint on useful quantum computing.
2. **$3.1bn in cash.** In a sector where most competitors are one funding round from irrelevance, IonQ can fund a decade of research through whatever winter comes. That is a genuine strategic asset.
3. **Vertical integration is a differentiated bet.** Nobody else in quantum owns a US foundry. If the constraint on progress really is wafer iteration speed, IonQ just bought a structural advantage — and a trusted-US-supply-chain story that plays well with government customers.
4. **Government tailwind.** The stock's May high followed a **$2.013bn US quantum funding announcement**. Sovereign quantum programmes are expanding globally, and IonQ is a prime domestic beneficiary.
5. **Revenue is growing fast and guidance has been raised.** $130m → $260–270m guided, with management calling >100% of it organic. Beat-and-raise is the recent pattern.
6. **~23% short interest.** Structurally squeeze-prone. Bad news for anyone positioned against it on a good print.

---

## 5. The bear case

1. **~55× 2026E sales for a company with a $271m quarterly operating loss.** Even granting the technology lead, that multiple prices in a commercial outcome that does not yet exist and has no agreed timeline.
2. **The GAAP numbers obscure rather than reveal.** A business whose reported "net income" is dominated by warrant marks is one where most retail participants are trading a number that doesn't mean what they think. That cuts both ways and adds volatility for non-fundamental reasons.
3. **~45% annual dilution.** Revenue per share is growing far more slowly than revenue. If you're underwriting "revenue doubles," check what the share count does over the same period.
4. **Acquisitive growth dressed as organic growth.** Oxford Ionics, SkyWater, and others mean year-over-year comparisons flatter. The +755% Q1 figure is arithmetically true and analytically close to useless.
5. **SkyWater dilutes the story as well as the margins.** A 21%-gross-margin foundry inside a 55×-sales quantum narrative is a valuation mismatch waiting to be re-rated. It also imports semiconductor cyclicality and capex into a balance sheet that was previously clean.
6. **Competition is formidable and better capitalised.** IBM targets error-corrected prototypes on a similar timeline; Quantinuum (Honeywell-backed) is the direct trapped-ion rival and arguably ahead on logical qubits; Google has demonstrated error correction at scale. **IQM listed on Nasdaq in July 2026**, adding another way for capital to express the same theme — which is part of why the sector de-rated.
7. **Beta of 3.23.** This isn't a stock, it's a leveraged bet on risk appetite. It fell ~39% in a month during a sector drawdown that had nothing to do with IonQ's own results.
8. **No commercial quantum advantage exists yet — from anyone.** Every valuation in this sector rests on a scientific milestone that has never been achieved. That is a different category of risk from AMD's "will the ramp be on time."

---

## 6. The Q2 print — setup

**Wed 5 Aug 2026, after close. Call 4:30pm ET.**

| Metric | Company guide | Consensus |
|---|---|---|
| Revenue | $65–68m | **~$66.7m** |
| EPS | — | **~($0.29)** |
| FY2026 revenue | $260–270m | (pre-SkyWater) |
| FY2026 adj. EBITDA | ($310–330m) loss | — |

### What actually matters tomorrow

1. **The re-guide, not the quarter.** Q2 ended before SkyWater closed, so the quarter itself is a formality against a narrow guided range. **The event is whether management re-guides FY2026 to include SkyWater** — and how they frame it. A headline like "FY revenue raised to $450m+" would be arithmetic, not performance. Watch whether they segment it clearly or let the blended number do promotional work.
2. **Consolidated gross margin, and whether they break out segments.** If quantum and foundry are reported together, comparability is gone. Clean segment disclosure would be a genuine mark of good faith; a single blended margin line would be a small red flag.
3. **Cash burn including SkyWater.** $3.1bn less ~$800m cash consideration for SkyWater, plus foundry capex. The runway story is still strong, but it's shorter than it was, and capital intensity just went up.
4. **256-qubit / Oxford Ionics milestone timing.** The 2026 target is the near-term technical proof point. Any slip matters far more than a revenue miss.
5. **Further ATM issuance.** Any signal of continued at-the-market selling at these levels.
6. **Adjusted EBITDA vs the ($310–330m) FY guide** — the honest measure of the burn.

### Reaction dynamics

- **~22.8% short interest** with ~3–4 days to cover. Any positive surprise into that positioning can move violently upward.
- **Beta 3.23** and a ~46% drawdown from the May peak. Sentiment is fragile but positioning is not one-sided the way AMD's is.
- The sector — IonQ, Rigetti, D-Wave — fell ~30% in a month on valuation reassessment and the IQM listing. Tomorrow's print will be read as a **sector** datapoint, not just a company one.

---

## 7. Honest summary

IonQ has the best disclosed gate fidelities in the industry, $3.1bn in the bank, and has just made a genuinely differentiated bet by buying its own foundry. As a *research organisation* with a decade of funded runway, it is arguably the best-positioned public pure-play in quantum.

As a *stock*, it trades at ~55× forward sales against a $271m quarterly operating loss, has diluted holders ~45% in a year, reports GAAP earnings dominated by warrant marks that mean nothing, and has just bolted on a 21%-gross-margin foundry that will make its consolidated financials materially harder to read. And the entire sector's valuation rests on a scientific milestone — commercially useful quantum advantage — that no company on earth has yet demonstrated.

**The distinction that matters:** with AMD you're underwriting *execution* on a product with signed customers and known demand. With IonQ you're underwriting *whether the science arrives on a timeline that justifies the price*. Those are not the same kind of risk, and the second one does not resolve on any single earnings date.

---

## Compliance note

Internal research only. This must not become app content in any form. Beyond the MiFID II generic/personal line covered in `compliance-one-pager.md`, a pre-revenue-thesis speculative stock is precisely the category Lesson 4 warns beginners away from ("chasing hot stocks"), and Lesson 8's "only invest what you can afford to lose" framing exists for exactly this risk profile. There is no compliant way to publish a view on IONQ in the product.

*Educational information, not personal financial advice. Investing involves risk, including loss of capital.*

---

## Sources

- [IonQ Q1 2026 results](https://www.ionq.com/news/ionq-announces-first-quarter-2026-financial-results) · [Q1 detail — The Quantum Insider](https://thequantuminsider.com/2026/05/06/ionq-reports-64-7-million-q1-2026-revenue-fueled-by-quantum-contracts-and-system-sales/) · [Q1 slides and raised guidance — Investing.com](https://www.investing.com/news/company-news/ionq-q1-2026-slides-755-revenue-surge-guidance-raised-to-270m-93CH-4666033)
- [IonQ FY2025 results](https://investors.ionq.com/news/news-details/2026/IonQ-Announces-Fourth-Quarter-and-Full-Year-2025-Financial-Results/default.aspx)
- [Q2 2026 earnings date, 5 Aug](https://www.stocktitan.net/news/IONQ/ion-q-to-report-second-quarter-2026-financial-results-on-august-5-gyqq3q1cat9p.html)
- [SkyWater acquisition terms — Quantum Computing Report](https://quantumcomputingreport.com/ionq-to-acquire-skywater-technology-in-1-8-billion-vertical-integration-transaction/) · [Deal close, 31 Jul](https://quantumcomputingreport.com/ionq-completes-acquisition-of-skywater-technology-establishing-vertically-integrated-quantum-platform/) · [Analysis: is vertical integration the path? — Futurum](https://futurumgroup.com/insights/ionq-buys-a-foundry-is-vertical-integration-the-path-to-fault-tolerant-quantum/)
- [SkyWater FY2025 results — $442.1m revenue, 20.7% non-GAAP GM](https://ir.skywatertechnology.com/news/news-details/2026/SkyWater-Technology-Reports-Fourth-Quarter-and-Full-Fiscal-Year-2025-Results/default.aspx)
- [Oxford Ionics tech and roadmap — Quantum Computing Report](https://quantumcomputingreport.com/ionq-announces-regulatory-approval-for-oxford-ionics-acquisition-and-provides-a-roadmap-update-at-its-2025-analyst-day-meeting/) · [IonQ roadmap](https://www.ionq.com/roadmap)
- [Quantum sector drawdown ~30% in a month — 24/7 Wall St](https://247wallst.com/investing/2026/07/29/ionq-rigetti-and-d-wave-quantum-are-down-30-in-a-month-is-more-pain-coming-for-quantum-computing-stocks/) · [IonQ decline drivers, IQM listing — StockStory](https://stockstory.org/us/stocks/nyse/ionq/news/why-up-down/why-ionq-ionq-stock-is-nosediving)
- [3 Aug close $38.85, +6.6%](https://www.gurufocus.com/news/8999924/a-look-at-ionq-inc-ionq-after-66-gain-gf-value-8994-vs-price-3885) · [Monday catalysts — Benzinga](https://www.benzinga.com/trading-ideas/movers/26/08/60881018/ionq-stock-is-soaring-monday-whats-going-on)
- [Short interest ~22.8% of float](https://www.sahmcapital.com/news/content/peering-into-ionq-incs-recent-short-interest-2026-02-04)

- [IonQ Q2 2026 results — record revenue +287% YoY](https://www.ionq.com/news/ionq-announces-record-second-quarter-2026-revenues-growing-287-yoy) · [Q2 double beat, raised outlook — Benzinga](https://www.benzinga.com/markets/earnings/26/08/60973145/ionq-posts-q2-double-beat-raises-2026-outlook-shares-rise) · [Deal close and guidance raise — StockTitan](https://www.stocktitan.net/news/IONQ/ion-q-announces-record-second-quarter-2026-revenues-growing-287-yo-gednl3gory6k.html) · [Capacity vs 256-qubit timeline scepticism](https://www.ainvest.com/news/ionq-2026-capacity-256-qubit-timeline-don-match-earnings-calls-2605/)

*Setup compiled 4 August 2026. **Actuals and post-call read added 5 August 2026, ~6:00pm ET.** Pre-print prices are as of the 3 Aug close.*
