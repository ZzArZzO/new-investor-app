# AMD (Advanced Micro Devices) — Company Analysis

> **What this is:** an honest, research-backed look at a single company — what it does, what the numbers say, what the bull and bear cases actually are, and what's already priced into the stock. Written in the house voice: no price targets, no "buy this," no hype.
>
> **What this is not:** advice. Nothing here is a recommendation to buy, sell, or hold AMD, and it isn't tailored to anyone's situation. See the compliance note at the bottom before any of this goes near the product.
>
> **Timing caveat — read this first.** AMD reports **Q2 2026 results today, 4 August 2026, after the US close.** Every number below is pre-print. The most recent *actual* quarter is Q1 2026 (reported 6 May 2026). Anything in this doc could be stale within hours.

---

## 1. Snapshot

| | |
|---|---|
| Ticker | AMD (NASDAQ) |
| Share price (4 Aug 2026 open) | **$409.49** |
| Shares outstanding | ~1.631bn |
| Market cap | **≈ $670bn** (1.631bn × $409.49) |
| 52-week move | **+182%** |
| All-time-high close | **$580.91** (30 Jun 2026) — currently **~29% below it** |
| Trailing P/E (GAAP) | ~155× |
| Forward P/E (2026E non-GAAP) | **~53×** |
| FY2025 revenue | $34.6bn |
| 2026 consensus revenue | ~$48.4bn (+~40%) |

*Note on market cap:* some trackers still show **$776–790bn**. That implies ~$476/share and looks like a stale snapshot from the June peak. The arithmetic above (share count × current price) is the one to trust.

---

## 2. What AMD actually is

Four businesses under one roof, and they are *not* equally important any more:

| Segment | Q1 2026 revenue | YoY | What it is |
|---|---|---|---|
| **Data Center** | **$5.8bn** | **+57%** | EPYC server CPUs + Instinct AI GPUs. The whole story. |
| Client & Gaming | $3.6bn | +23% | Ryzen PC chips, Radeon graphics, console chips (PS/Xbox) |
| Embedded | ~$0.87bn | ~+6% | The Xilinx FPGA business — industrial, auto, comms. Sleepy but very profitable (39% operating margin) |

Data Center was **56% of Q1 revenue** and is where essentially all of the growth, all of the optionality, and all of the risk lives. The rest of the company is a decent, cyclical, cash-generating semiconductor business that nobody is paying $670bn for.

**The one-sentence version:** AMD is a profitable, well-run chip designer whose valuation is a bet that it becomes the credible *second* supplier of AI training and inference silicon, in a market where Nvidia currently holds **>95% share** and AMD holds roughly **4.5%**.

---

## 3. The numbers

### FY2025 (full year, actual)
- Revenue **$34.6bn** (record)
- GAAP gross margin 50% · non-GAAP 52%
- GAAP net income **$4.3bn**, diluted EPS **$2.65**
- Non-GAAP net income $6.8bn, EPS **$4.17**
- Data Center **$16.6bn**, +32%
- Included ~$440m *net* inventory/related charges from US export controls on the China-market MI308 (AMD had originally flagged up to ~$800m; ~$360m of reserves were released in Q4 as licences came through, with ~$390m of Q4 MI308 revenue to China)

### Q1 2026 (most recent actual)
- Revenue **$10.3bn**, +38% YoY
- Non-GAAP gross margin **55%** (+170bps YoY)
- Non-GAAP operating income **$2.5bn** → **25% operating margin**
- GAAP net income **$1.4bn**, diluted EPS **$0.84**
- Non-GAAP EPS **$1.37**
- Client & Gaming operating income $575m (vs $496m)
- Embedded operating income $338m, 39% of segment revenue

The **$0.84 GAAP vs $1.37 non-GAAP** gap (~$880m) is mostly acquisition-intangible amortisation (Xilinx, ZT Systems) plus stock compensation. The amortisation is genuinely non-cash and backward-looking; the stock comp is a real cost to shareholders. Anyone comparing AMD's P/E to another company's needs to check which EPS they're using — the trailing 155× and forward 53× above are *not* the same measure.

