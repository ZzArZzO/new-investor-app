# Rigetti Computing (RGTI) — Company Analysis

> **What this is:** internal research on a single company, same format as `amd-analysis.md` and `ionq-analysis.md`. Honest, sourced, no price targets, no recommendation.
>
> **What this is not:** advice, and not app content — see the compliance note at the end. Rigetti is a pre-commercial, highly speculative stock and sits squarely in the category our own curriculum warns beginners away from.
>
> **Status:** Q2 2026 results released after the close on **Thursday 6 August 2026**, call at 5:00pm ET. Both are done. Written up same evening.

---

## 1. Snapshot

| | |
|---|---|
| Ticker | RGTI (Nasdaq) |
| Share price (pre-print) | **~$14.95** |
| Market cap | **~$5.0bn** |
| Q2 2026 revenue | **$5.14m** |
| Implied valuation | **~250× sales** |
| Cash (30 Jun 2026) | **$541.3m**, no debt |
| Quarterly burn | **~$27.7m** |
| Implied runway | **~19 quarters (~5 years)** |
| CEO | Dr. Subodh Kulkarni |
| Options-implied earnings move | ~12% |
| Actual reaction | **−4% initially, stayed lower through the call** |

**The number that frames everything: ~$5.0bn of market value against ~$5m of quarterly revenue.** That is roughly **250× sales** — about five times more extreme than IonQ's ~55×, which was already demanding. Rigetti's own long-range narrative reaches ~$78m of revenue by 2029; even on that ambition you are paying ~64× revenue four years out.

---

## 2. Q2 2026 — actual results

| Metric | Actual | Consensus | Verdict |
|---|---|---|---|
| Revenue | **$5.14m** (+185.6% YoY, from $1.8m) | $5.09m | ✅ Narrow beat (~1%) |
| Non-GAAP EPS | **($0.05)** | ($0.05) | ➖ **In line** |
| Operating loss | **($28.1m)** | — | ❌ 5.5× revenue |
| GAAP net loss | **($52.6m)** = ($0.16)/sh | — | ⚠️ Mostly non-operating marks |
| Cash + investments | **$541.3m**, no debt | $569.0m at 31 Mar | ➖ ~$27.7m burned |

### Reading the loss lines correctly

**The $52.6m GAAP net loss is largely accounting noise.** Operating loss was $28.1m; the ~$24.5m difference is non-operating fair-value marks. The direction reverses freely — **Q1 2026 posted GAAP net *income* of $33.1m** from the same mechanism running the other way. This is the identical trap flagged in `ionq-analysis.md` §3: for companies of this type, GAAP bottom line is a mark-to-market artifact and says nothing about the business.

**($0.05) non-GAAP is the real comparison, and it matched exactly.**

### The burn is not the near-term risk

Cash moved $569.0m → $541.3m, a **~$27.7m quarterly burn**. Against $541.3m and no debt, that is roughly **19 quarters — about five years of runway.** Rigetti is nowhere near a funding cliff. Anyone framing this as a solvency story (this document did, in an earlier draft) is overstating it.

**The real problem is not runway, it's convergence.** An operating loss of $28.1m against $5.14m of revenue means the business loses **$5.50 for every $1 it earns**. Revenue growing 185% is impressive in percentage terms and nearly irrelevant in absolute terms — it grew by $3.3m while the operating loss ran at $28.1m. Nothing in this quarter suggests those two lines are converging.

---

## 3. What's genuinely working

1. **HPE partnership is real commercial validation.** The nine-qubit Novera system delivered to the **Pittsburgh Supercomputing Center** is part of an **NSF-funded hybrid quantum-classical testbed built with Hewlett Packard Enterprise**. A named enterprise partner and a funded programme is a materially better signal than a research grant alone.
2. **Broadest cloud distribution of the public pure-plays.** Cepheus-1-108Q has been generally available since Q1 via Rigetti's own QCS **plus Amazon Braket, Microsoft Azure Quantum and qBraid**. That is wider third-party channel reach than IonQ has.
3. **$541.3m and no debt.** In a sector where most private competitors are one round from irrelevance, five years of funded runway is a genuine strategic asset.
4. **Potential $100m from the US Department of Commerce.** A May 2026 letter of intent covers up to $100m over three years under CHIPS Act backing, supporting superconducting scale-up. **Caveat: Commerce receives an equity stake** — this is funding with dilution attached, not a clean award.
5. **On-premises deployments are broadening** across government, academic and commercial customers — the strategy management explicitly described as the Q2 focus.

---

## 4. The bear case

1. **~250× sales.** The most extreme valuation of the three names covered in this repo, on the smallest revenue base. There is no reading of the fundamentals that supports this multiple today; it is entirely a bet on a future that has not been demonstrated.
2. **Operating loss is 5.5× revenue, and losses widened ~25% year-over-year** while revenue grew. The gap is widening in absolute terms, not narrowing.
3. **Behind on the metric that matters most.** Cepheus-1-108Q runs at **~99.1% median two-qubit gate fidelity** against Rigetti's own 99.5% target. IonQ, reporting one day earlier, is at **99.97%** via Oxford Ionics. Superconducting qubits are faster than trapped ions but materially behind on error rates, and error rates are the binding constraint on useful quantum computing.
4. **Revenue is lumpy and delivery-dependent.** Quarterly revenue turns on whether specific hardware deliveries are recognised in the period. That makes the top line unpredictable in both directions and hard to underwrite.
5. **No commercial quantum advantage exists — from anyone.** Same category risk as IonQ: the entire sector's valuation rests on a scientific milestone nobody has achieved.
6. **Dilution attached to the funding path.** The Commerce LOI trades equity for capital.
7. **The sector already de-rated ~30% in a month**, and Rigetti carries the highest multiple and smallest revenue in that group — the most sentiment beta and the least fundamental ballast.

