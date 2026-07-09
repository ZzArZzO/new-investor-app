# Persona Research — alternatives to the current 4 archetypes
*Drafted: 2026-07-09 · Research doc · Not deployed (`*.md` excluded via `.vercelignore`)*

> **Status: Design A implemented (2026-07-09).** New personas live in
> `app/src/content/quiz.ts` (Careful Starter / Steady Autopilot / Curious Explorer /
> Thrill Chaser), quiz questions rewritten (time-horizon dropped, GL hypothetical +
> impulsivity + money-feelings items added), published persona pages at `/types` and
> `/types/[slug]`, result page shows strengths/blind spots. Curriculum doc updated to v3.
> Deferred: post-reveal pacing question (nothing to tune until notifications exist).

Web research (frameworks + competitors) into whether the current quiz personas
(Cautious Starter, Steady Builder, Hands-On Explorer, Curious Diversifier) are the right
set. Compliance frame unchanged: behavioral quiz, no financial-situation questions,
published personas, output maps to education only — never to instruments
(`compliance-one-pager.md`).

## Key findings

### The two dimensions that actually separate beginners
Every serious framework converges on the same core axes:
1. **Involvement** (passive / set-and-forget ↔ hands-on / wants control) — shared by
   Barnewall, Pompian, BB&K, Keller & Siegrist. Zero MiFID risk, purely behavioral.
2. **Emotional style** (anxious / loss-averse ↔ calm ↔ thrill-seeking) — risk aversion and
   loss aversion are empirically *distinct* constructs; BB&K's confidence axis and Klontz's
   money-anxiety capture what a plain risk-appetite question misses.
Plus a flavor layer: **motivation** (safety / steady growth / mastery / social belonging /
thrill & curiosity) — per AFM Gen-Z data this splits young beginners more sharply than
risk appetite does.

### What the NL/EU beginner data says (AFM 2022–2026, FINRA/CFA 2023, ESMA 2023)
Young beginners cluster into roughly four observable groups:
1. **Anxious non-starters** (knowledge/fear barrier — AFM non-investor study)
2. **Goal-driven monthly index savers** (ease-enabled, wealth-building motive)
3. **Social/FOMO followers** (finfluencer-led; 52% of NL Gen-Z rely on friends for financial
   info; >50% of Gen Y/Z consider social media an alternative to advice — BaFin)
4. **Thrill-and-curiosity crypto-first experimenters** (AFM motives: thrill 40%, hobby 39%,
   gambling 29%; 60% of NL crypto holders have no stock/bond experience)

**Gap in the current set: clusters 3 and 4 are missing or blurred.** "Curious Diversifier"
weakly covers both; neither the FOMO-follower nor the thrill-chaser is addressed head-on —
yet they're the largest real segments AND the ones our scam/behavioral content serves best.

### Framework highlights
- **BB&K five-way** (confidence × impetuousness): Adventurer / Celebrity / Individualist /
  Guardian / Straight Arrow. Best structural template; "Celebrity" = the FOMO follower.
- **Pompian BITs**: Preserver / Follower / Independent / Accumulator; adds emotional-vs-
  cognitive lens → tells us which *content tone* works per persona (reassurance vs. data).
- **CFA framing to adopt verbatim in compliance copy**: personas guide *how we teach*,
  never *what anyone should buy*; people are hybrids and drift over time.
- **Klontz money scripts**: source for 1–2 anxiety-detection questions (not for persona names —
  deficit labels like "Money Avoider" are off-brand).
- **Grable-Lytton risk scale**: mine for hypothetical-choice question wording (no financial data).
- **HEXAD gamification types**: Achiever vs. Free Spirit split → which mechanics to lead with.

### Competitor practice
- **Persona count mode = 4–5.** Naming style: "The X" archetypes (Sorted NZ: The Enterpriser,
  The Minimalist…) or trait nouns. Aspirational names; at most one "problem" persona framed
  as strengths + blind spots.