### Q2 2026 guidance (given 6 May, reports tonight)
- Revenue **$11.2bn ± $300m** → **+46% YoY**, +9% sequentially
- Non-GAAP gross margin **~56%**
- Opex ~$3.3bn · other income +$60m · 13% tax rate · ~1.66bn diluted shares
- Implied non-GAAP operating income ≈ **$3.0bn** (26.5% margin), EPS ≈ **$1.59**
- Street consensus: revenue ~$11.3bn, EPS **$1.61** — i.e. the market expects a modest beat

**The maths that matters for the rest of the year:** H1 2026 is $10.3bn + ~$11.2bn ≈ **$21.5bn**. Consensus full-year is ~$48.4bn. That requires **~$27bn in H2** — a step-change that depends almost entirely on the MI450 ramp starting in the second half. This is the single biggest "show me" in the story.

---

## 4. The bull case

**1. The second-source thesis is real and customers are voting.** Nobody buying AI compute wants a single supplier with 95% share and the pricing power that comes with it. AMD is now the designated alternative, with signed commitments rather than press-release intentions:

| Customer | Commitment | Structure |
|---|---|---|
| **OpenAI** (Oct 2025) | **6 GW** of Instinct GPUs across multiple generations; first 1 GW of MI450 begins **2H 2026** | Warrant for up to **160m AMD shares (~10%)**, vesting on deployment volume *and* AMD share-price milestones |
| **Anthropic** (22 Jul 2026) | Up to **2 GW** of MI450-series in Helios racks; first GW from **1H 2027** | **No warrant.** AMD instead commits up to **$5bn equity investment** into Anthropic |
| **Microsoft** (Jul 2026) | Helios deployment for AI workloads | Announced at the Helios launch |
| **Meta** | Prior commitment | Included warrants |

The Anthropic deal is worth noting structurally: AMD gave away *no* equity dilution and instead put capital in. That's a stronger negotiating position than the OpenAI arrangement, and it suggests demand — not incentives — is doing more of the work now.

**2. The hardware is competitive, not just cheaper.** The MI455X in the Helios rack has **432GB of HBM4** vs ~288GB for Nvidia's Vera Rubin — 50% more memory per rack. For trillion-parameter models, memory capacity decides whether a model fits in one rack or has to be split across several, which is a real total-cost-of-ownership argument. On raw compute (~40 PFLOPS FP4 vs Rubin's ~50) AMD trails but is in the same class, which is a very different position from two generations ago.

**3. Helios is AMD's first credible rack-scale system.** Selling loose GPUs against Nvidia's fully-integrated racks was always a losing fight. Helios is the answer, and Microsoft and Anthropic signing on at launch is meaningful third-party validation.

**4. The core business is genuinely profitable and improving.** 55%→56% non-GAAP gross margin *while* ramping AI GPUs is not what a company buying share with price does. Server CPU share gains against Intel continue independently of the AI story, and Embedded throws off ~39% margins.

**5. Management's own long-term model is enormous.** At the November 2025 Financial Analyst Day, AMD targeted, over 3–5 years: **>35% revenue CAGR**, **>35% non-GAAP operating margin**, **>$20 non-GAAP EPS**, **>60% data-center CAGR** (>80% for data-center AI), and **>50% server CPU revenue share**, against a data-centre compute TAM they size at **$1trn by 2030**.

---

## 5. The bear case

**1. You are paying for the plan, not the company.** At ~$410, AMD trades at ~53× 2026 estimated non-GAAP earnings and ~14× 2026 estimated sales. Even against management's own **>$20 EPS** ambition — a 3-to-5-year *target*, not a forecast — you're paying ~20× the successful outcome today. The plan has to substantially work just to justify the current price; the stock's 182% 12-month run has already banked much of the good news.

**2. 4.5% share is a very small base, and the gap isn't only silicon.** Nvidia's moat is CUDA, an installed developer base, and years of operational experience shipping integrated racks at scale. AMD's ROCm software stack has improved a lot and is no longer the punchline it once was, but "our chip has more memory" doesn't by itself move a workload that has been tuned against CUDA for five years.

**3. Rack-scale execution is a new competence.** Helios is AMD's first attempt at a full rack system. Power, cooling, networking, and integration at that scale are exactly where new entrants slip. A one-quarter slip in the MI450 ramp breaks the H2 revenue maths in section 3.

