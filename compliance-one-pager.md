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
| Only ever reference **MiCA-licensed** exchanges (verify on the **ESMA central CASP register** — the master CSV, not a mirror) | Link to or name an unlicensed/offshore exchange |
| "Fair, clear, non-misleading" — sober tone | Hype, urgency, "top coins to buy now," FOMO |
| Teach self-custody & scam-avoidance | Give a specific "buy this coin" instruction |
| Show a visible "you can lose everything" note wherever crypto tools appear | Bury or omit the risk warning |

**Hard rule:** before any crypto exchange appears in a comparison or referral, confirm it holds a current CASP authorization (public register / ESMA). Re-check periodically — authorizations change.

**Verification status (last done 2026-07-09).** All 6 exchanges currently listed — Bitvavo, Finst, Kraken, Coinbase, Bitpanda, Bitstamp — were confirmed against the **ESMA central CASP register** (master CSV on esma.europa.eu, ~336 authorised CASPs), matched by legal entity, LEI, home regulator, authorization date, and service scope, and corroborated by the [AMF France CASP white list](https://www.amf-france.org/en/warnings/white-lists/daspcasp/) plus the Austrian FMA notice for Bitpanda. Full evidence (entities, LEIs, dates, per-exchange caveats) lives in `comparison-table-draft.md` §2. Two entity-identity points that matter for the record: Coinbase's CASP is held by **Coinbase Luxembourg S.A.** (CSSF), *not* "Coinbase Europe Limited" (a pre-MiCA DASP registration); Kraken's is **Payward Europe Solutions Limited** (Central Bank of Ireland), distinct from a separate *Payward Global Solutions Ltd*. ESMA refreshes the CSV weekly — **re-verify before any formal/legal sign-off.**

---

## Regime 3 — GDPR: the personal-data line

> **New since this doc was first drafted.** The original version assumed a "no personal data beyond a waitlist email" footprint. That's no longer true: optional user accounts now exist in the app (`app-mvp` branch) — email addresses, bcrypt password hashes, Google OAuth identities, and a per-user JSON blob of app progress, all persisted in a Postgres database. That is a materially larger GDPR surface, and it means we are acting as a **data controller**, not just a mailing-list holder. Everything below is our own reasoning for the lawyer to confirm — **not** a legal conclusion.

**The rule (one line).** GDPR governs any processing of EU residents' personal data. A controller needs a **lawful basis** for each processing purpose, must honour **data-subject rights** (access, deletion, portability), must have a **contract (DPA)** with each processor it sends data to, and must be able to handle a **breach** within 72 hours.

**Where we stand today (to confirm):**
- **What we hold.** Waitlist emails (Formspree); and for account-holders: email, bcrypt password hash, Google OAuth profile, and app-progress state (lessons done, streaks, self-entered holdings labels/amounts). Note: holdings amounts are user-entered figures — sensitive-adjacent, though not special-category data.
- **Lawful basis (our reading).** Account creation and sync = **performance of a contract** (the user asked us to store their progress). Retention emails (streak nudges, weekly digest via Resend) = **arguably consent or legitimate interest** — this is the softest spot; confirm whether an explicit opt-in and a working unsubscribe are required before we send.
- **Deletion is already built.** `DELETE /api/account` erases the user row and cascades to sessions, accounts, and app-state (`onDelete: "cascade"` in the Drizzle schema). That satisfies the *mechanism* of the right-to-erasure; confirm the *policy* around it (timeframe, backups, Formspree-side deletion).

### Do / Don't (GDPR)

| ✅ Do | ❌ Don't |
|---|---|
| Name every subprocessor in a privacy policy (see list below) | Send user data to a tool without a DPA in place |
| Keep the built-in account-deletion path working and discoverable | Treat "delete my account" as a support-ticket afterthought |
| State a clear lawful basis + retention period per data type | Keep data "just in case," with no stated purpose or expiry |
| Make retention emails opt-out (unsubscribe in every send) | Assume account signup = consent to marketing email |
| Store only what the feature needs (email + progress) | Collect financial-detail fields we've deliberately avoided (keep it that way) |

**Subprocessors to disclose (verify each has a DPA / SCCs where data leaves the EU):**
- **Neon** (Postgres hosting — where accounts + app-state live)
- **Resend** (transactional/retention email — receives account email addresses)
- **Google** (OAuth sign-in — identity only)
- **Vercel** (hosting + Web Analytics — cookieless/aggregate, but confirm)
- **Formspree** (waitlist capture — receives emails; separate from accounts)

**Hard rule:** a public **privacy policy** listing what we collect, why, the lawful basis, the subprocessors above, and how to delete an account must be live **before** the app is promoted from Preview to a public production URL.

**Status (2026-07-10): finalized.** `/privacy` names the controller (Afonso Jose Carvalho
Marques da Costa, individual), all five subprocessors, lawful bases, retention, and rights.
Retention emails now have a real opt-out (Settings → Email preferences, honored by both
crons; every email points to it) — closing the consent soft spot flagged below. Remaining
before public launch: **create the `privacy@newinvestor.app` ImprovMX alias** (address is
published but the mailbox doesn't exist yet), and the queued lawyer review.

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
6. **Data/GDPR — waitlist tier:** confirm the waitlist email + quiz-answer handling is fine at the "no financial data" level (this was the whole GDPR question when the doc was first written).
7. **Data/GDPR — accounts tier (new):** now that real accounts exist (email, password hash, Google OAuth, app-progress incl. user-entered holding amounts — see "Regime 3" above), confirm: (a) our lawful-basis reading per purpose, especially whether retention emails need explicit opt-in consent vs. legitimate interest; (b) that the built-in `DELETE /api/account` erasure + a privacy policy naming Neon/Resend/Google/Vercel/Formspree is sufficient before public launch; (c) whether user-entered holding amounts raise the data-sensitivity bar at all. **Blocking item: no privacy policy exists yet.**

---

## Sources
- [MiFID "personal recommendation" vs generic advice — Freshfields/ESMA](https://riskandcompliance.freshfields.com/post/102ik46/understanding-the-definition-of-investment-advice-under-mifid-esma-revises-13-y)
- [AFM — MiFID II investor protection](https://www.afm.nl/en/sector/themas/belangrijke-europese-wet--en-regelgeving/mifid-ii/bescherming-beleggers)
- [ESMA — MiCA overview](https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica)
- [MiCA crypto advertising rules — Taylor Wessing](https://www.taylorwessing.com/en/interface/2025/regulating-cryptos/regulation-of-crypto-advertising-in-the-eu)
- [MiCA NL/EU deadlines — Sumsub](https://sumsub.com/blog/crypto-regulations-in-the-european-union-markets-in-crypto-assets-mica/)
- [EU Retail Investment Strategy / finfluencer rules — Consilium](https://www.consilium.europa.eu/en/press/press-releases/2025/12/18/retail-investment-strategy-council-and-parliament-agree-on-package-to-empower-consumers-while-boosting-markets/)

*Full market/regulatory context: `market-and-competition-research.md`. Product design principle: `new-investor-app-curriculum.md`.*