---

## 5. The reaction, and the week's pattern

**An in-line quarter, and the stock fell.** Revenue cleared consensus by roughly $50k on a $5.09m estimate — about 1%, effectively a match. Non-GAAP EPS matched exactly. Options had priced a ~12% move; the actual reaction was a **~4% decline that persisted through the call**, so the implied move was not exceeded.

The read from reporting: investors focused on **widening losses, the spending burden, and commercial quantum advantage still being years away** — not on the 185% growth headline.

**This completes a three-for-three week that says more about the tape than about any of the companies:**

| Company | Result | Reaction |
|---|---|---|
| **AMD** (4 Aug) | Beat revenue, EPS, Data Center; guided Q3 ~$500m above consensus; held 56% margins | **−7.5%** |
| **IonQ** (5 Aug) | Beat guide by ~20%, raised FY, RPO +297% | **+0.9%** |
| **Rigetti** (6 Aug) | In line | **−4%** |

Three companies, three different quality levels of print, and not one of them was rewarded. **The market is not currently paying for beats in this complex.** For AMD the specific trigger was capex; for IonQ and Rigetti it is simply that the multiple already holds the news. That is a sector-sentiment regime, and at 250× sales Rigetti has the least protection from it.

---

## 6. Honest summary

Rigetti is a credible superconducting-qubit research company with five years of funded runway, real cloud distribution, a genuine enterprise partner in HPE, and government backing. Those are not trivial assets, and the burn is far more sustainable than the loss headlines suggest.

It is also valued at roughly 250× sales while losing $5.50 for every $1 of revenue, trailing its closest public competitor by a wide margin on gate fidelity, and dependent on a scientific milestone that no company on earth has demonstrated. The 185% revenue growth is real and, at a $5m base, close to meaningless as evidence about the destination.

**The distinction that matters across the three names in this repo:** with AMD you underwrite *execution* on products with signed customers. With IonQ you underwrite *whether the science arrives on a timeline that justifies the price*. With Rigetti you underwrite that same science question **at five times the multiple and from further behind on fidelity.** That is the whole analysis.

---

## Compliance note

Internal research only. This must not become app content in any form. Beyond the MiFID II generic/personal boundary in `compliance-one-pager.md`, a pre-commercial speculative stock at ~250× sales is exactly what Lesson 4 warns beginners against ("chasing hot stocks") and what Lesson 8's "only invest what you can afford to lose" framing exists for. There is no compliant way to publish a view on RGTI in the product.

*Educational information, not personal financial advice. Investing involves risk, including loss of capital.*

---

## Sources

- [Rigetti Q2 2026 results — $5.1m revenue, $52.6m GAAP loss](https://www.stocktitan.net/news/RGTI/rigetti-computing-reports-second-quarter-2026-financial-i812eesegntu.html) · [Q2 2026 earnings call transcript — meets estimates, shares fall](https://www.investing.com/news/transcripts/earnings-call-transcript-rigetti-computing-q2-2026-meets-estimates-shares-fall-93CH-4844689) · [Stock slips after Q2 — TipRanks](https://www.tipranks.com/news/rgti-earnings-rigetti-computing-stock-slips)
- [Q2 2026 reporting date and call details](https://www.globenewswire.com/news-release/2026/07/23/3332553/0/en/Rigetti-Computing-to-Report-Second-Quarter-2026-Financial-Results-and-Host-Conference-Call-on-August-6-2026.html) · [Q1 2026 results](https://investors.rigetti.com/news-releases/news-release-details/rigetti-computing-reports-first-quarter-2026-financial-results)
- [Cepheus-1-108Q GA and ~99.1% fidelity](https://simplywall.st/stocks/us/semiconductors/nasdaq-rgti/rigetti-computing/news/rigetti-computing-rgti-is-up-51-after-108-qubit-launch-and-q) · [Cepheus quantum-advantage push](https://finance.yahoo.com/sectors/technology/articles/rigetti-advances-toward-quantum-advantage-161700555.html)
- [Cash position and burn context](https://coincentral.com/rigetti-rgti-stock-earnings-loom-as-investors-focus-on-revenue-growth-and-569m-cash-cushion/) · [Q2 preview, consensus and ~12% implied move](https://www.tipranks.com/news/rigetti-computing-q2-earnings-preview-options-traders-brace-for-a-12-swing-in-rgti-stock) · [Novera deliveries and expectations](https://www.tipranks.com/news/rigetti-computing-rgti-will-report-q2-earnings-today-heres-what-to-expect)

*Compiled 6 August 2026, ~7:00pm ET, after the Q2 2026 release and earnings call.*