**4. Customer concentration — and the circularity question.** OpenAI, Anthropic, Meta and Microsoft account for a very large share of the committed AI pipeline. Two of those relationships involve AMD giving equity (a ~10% warrant) or *taking* equity (up to $5bn into Anthropic). AMD's ~$200bn of announced deals sit inside a broader pattern — over $800bn of arrangements industry-wide — where chip vendors invest in AI companies that then buy their chips. Defenders call it a virtuous circle lining up supply with demand; critics point at Nortel-style vendor financing in the fibre bust. Both descriptions fit the same facts, which is precisely why it's a risk rather than a settled question. If any large AI customer's funding tightens, the demand doesn't just soften — it may have been partly AMD-funded in the first place.

**5. China is ~20% of revenue and it's a policy variable.** Lisa Su has said China still accounts for roughly 20% of revenue. AMD holds licences to export the compliance-tier **MI308** and has agreed to remit **15% of that revenue to the US government** — an arrangement some legal scholars argue is an unconstitutional export tax and which could be challenged in court. Higher-end parts (MI325X) require case-by-case approval as of January 2026. This line item can be rewritten by a policy decision AMD does not control.

**6. Supply is not fully in AMD's hands.** HBM4 memory and TSMC's advanced packaging allocation are shared constraints across the industry. AMD competes for both against a much larger buyer.

**7. The sector's multiple is already wobbling.** The 29% drawdown from the June high had almost nothing to do with AMD: a weak Samsung print, TSMC guiding 2026 capex to $60–64bn, Chinese competition, and a broad reassessment of whether AI returns will justify the capital. That's the point — **at this multiple, AMD's price is set as much by sentiment toward AI capex as by AMD's own execution.** Multiple compression can undo two good quarters.

---

## 6. What's actually priced in

Put crudely, at ~$670bn the market is saying something like:

- Revenue roughly **$48bn in 2026** and accelerating to ~60% growth in 2027 (consensus)
- AI GPU share moving from ~4.5% toward *double digits* over several years
- Gross margins holding in the mid-50s **through** a massive AI-GPU mix shift
- The OpenAI/Anthropic/Meta/Microsoft commitments converting into shipped, paid-for silicon roughly on schedule
- No serious rack-scale execution stumble, no China shutdown, no AI-capex air pocket

Miss on any *two* of those and the multiple, not just the earnings, gets re-rated. Hit them all and the >$20 EPS model stops looking like a stretch. That asymmetry — high expectations, real but unproven execution — *is* the investment case, in both directions.

---

## 7. What to watch tonight (and after)

1. **Data Center revenue vs the ~$6.5bn whisper** (≈$4bn server CPU + ≈$2.5bn AI accelerators). The segment split matters more than the headline.
2. **Q3 guidance.** This is the real event. H2 needs ~$27bn to hit consensus — the Q3 guide is the first hard evidence on whether the MI450 ramp is on time.
3. **Gross margin.** Holding ~56% while AI GPU mix rises is the bull case in one number. Any guide toward the low 50s says AI revenue is coming in at dilutive margins.
4. **Explicit MI450 / Helios ramp language.** "On track for 2H" vs any hedging.
5. **China / MI308 assumptions** in the guide — whether any China revenue is included at all.
6. **The OpenAI warrant.** As of 28 March 2026 **none of the 160m warrant shares had vested**, so they hadn't touched the financials. It's carried as a liability until equity-classification conditions are met. Watch for first vesting — it brings both dilution and mark-to-market noise into GAAP earnings.

---

## 8. Honest summary

AMD is a genuinely strong company — profitable, gaining server CPU share, improving margins, and now holding real multi-gigawatt commitments from the most important buyers of AI compute. The technology gap with Nvidia is the narrowest it has ever been, and the "nobody wants a single supplier" argument is structural rather than sentimental.

It is also a stock priced for that story to work. At ~53× forward earnings with 4.5% share of the market it needs to win, the margin for execution error is thin, and roughly a fifth of revenue sits behind a geopolitical variable. The 29% drawdown since June is a reminder that at this valuation the price moves on the market's mood about AI capex as much as on AMD's results.

**Both of those things are true at once.** Anyone forming a view needs to be honest about which risk they're actually taking: this is not a bet on whether AMD is a good company — it clearly is — but on whether an already-demanding set of expectations gets met on schedule.

---

## Compliance note (read before any of this touches the product)

This document is **internal research**, not app content. Our own guardrails (`compliance-one-pager.md`, `new-investor-app-curriculum.md`) say the product stays **generic and editorial** and never names a specific security as suitable for a user. Publishing a single-stock analysis inside the app would sit close to — arguably across — that line, and would conflict with the Lesson 4 content that warns beginners off chasing individual stocks.

