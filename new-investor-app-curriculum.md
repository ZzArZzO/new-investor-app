# New Investor App — Curriculum & Archetype Quiz (Draft v3)

> **v3 change (2026-07-09):** personas redesigned per `persona-research.md` (Design A —
> involvement × emotional-style grid, BB&K/Pompian-based). "Curious Diversifier" replaced by
> **The Thrill Chaser** (the empirically largest missing cluster: thrill/FOMO/crypto-first per
> AFM Gen-Z data). Names updated: Careful Starter, Steady Autopilot, Curious Explorer, Thrill
> Chaser. Quiz: time-horizon question removed (suitability-adjacent), replaced with a
> Grable-Lytton-style hypothetical; added impulsivity and money-feelings items. Each persona
> now published at `/types/[slug]` with strengths + blind spots (Sorted.org.nz model). Five
> new lesson tracks also shipped (money basics, behavioral finance, FIRE, real estate, crypto
> deep-dive — see `app/src/content/lessons.ts`).
>
> **v2 change:** restructured around **three co-primary pillars — Investing, Crypto, and Blockchain** — instead of an investing curriculum with a crypto footnote. Crypto/blockchain is now a full track, framed honestly and risk-first. See `let-s-now-plan-this-vast-moon.md` (plan) and `market-and-competition-research.md` (research) for the surrounding strategy.

## Design principle (keep this pinned above everything else)

Everything below stays **editorial/illustrative**, not **personalized**. The quiz sorts someone into one of a small number of published personas — it does not take in real financial details (income, savings, net worth) and compute a bespoke number. The moment it starts asking "how much do you have saved" and outputting "therefore you should buy X amount of Y," it crosses into MiFID II/AFM-regulated advice. Keep the language editorial: *"people in this group often choose..."* not *"we recommend you buy..."*

**Crypto adds a second rulebook — MiCA.** Crypto in the EU is governed by the Markets in Crypto-Assets Regulation (MiCA), separate from MiFID II. Two hard rules for the crypto pillar:
1. **All crypto content and marketing must be "fair, clear and non-misleading"** — no hype, no price predictions, no "this coin will moon." (This fits the honest brand rather than fighting it.)
2. **Any crypto tool/exchange we ever point to must be MiCA-authorized** (a licensed CASP — verify against the public register). We teach about crypto freely; we only ever *refer* to regulated, licensed platforms.

The honest, risk-first, no-hype voice is the whole differentiator — in a space full of shilling, being the calm guide who tells you the real risks is the moat. Never tip into "buy this coin."

---

## Part 1 — Core Curriculum (three pillars)

Each lesson: one core idea, a short reading, a real-world example, a 2-question check. Designed to be finished in 5–8 minutes — Duolingo pacing, not a textbook chapter. Learners do the shared Foundations first, then go as deep as they want into Investing, Crypto, or both.

### 🌱 Pillar A — Foundations (shared by both worlds)

**Lesson 1 — Why put your money to work**
- Saving vs. investing: why cash loses value to inflation over time
- Compound growth, shown visually (same €100/month at 0% vs 7%)
- The cost of waiting: what starting at 25 vs 35 actually looks like

**Lesson 2 — Risk & time**
- Risk isn't just "will I lose money" — it's volatility vs. permanent loss
- Why time horizon changes what "safe" means
- Sequence of returns: why a 20% drop matters differently at 25 vs 60

### 📈 Pillar B — Investing (traditional markets)

**Lesson 3 — The building blocks**
- Stocks, bonds, ETFs, index funds — in plain language, no jargon first pass
- What an index fund actually is and why "just buy the index" is common advice
- How shares of a real business translate into long-term growth

**Lesson 4 — Diversification, fees & mistakes**
- Why "don't put all your eggs in one basket" is math, not a cliché
- Expense ratios: why 0.1% vs 1.5% compounds into real money over 20 years
- Common beginner mistakes: timing the market, chasing hot stocks, panic-selling

