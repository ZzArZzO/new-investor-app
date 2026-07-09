# Content Gap Research — what to teach next
*Drafted: 2026-07-10 · Research doc · Not deployed (`*.md` excluded via `.vercelignore`)*

> **Status: top 5 implemented (2026-07-10).** Two new tracks in
> `app/src/content/lessons.ts`: 🛡️ Protections & traps (l23 KID/factsheet, l24 broker-bust
> protections, l25 CFD/leverage — all free) and 🏛️ Taxes & pensions (l26 EU tax four
> questions, l27 three pillars + PEPP — both Plus). Plus 13 new glossary terms and 6 daily
> cards. Items 6–15 remain the second-wave backlog.

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
12. **Your rights as an EU investor** — why the MiFID appropriateness quiz exists, complaints → ombudsman → NCA (Free, Starter)
13. **Insurance & safety nets** — named OECD topic missing between emergency fund and budgeting (Premium; MED compliance, stay conceptual)
14. **Big-goal saving: house deposit vs investing, horizon buckets** — constant beginner question "need it in 4 years, ETFs?" (Premium, Autopilot)
15. **Money market funds & cash yield** — MMF vs savings vs broker interest, DGS coverage differences (Premium, Starter + Autopilot)

## Strategic notes

- Free/premium logic held throughout: **safety and trust content free** (2, 3, 4, 7, 8, 12), **depth premium** (1, 5, 6, 9–11, 13–15)
- Top 5 all close the OECD "financial landscape" + "risk & reward" gaps — fastest route to full framework coverage (worth citing on a methodology page later)
- Item 4 (CFD warning) + item 8 (finfluencer mechanics) complete the Thrill Chaser persona story started in persona-research.md
- Item 1 (taxes) is the EU-generic version of the deferred per-country tax tracks — teaches the concepts that exist everywhere, country packs remain the localization play (phase-gate metric #7)

Key sources: OECD/EC Financial Competence Framework for Adults · Eurobarometer FL525 ·
ESMA CFD intervention data + social-media recommendations warning · EC investor-compensation
& DGS pages · EIOPA PEPP reform · CFA Institute Gen Z & Investing · competitor curricula
(Finelo, Investmate, Zogo, Bloom, Khan, Morningstar). Full URLs in research transcript.