If any of this is to be reused publicly, the safe shape is a **worked example of *how* to analyse a company** — segments, margins, what's priced in, bull vs bear — with the conclusion left open and no suitability language. That fits the Hands-On Explorer persona and Lesson 3/4 without becoming a stock tip. The verdict section above would need to go.

Standard footer applies regardless: *Educational information, not personal financial advice. Investing involves risk, including loss of capital.*

---

## Sources

- [AMD Q1 2026 results (press release)](https://ir.amd.com/news-events/press-releases/detail/1284/amd-reports-first-quarter-2026-financial-results) · [Q1 2026 8-K / earnings slides (SEC)](https://www.sec.gov/Archives/edgar/data/0000002488/000000248826000072/amdq126earningsslidesfin.htm) · [Q1 2026 10-Q (SEC)](https://www.sec.gov/Archives/edgar/data/0000002488/000000248826000076/amd-20260328.htm)
- [AMD Q4 and full year 2025 results](https://ir.amd.com/news-events/press-releases/detail/1276/amd-reports-fourth-quarter-and-full-year-2025-financial-results) · [FY2025 summary — TechPowerUp](https://www.techpowerup.com/345946/amd-reports-record-q4-usd-10-3-billion-revenue-fy-2025-reaches-usd-34-6-billion)
- [AMD Financial Analyst Day 2025 — long-term model](https://ir.amd.com/news-events/press-releases/detail/1266/amd-unveils-strategy-to-lead-the-1-trillion-compute-market-and-accelerate-next-phase-of-growth) · [Investing.com summary](https://www.investing.com/news/company-news/amd-aims-to-expand-data-center-ai-leadership-with-35-revenue-cagr-93CH-4349770)
- [OpenAI–AMD 6 GW partnership](https://openai.com/index/openai-amd-strategic-partnership/) · [AMD–Anthropic 2 GW deal and $5bn investment — CNBC](https://www.cnbc.com/2026/07/22/amd-anthropic-ai-chip-investment.html)
- [AMD launches Helios, Microsoft as buyer — CNBC](https://www.cnbc.com/2026/07/20/amd-helios-microsoft-ai-nvidia.html) · [Helios vs Vera Rubin memory/compute — TechTimes](https://www.techtimes.com/articles/319338/20260629/amd-helios-faces-nvidia-vera-rubin-july-23-keynote-memory-leads-training-trails.htm) · [AMD vs Nvidia AI GPU share](https://siliconanalysts.com/analysis/amd-vs-nvidia-ai-gpu-market-share-2026)
- [Nvidia/AMD 15% China revenue-share arrangement — CBS News](https://www.cbsnews.com/news/nvidia-amd-chip-sales-china-15-percent-h20-mi308/) · [Lisa Su on China ~20% of revenue](https://cryptobriefing.com/amd-china-revenue-export-restrictions/) · [MI308 export licensing — Varindia](https://www.varindia.com/news/amd-confirms-approval-to-ship-modified-mi308-chips-to-china-under-new-u-s-licensing-rules)
- [July 2026 semiconductor selloff — CNBC](https://www.cnbc.com/2026/07/28/sk-hynix-plunges-semiconductor-selloff-deepens-samsung-softbank.html) · [AMD 17% off peak — TradingKey](https://www.tradingkey.com/analysis/stocks/us-stocks/262037492-amd-stock-forecast-week-july-20-2026-advancing-ai-july-22-tradingkey)
- [AI circular-financing debate — Axios](https://www.axios.com/2026/07/27/nvidia-openai-financing-ai-jensen-huang-ssi) · [Bloomberg graphic](https://www.bloomberg.com/graphics/2026-ai-circular-deals/) · [Noah Smith, counterargument](https://www.noahpinion.blog/p/should-we-worry-about-ais-circular)
- [Q2 2026 preview and consensus — Zacks/Yahoo](https://finance.yahoo.com/markets/stocks/articles/buy-amd-stock-ahead-q2-152100876.html) · [AMD statistics & valuation — stockanalysis.com](https://stockanalysis.com/stocks/amd/statistics/) · [Market cap — companiesmarketcap](https://companiesmarketcap.com/amd/marketcap/)

*Compiled 4 August 2026, before AMD's Q2 2026 release.*