**Lesson 5 — Choosing a tool & making your first investment**
- Broker vs. robo-advisor vs. bank — what each does, fees, minimums, what's protected (AFM, investor compensation schemes)
- Step-by-step: opening an account, KYC, first deposit
- Placing a first order (market vs. limit, fractional shares); what to expect emotionally

### ₿ Pillar C — Crypto & blockchain (honestly, including the risks)

**Lesson 6 — What blockchain & crypto actually are**
- What a blockchain is in plain language — a shared, tamper-evident ledger — and why that idea matters
- What crypto is, and what it isn't: not a company, no cash flows, value driven by supply/demand and belief
- Bitcoin vs. everything else, stablecoins, tokens — the honest one-paragraph map, no hype

**Lesson 7 — Wallets, exchanges & staying safe**
- Custody vs. self-custody: "not your keys, not your coins" explained simply
- How exchanges work, and why we only ever mention MiCA-licensed, regulated ones
- The scam landscape beginners actually hit: fake support, seed-phrase theft, "guaranteed returns," rug pulls — and the red flags that spot them

**Lesson 8 — Risk, reward & a sensible slice**
- Why crypto is genuinely high-risk: volatility, could-go-to-zero, no compensation scheme
- How people who choose to hold it keep it to a small, clearly-bounded allocation
- Why "only invest what you can afford to lose" is the literal rule here, not a cliché

### 🧭 Capstone — Putting it together & staying the course (ongoing, not one-time)

**Lesson 9 — One portfolio, both worlds**
- How a "core + small satellite" idea lets traditional investing and a bounded crypto slice coexist
- Rebalancing basics, dollar-cost averaging as a habit across both
- When to actually check your portfolio (less often than you think)
- Revisit the archetype quiz every 6–12 months as life changes; this is where the tool-comparison step lives (Lesson 5 + the crypto exchange comparison)

---

## Part 2 — Archetype Quiz

8 questions, all behavioral/preference-based — nothing about income, savings amount, net worth, **or time horizon** (dropped in v3 as the most suitability-adjacent item). Single-select, one point per answer, tally the most common letter. The letters map onto the two research-backed axes: **involvement** (A/B low ↔ C/D high) and **emotional style** (A anxious, B calm-passive, C calm-cognitive, D emotionally charged). See `persona-research.md`.

1. **When you think about investing or crypto, what's your first reaction?**
   A) Nervous but curious B) Fine, as long as it's simple C) Ready to dig in D) Excited — I've been itching to start

2. **Your investment drops 20% in a month. What's your gut reaction?**
   A) Panic, want to sell B) Uncomfortable, but I'd hold C) Interesting, maybe buy more D) Doesn't bother me much

3. **How hands-on do you want to be?**
   A) Set it and forget it B) Check in monthly C) Like following markets regularly D) Want full control over picks

4. **You can take €500 guaranteed, or a coin flip for €1,200. Which do you take?** *(Grable-Lytton-style hypothetical)*
   A) The €500, no hesitation B) Probably the €500 C) I'd think the odds through first D) The flip — worth the shot

5. **What's pulling you toward this?**
   A) Grow savings safely B) Beat inflation, build a habit C) Learn a skill, get involved D) The excitement — and not missing what everyone's talking about

6. **How much research do you want to do before buying anything?**
   A) None — just point me somewhere sensible B) A little C) A lot, I enjoy this part D) Not much — I trust my gut

7. **You've decided to try something new with money. What happens next?** *(impulsivity item, BB&K careful↔impetuous)*
   A) I sleep on it — probably several nights B) I set it up calmly and let it run C) I research first, then act deliberately D) I act the same day, while I'm excited

8. **Thinking about money mostly makes you feel…** *(Klontz-inspired money-feelings item)*
   A) Anxious — I'd rather not B) Fine — as long as it stays simple C) Interested — I like understanding it D) Excited — the swings are part of the fun

**Scoring:** mostly A's → The Careful Starter · mostly B's → The Steady Autopilot · mostly C's → The Curious Explorer · mostly D's → The Thrill Chaser. (Ties default to Steady Autopilot — the safest middle ground.)

---