- **Sorted.org.nz = the model to copy**: research-backed (AUT univ.), 5 published persona
  pages with own URLs (strengths, blind spots, tool links) → national press, SEO,
  shareability. No login wall before result.
- **Finelo = the anti-model**: 13-question quiz that always outputs "perfect fit / high
  readiness" → reviewers call it a fake funnel. Steal the funnel shape (quiz → named result →
  first-lesson preview → conversion), not the dishonesty. Genuinely differentiated results
  are a trust asset in the EU.
- **Duolingo pattern**: segmentation tunes pacing, order, notification copy — never
  curriculum substance. Also our cleanest MiFID story.
- **The regulatory line in practice** (Nutmeg vs. Finelo contrast): a quiz becomes
  suitability when it (a) collects financial situation AND (b) maps answers to a product/
  portfolio recommendation. We stay safe by never doing either. ESMA treats algorithmic
  output as advice regardless of automation.
- **Crypto exchanges do zero persona work** (only regulated appropriateness tests under
  MiCA) — the persona-quiz space next to crypto in the EU is open.

## Candidate persona sets

### Design A — modernized 2×2 (4 personas, keeps current quiz math) ← recommended
Axes: involvement × emotional style. A/B/C/D tally unchanged.

| Persona | Quadrant | Maps to | Content emphasis |
|---|---|---|---|
| 🟢 **The Careful Starter** | low involvement, anxious | Guardian/Preserver, cluster 1 | Reassurance-first, small steps, loss-framing |
| 🔵 **The Steady Autopilot** | low involvement, calm | Follower(+), cluster 2 | Set-and-forget habits, monthly rhythm, tracker |
| 🟠 **The Curious Explorer** | high involvement, calm/cognitive | Individualist/Independent | Mechanics-deep lessons, tools, comparisons |
| 🟣 **The Thrill Chaser** | high involvement, emotionally charged | Adventurer/Accumulator, cluster 4 | Channel excitement into learning; position-sizing psychology, scam literacy, disposition effect |

Change vs. today: replaces weakly-differentiated "Curious Diversifier" with the empirically
biggest missing cluster (thrill/FOMO/crypto-first) — the persona our risk-first crypto
content is literally built for.

### Design B — motivation-first (5 personas, needs new scoring)
Safety Seeker / Goal Builder / Knowledge Hunter / Social Surfer / Adrenaline Explorer.
Aligns directly with AFM motive data; "Social Surfer" addresses the finfluencer cluster
head-on; personas double as gamification profiles (which mechanic to lead with). Cost:
weighted scoring instead of A–D tally, 10–12 questions, bigger rewrite.

### Design C — 6-persona grid (2×3)
Richest, but 8 questions can't resolve 6 outcomes; needs ~12. Overkill now (YAGNI).

## Recommendation

1. **Design A** — smallest change, strongest evidence fit, keeps 8-question A–D scoring.
   Rewrite 2–3 quiz questions using Grable-Lytton-style hypotheticals + 1 Klontz-style
   anxiety item + 1 impulsivity item ("act immediately or sleep on it?").
2. **Publish each persona as its own page** (Sorted model) with strengths + blind spots +
   which lessons/tools fit — shareable URLs, SEO, press-friendly, and it strengthens the
   compliance posture (fully published, transparent personas).
3. **Add Duolingo-style pacing question** post-reveal (minutes/day → value echo) — tunes
   nudge copy, not content.
4. Adopt CFA limitation language in compliance copy: personas adapt teaching, never
   recommendations; retake every 6–12 months (already in curriculum doc).

Full citations in research transcripts; key sources: BB&K/Pompian via breakingdownfinance.com &
michaelpompian.com · AFM Gen-Z report 2025 + Consumentenmonitor + crypto studies (afm.nl) ·
FINRA/CFA "Gen Z and Investing" 2023 · ESMA suitability guidelines + Dec 2023 digitalisation
paper · sorted.org.nz money personality quiz + AUT report · Klontz KMSI · Grable-Lytton scale ·
HEXAD (gamified.uk).
