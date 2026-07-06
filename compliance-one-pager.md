# Compliance One-Pager — MiFID II + MiCA (Working Draft)

> **What this is:** a practical "what we will and won't say" boundary document for the New Investor app, so the product and its copy stay on the safe side of two EU regimes. **What this is not:** legal advice. It's a *preparation* document — it captures our own reasoning so a qualified Dutch financial-regulation lawyer can review the hard edges quickly and cheaply. Every "we believe" below is a hypothesis to confirm, not a settled fact.

**The two regimes in one line each:**
- **MiFID II** governs *investment advice* for traditional instruments (stocks, bonds, ETFs, funds). Our safety depends on staying **generic/editorial**, never **personal**.
- **MiCA** governs *crypto-assets and their marketing*. Our safety depends on crypto content being **fair, clear and non-misleading**, and only ever pointing to **MiCA-licensed** exchanges.

---

## Regime 1 — MiFID II: the advice line

**The rule.** "Investment advice" = a **personal recommendation** to a client — advice presented as *suitable for that specific person*, based on *their circumstances*. ([ESMA/Freshfields](https://riskandcompliance.freshfields.com/post/102ik46/understanding-the-definition-of-investment-advice-under-mifid-esma-revises-13-y))

**What keeps us safe.** **Generic advice about a *type* of instrument, addressed to the public at large, is explicitly outside the definition.** Teaching "what an index fund is" or "how people with a long time horizon often think about risk" to everyone is editorial content, not advice.

**The risk zone (take seriously).** ESMA has flagged that recommendations delivered through **apps, websites, or algorithmic quizzes** *can* be reclassified as "personal" — even without collecting income/net-worth data — if the output is tailored enough to an individual's inputs to look like it's "for them." Our archetype quiz is the feature closest to this line.

### Do / Don't (MiFID II)

| ✅ Do | ❌ Don't |
|---|---|
| "People in this group often choose…" | "We recommend you buy…" / "You should buy…" |
| Describe *types* of instruments and approaches | Name a specific security as suitable *for the user* |
| Show illustrative, published personas everyone can see | Compute a bespoke portfolio from the user's own numbers |
| Present a broker comparison table shown to **everyone** | Map "your quiz result → this one broker, for you" |
| Educational framing, public audience | Anything that reads as "given *your* situation, do X" |

### Feature-by-feature posture

- **Curriculum lessons** — Lowest risk. Generic education to the public. Keep the editorial voice; avoid "you should."
- **Archetype quiz** — Highest-risk feature. Mitigation already in the design: (a) **no financial-detail inputs** (no income/savings/net worth); (b) output is a **descriptive persona + illustrative approach**, not a personalised instruction; (c) the persona is one of a few **published** types, identical for everyone who lands in it. **Decouple the result from any single tool** — see below.
- **Tool/broker comparison** — Keep it a **comparison shown to all users**, listing facts (fees, minimums, what's protected). Do **not** collapse it into "your persona → buy via this specific broker." A table everyone sees is "an article + a table"; a per-user single-broker output edges toward a personal recommendation.

---

## Regime 2 — MiCA: the crypto marketing line

**The rule.** Crypto in the EU is governed by MiCA (separate from MiFID II). Its transition period ended **1 July 2026** — only **CASP-authorized** (licensed) firms may serve EU clients. All crypto **marketing communications must be "fair, clear and non-misleading."** ([ESMA MiCA](https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica), [MiCA advertising — Taylor Wessing](https://www.taylorwessing.com/en/interface/2025/regulating-cryptos/regulation-of-crypto-advertising-in-the-eu), [NL/EU deadlines — Sumsub](https://sumsub.com/blog/crypto-regulations-in-the-european-union-markets-in-crypto-assets-mica/))

**What keeps us safe.** Teaching *about* crypto and blockchain (what it is, how it works, the risks) is educational and low-risk. The bite comes from **promoting a specific exchange for a fee** and from any copy that hypes or misleads.

### Do / Don't (MiCA)

| ✅ Do | ❌ Don't |
|---|---|
| Explain what a blockchain / crypto actually is | Predict prices ("BTC to €X") |
| State the risks plainly ("high-risk, can go to zero") | Imply guaranteed or likely returns |
| Only ever reference **MiCA-licensed** exchanges (verify on the CASP register) | Link to or name an unlicensed/offshore exchange |
| "Fair, clear, non-misleading" — sober tone | Hype, urgency, "top coins to buy now," FOMO |
| Teach self-custody & scam-avoidance | Give a specific "buy this coin" instruction |
| Show a visible "you can lose everything" note wherever crypto tools appear | Bury or omit the risk warning |

**Hard rule:** before any crypto exchange appears in a comparison or referral, confirm it holds a current CASP authorization (public register / ESMA). Re-check periodically — authorizations change.

---

## Cross-cutting: the affiliate / referral posture

The EU **Retail Investment Strategy** (final political agreement 18 Dec 2025) tightens rules on paid promotion of investment products, explicitly targeting "finfluencer"-style arrangements — written agreements with promoters, disclosure, firm-level control. It phases in over ~24–30 months. ([Consilium](https://www.consilium.europa.eu/en/press/press-releases/2025/12/18/retail-investment-strategy-council-and-parliament-agree-on-package-to-empower-consumers-while-boosting-markets/)) Implications for us:
- **Disclose affiliate relationships clearly** wherever a referral link appears ("we may earn a fee if you sign up through this link").
- Keep referral a **comparison/choice**, not a single steered recommendation.
- Assume the rules tighten during our lifetime — design so subscription revenue can carry the product if referral economics get constrained.

---

## Global copy guardrails (always on, every screen)

1. Editorial voice: *"people often…"*, never *"you should…"*.
2. No personalised outputs derived from a user's own financial figures.
3. No price predictions, no "hot picks," no urgency/FOMO — in either world.
4. Crypto: only MiCA-licensed platforms; visible risk warning wherever crypto appears.
5. Persistent, honest disclaimer: *"Educational information, not personal financial advice. Investing involves risk, including loss of capital."* (Already on the landing page footer.)
6. Affiliate disclosure wherever a referral link appears.

---

## Open questions for the lawyer (get sign-off on these specifically)

1. **Does our archetype quiz stay outside "personal recommendation"** given: no financial-detail inputs, published personas, and a comparison table decoupled from the result? What's the single change that would most reduce risk here?
2. **Where exactly is the line** between our illustrative "people in this group often choose a globally diversified fund" and a personal recommendation? Can we name example instruments illustratively, or must we stay at the category level?
3. **MiCA marketing:** does an educational app that lists MiCA-licensed exchanges and earns referral fees count as a "marketing communication" for those exchanges — and if so, what obligations attach?
4. **Do we need any registration/authorization at all** to operate as (a) an educational publisher and (b) an affiliate referrer for brokers and MiCA-licensed exchanges, in NL specifically?
5. **RIS finfluencer rules:** what will we need in place (written agreements, disclosures) as those phase in, and does our comparison-table model sidestep or trigger them?
6. **Data/GDPR:** confirm the waitlist + quiz-answer handling is fine at the "no financial data" level we're operating at.

---

## Sources
- [MiFID "personal recommendation" vs generic advice — Freshfields/ESMA](https://riskandcompliance.freshfields.com/post/102ik46/understanding-the-definition-of-investment-advice-under-mifid-esma-revises-13-y)
- [AFM — MiFID II investor protection](https://www.afm.nl/en/sector/themas/belangrijke-europese-wet--en-regelgeving/mifid-ii/bescherming-beleggers)
- [ESMA — MiCA overview](https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica)
- [MiCA crypto advertising rules — Taylor Wessing](https://www.taylorwessing.com/en/interface/2025/regulating-cryptos/regulation-of-crypto-advertising-in-the-eu)
- [MiCA NL/EU deadlines — Sumsub](https://sumsub.com/blog/crypto-regulations-in-the-european-union-markets-in-crypto-assets-mica/)
- [EU Retail Investment Strategy / finfluencer rules — Consilium](https://www.consilium.europa.eu/en/press/press-releases/2025/12/18/retail-investment-strategy-council-and-parliament-agree-on-package-to-empower-consumers-while-boosting-markets/)

*Full market/regulatory context: `market-and-competition-research.md`. Product design principle: `new-investor-app-curriculum.md`.*