## Part 3 — The Four Archetypes

Each persona gets an honest take on **both** worlds — the difference is emphasis and how much (if any) crypto fits. Grid: **involvement × emotional style** (BB&K/Pompian, see `persona-research.md`). Every persona is published at `/types/[slug]` with strengths + blind spots — the quiz adapts *how we teach, never what anyone should buy* (CFA framing).

### 🟢 The Careful Starter *(low involvement · anxious)*
Money decisions feel heavy; wants safety, simplicity and small steps. Maps to BB&K Guardian / Pompian Preserver, and the AFM "anxious non-starter" cluster.
- **Illustrative approach:** a single, globally diversified fund weighted toward stability; build the habit with small automatic amounts before adding risk. Crypto tiny or skipped.
- **Tool fit:** low-friction robo-advisor or a bank's simple investing product — minimal decisions required.
- **Content emphasis:** reassurance-first, loss-framing education, write-the-plan-in-calm-weather.

### 🔵 The Steady Autopilot *(low involvement · calm)*
Wants wealth to build itself in the background. The "default" profile most beginners land on; ties default here. Maps to the AFM monthly-index-saver cluster.
- **Illustrative approach:** globally diversified index fund via monthly automatic contributions (DCA); maybe a small bounded crypto satellite.
- **Tool fit:** low-cost broker with fractional shares and recurring buys; a MiCA-licensed exchange only for the small slice.
- **Content emphasis:** automation, yearly rebalance reminders, fee awareness (don't follow defaults blindly).

### 🟠 The Curious Explorer *(high involvement · calm/cognitive)*
Enjoys research, wants control, learns for the pleasure of understanding. Maps to BB&K Individualist / Pompian Independent.
- **Illustrative approach:** "core + satellite" — solid index base plus researched picks (stocks, sector ETFs, deliberate crypto slice).
- **Tool fit:** full-featured broker with research tools; a MiCA-licensed exchange for the researched crypto portion.
- **Content emphasis:** mechanics-deep lessons, tools, comparisons; overconfidence and confirmation-bias warnings.

### 🟣 The Thrill Chaser *(high involvement · emotionally charged)*
The excitement is the draw — swings, new assets, being early. Maps to BB&K Adventurer / Pompian Accumulator and the **largest under-served real cluster** (AFM Gen-Z: thrill 40% / hobby 39% / gambling 29% motives; 60% of NL crypto holders have no stock experience; FINRA: 41% started from FOMO). This is who our scam and behavioral content serves hardest.
- **Illustrative approach:** a boring diversified core doing the real work, plus a small, **hard-capped** "excitement slice" (often incl. crypto on a MiCA-licensed platform) sized as an amount they could lose entirely — decided once in the cold light of day, never topped up mid-hype.
- **Tool fit:** mainstream broker for the core plus a MiCA-licensed exchange for the slice — never sketchy apps.
- **Content emphasis:** channel the energy into learning; position-sizing psychology, FOMO/peak-attention mechanics, disposition effect, scam literacy (fast movers are prime targets).

---

## Notes for building this out further

- Each lesson should end with a soft nudge toward the next one (streak/progress mechanic), not a hard gate — people drop off if it feels like homework.
- Let learners branch: after Foundations, some will go straight to Crypto, some to Investing. Track which pillar each cohort prefers — it's live positioning data.
- The archetype result screen is the natural place for the tool-comparison step (Lesson 5 + the crypto exchange comparison) — this is where the affiliate/referral revenue plugs in. Keep it a **comparison shown to everyone**, not a single "your persona → this exact broker" recommendation (see the plan's regulatory note).
- **Crypto guardrails, always on:** no price predictions, no "top coins to buy," no urgency. Only MiCA-licensed exchanges in any comparison. A visible "crypto is high-risk, you can lose everything" note wherever crypto tools appear.
- If you ever move from "illustrative portfolios" to real personalized recommendations tied to someone's actual account, that's the point where the broker/exchange-partnership/licensing conversation — and MiFID II **and** MiCA — come back into play in a much bigger way.
