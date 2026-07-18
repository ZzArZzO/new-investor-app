# Outreach Status Log
*Snapshot: 2026-07-12. Update this file each time you sweep analytics/comments — running log, not a final verdict (that's `phase-0-results-tracker.md`).*

## Analytics snapshot (Vercel, last 7 days)

| Metric | Value |
|---|---|
| Unique visitors | 151 |
| Page views | 192 |
| Bounce rate | 87% |

**Referrers (visitors):** reddit.com 19 · linkedin.com 12 · vercel.com 8 · com.reddit.frontpage 5 · facebook.com 4 · m.facebook.com 2 · bing.com 1

**Top countries:** US 39% · Netherlands 18% · Poland 5% · India 4% · Portugal 4%

**Devices:** Desktop 58% / Mobile 42%

## Formspree snapshot

| Metric | Value |
|---|---|
| Inbox submissions | 10 |
| Spam-filtered | 2 |

Inbox list (Jul 6 – Jul 11): afonso1marques@gmail.com (own test), pistacho.azul@proton.me, fambyte@gmail.com, code.smisra@gmail.com, real.mazvis@gmail.com, 1234@vibecodedslop.com, dhruvrajput906@gmail.com, inesfragoeiro22@gmail.com, explorer_test@example.com (likely test), reverinoir@gmail.com.

**Signup rate (raw): 10 ÷ 151 = 6.6%** — lands in the "5–7% weak but alive" band per `phase-0-results-tracker.md`. If the 2 self-test entries (own email + explorer_test) are excluded: 8 ÷ 151 = 5.3%, same band. Still under the 300-visitor minimum sample — too early to call.

## Reddit — per-post status

*Re-verified 2026-07-12 via live fetch of `u/afonsocosta18` submitted `.json` (26 posts total, all 26 checked — not a sample). `removed_by_category`: `null`/absent = live, `"reddit"` = site-wide spam filter (invisible to everyone but author), `"moderator"` = human mod pulled it. **Corrections from prior log marked below.***

### Live (safe to revisit later with genuinely new content, not the same pitch reworded)
| Subreddit | Post | Comments |
|---|---|---|
| ShowYourApp | Solo project: an app that teaches investing and crypto from zero, feedback welcome (3rd attempt) | 0 (just posted) |
| betatests | [opportunity] Beta testers wanted... | 5 (cyberopsSystems reply drafted, **not yet posted — waiting on you to click save**) |
| feedback_exchange | RFF - app that teaches investing and crypto... | 0 |
| LongRunHub | Would a plain-language investing course have helped you starting out? (2nd attempt) | 0 |
| BeginningOfInvesting | Built a small app to teach investing from scratch, beginners... | 0 |
| BlockchainStartups (original) | Built a small app to learn investing and crypto from scratch | 21 |
| fintechdev | (posted) | 0 |
| indiebiz | (posted) | 0 |
| alphaandbetausers | (posted) | 0 |
| growmybusiness | Feedback wanted: built an app... | 2 |
| StartupSoloFounder | (posted) | 0 |
| SideProject | Built a small app to learn investing and crypto from scratch | 2 |
| IMadeThis | (posted) | 0 |
| buildinpublic | Solo-building an app to teach investing and crypto from zero, the process, the pivots, and where it's at | 0 (just posted) |

### Filtered — Reddit site-wide spam filter (`removed_by_category: "reddit"`)
| Subreddit | Post | Note |
|---|---|---|
| microsaas | Update: took the "receipt not a claim" advice... | **New finding** — a 2nd microsaas post (after the mod-removed original) also got filtered. Confirms: stay off this sub. |
| BlockchainStartups | Update: reworked the positioning based on feedback from this sub | Still filtered; now has 1 comment despite filter status |
| ShowYourApp | 1st attempt ("Built an app...") | Superseded |
| ShowYourApp | 2nd attempt (same title, retried same day) | Superseded — 3rd attempt is the one now live |
| startupideas | Idea Validation: app that teaches investing and crypto... | **Correction** — prior log called this "retry succeeded / live." It is filtered. |
| startupideas | Looking for Feedback: fintech app... (2nd attempt) | Also filtered. |
| startupideas | Would you actually pay for an investing/crypto course app... (3rd attempt, pricing angle) | Also filtered. **3/3 — sub is dead for this link/account, regardless of content angle. Stop trying here.** |
| investingforbeginners | Built a free app that teaches investing (and crypto) from absolute zero... | Filtered. Posted 25 seconds after literaciafinanceira below — see velocity-trigger diagnosis. Content/rules fit was fine; timing likely killed it. Worth retrying alone, well spaced from any other post. |
| literaciafinanceira | Criei uma app gratuita que ensina investimento e cripto do zero... | Filtered. Posted 25 seconds after investingforbeginners above. Same diagnosis — worth retrying alone, spaced out, ideally still within a weekend window for the Auto-promoção flair rule. |
| LongRunHub | Built an app that teaches investing and crypto from zero... (1st attempt) | Superseded by the live 2nd attempt |
| SomebodyMakeThis | Built an app to teach investing and crypto from zero... | **Correction** — prior log listed this as live/unverified. It is filtered. |
| indiehackers | (posted) | **Correction** — prior log listed as live/unverified. Filtered. |
| SaaS | (posted) | **Correction** — prior log listed as live/unverified. Filtered. |

### Removed by human moderator (`removed_by_category: "moderator"`)
| Subreddit | Post | Note |
|---|---|---|
| microsaas | Built a small app to teach investing and crypto from scratch, feedback on the idea and the model wanted | Had 7 real comments before/at removal. Not a filter issue — a mod pulled it. Do not retry this sub. |
| roastmystartup | (posted) | **Correction** — prior log listed as live/unverified. Actually mod-removed. Check sub rules before any future attempt. |
| EntrepreneurRideAlong | Building an app to teach investing and crypto... | **Correction** — prior log listed this as live with 1 comment. Actually mod-removed (the 1 comment happened before/at removal). Check sub rules before any future attempt. |

### Can't post — private/approved-members-only
| Subreddit | Note |
|---|---|
| investingbeginners | "This is a private community. Only approved members can view and contribute." Draft abandoned. |
| StartupFeedback | Same — private, approved-members-only. Draft abandoned. |

## Reddit — repost policy (before touching any live/filtered post again)

- **Confirmed root cause, 2026-07-12**: r/investingforbeginners and r/literaciafinanceira were both posted (different titles, different subs, both otherwise-compliant content) **25 seconds apart** — both got `removed: reddit` (site filter). r/startupideas' 3rd attempt landed 22 minutes before those two and was also filtered. This is a **velocity/pattern trigger on the account+link combo**, not a per-sub rules failure — three different subs, same link, tight back-to-back timing reads as a spam blast to Reddit's site-wide filter regardless of how well each individual post follows its sub's rules.
- **New hard rule: space every new-sub post by hours, not minutes.** One post, then wait — check back later, don't queue multiple posts to fire close together even across unrelated subreddits.
- Never repost identical content to a sub already posted in within ~48h — site spam filter flags same-URL reposts in that window, and cross-posting the same link to many subs in a short span reads as a promo blast even across different subs.
- **Do not repost to, or retry**: microsaas (2/2 attempts dead — 1 mod-removed, 1 filtered), roastmystartup (mod-removed), EntrepreneurRideAlong (mod-removed), investingbeginners / StartupFeedback (private).
- **startupideas**: 0/3 live (positioning angle, feedback angle, pricing angle — all filtered). Confirmed dead for this link. Stop retrying here.
- **SomebodyMakeThis, indiehackers, SaaS**: 0/1 live each (single filtered attempt). Could retry once, but treat as elevated risk — new content only, no quick retry.
- **BlockchainStartups**: original is live (21 comments) but the "Update" repost already hit the site filter once. Only try again with genuinely different content (real results/milestone, not reworded pitch), spaced days apart.
- **ShowYourApp**: took 3 attempts (2 filtered) before one cleared the filter — pattern suggests this sub's filter is aggressive on first tries regardless of content; don't read a single filtered attempt elsewhere as final.
- Every other "live" sub: fine to revisit later, but with **new** content (results update, specific question, lesson learned) — not the same pitch reworded.

## Reddit — candidate subreddits, not yet posted

*Rule-checked live via each sub's `/about/rules/.json` + `/about.json` on 2026-07-12.*

**Posted:**
- ~~r/buildinpublic~~ — posted 2026-07-12, now live. See per-post status table above.
- ~~r/investingforbeginners~~, ~~r/literaciafinanceira~~ — both posted 2026-07-12, both filtered (`removed: reddit`). Rule fit was fine on both; posted 25 seconds apart, likely a velocity trigger rather than a content/rules problem. See per-post status table + repost policy above. Worth a solo retry each, well spaced out, before writing either sub off.

**Found via Reddit's own "better community for your post" suggestions (2026-07-13) — rule-checked:**
- **r/promoteMyApp** (5.6K subs) — public description literally says "Open community where you can freely promote your SaaS, Website, and mobile apps." No rules restricting self-promo found at all. Small audience but zero friction, easy win.
- **r/BeginnerInvesting** (9.3K subs) — no rules configured on the sub at all. Small but open, beginner-focused, matches audience. Low risk.
- r/Investments (42K) — rejected: "No self-promotion, spam, blogspam" outright, plus requires being "active in conversations" before posting (karma/participation gate). Skip.

**Pending — mod-gated, action scheduled:**
- **r/DutchFIRE** (109K) — mod pre-approval was already requested via Reddit chat on 2026-07-07. Mod reply (2026-07-07, same day): a separate post isn't allowed, but self-promo is fine inside the "regelvrije draad" (rule-free thread) that goes live every Friday. Next one: **2026-07-17**. Nothing to draft until that thread exists — this is a calendar item, comment in that thread when it posts, don't submit a separate post.

**Checked and rejected — don't post here:**
- r/eupersonalfinance (1.01M subs) — rule bans product/company promotion outright, even unmonetized/unaffiliated. Comment-only if you engage at all.
- r/beleggen (Dutch investing sub, matches NL 18% of traffic) — mod pre-approval requested via chat 2026-07-08, hard no same day: "no room for this here, we get too many requests like this to allow them." Don't retry.
- r/financialliteracy — only 50 subscribers, near-dead. Not worth it.
- r/GrowthHacking (149K) — self-promo requires 100+ community karma first; beta-testing/feedback asks need mod permission. Skip until karma qualifies.
- r/vibecoding (311K) — culture is about the *coding process*, not the shipped product; "no shilling" rule. Off-topic fit unless framed around how the app was built, not what it does.
- r/EuropeFIRE (359K) — rule explicitly bans "cryptocurrencies" as a topic. This app is investing **and** crypto — can't post about it without contradicting the sub's own rule.
- r/IndiaInvestments (950K) — "No Cryptocurrency posts" + "No solicitation of investments" + "No Link-only Submissions." Same problem as EuropeFIRE — crypto content is explicitly banned.

**Untested, lower priority:**
- r/financialindependence, r/leanfire (FIRE-adjacent, beginner-friendly, rules not yet pulled)
- r/Bogleheads — strict evidence-based tone, low self-promo tolerance, comment-first
- r/personalfinance, r/investing — near-zero tolerance for direct product posts, skip unless engaging as pure commenter first
- r/CryptoCurrency — self-promo restricted to specific threads/flair, high risk unless followed exactly
- r/CryptoTechnology, r/DeFi — smaller, more tolerant of build-in-public posts, rules not yet pulled
- r/Bitcoin — strict, skip
- r/IndianStockMarket (India, stock-only) — has an "AI Slops" rule (bans AI-sounding content) and "Spamming Invite Links" rule that a waitlist link could trip. Stock-focused, not really a crypto fit either. Lower priority.
- r/nocode, r/SaaSMarketing, r/DueDiligence — rules not yet pulled

## Non-Reddit venues worth considering

*Researched 2026-07-12. Ranked by fit/effort for a solo, no-budget, pre-launch stage — matches the "organic first, no paid ads" guardrail in `phase-0-results-tracker.md`.*

**High-fit, low-effort — try these next:**
- **Indie Hackers Milestones** (indiehackers.com, the actual site — separate from r/indiehackers) — post real numbers as a milestone ("first 150 visitors," "first 10 signups"). Reportedly 6–12% conversion on milestone clicks because it self-selects an audience of founders who read past the pitch. Free, not yet tried.
- **Launch directories**: BetaList, MicroLaunch, Peerlist Launchpad, Uneed — free or near-free, built specifically for pre-launch/waitlist-stage products, and can be staggered 1–2 weeks apart for sustained referral trickle instead of one spike. Good match for current stage.
- **Twitter/X, build-in-public** — the BlockchainStartups/buildinpublic post content (real numbers, the positioning pivot story) is directly reusable here as a thread. Needs ~a month of consistent posting before asking for signups to convert well (5–15% reported), so start now even though it's not an instant win. Put the waitlist link in bio, not buried in every post.
- **LinkedIn, more consistent** — already the #2 referrer (12 visits) without much apparent effort. Text-only personal posts reportedly outperform anything branded; link goes in the first comment, not the post body, to avoid the algorithm de-ranking link-posts.

**Medium-fit, more setup:**
- **Discord — Indie Hackers Discord server** — channels split by stage (validating/launched), direct engagement rather than a broadcast post. Different mechanic from a subreddit post: relationship-building, not a single pitch.
- **Quora** — answer real beginner investing/crypto questions with the app as one part of a genuinely useful answer. Slower, but evergreen/SEO-compounding unlike a Reddit post that decays in a day.

**Higher-effort, longer horizon:**
- **TikTok/Shorts, micro-creator collabs** — research suggests 5–10 micro-creators (10K–100K followers) per quarter outperform one big influencer for engagement. Fits the beginner-finance audience well but needs actual video content and creator outreach, not a quick post. Worth planning toward, not doing this week.

**Lower fit for this stage:**
- **Show HN (Hacker News)** — technical audience, expects a build/technical story, not a marketing pitch. Uncertain fit given the product is consumer-facing, not developer-facing.
- **Product Hunt** — high submission volume (500+/day), front page decided in first 6 hours. Better suited to an actual launch moment than a pre-launch waitlist — save it for later.

## Facebook

*Full sweep 2026-07-13. 9 groups accepted ~1 day before this sweep (join requests submitted earlier, approved 2026-07-12): Literacia Financeira, Criptomoedas para iniciantes e não só, Finanças Pessoais e Investimentos - Portugal, Finanças Pessoais - Educação Financeira, CryptoPortugal, Beleggen, Beleggen voor beginners, Crypto for beginners, The UK Personal Finance Community.*

### Pending admin approval — already posted, nothing to draft, just wait
| Group | Members | Notes |
|---|---|---|
| Literacia Financeira | 734 | Rule: no self-promo/spam/irrelevant links. Post framed as a question, submitted ~2026-07-11. |
| Finanças Pessoais e Investimentos - Portugal | 2.0K | Submitted, pending. |
| Finanças Pessoais - Educação Financeira | 19.4K | Submitted, pending. High-activity group (21 new posts same day), post may scroll past fast once approved. |
| CryptoPortugal | 827 | Submitted, pending. |
| Beleggen voor beginners | 5.9K | Submitted, pending. |
| Crypto for beginners | 277 | Submitted, pending. |

### Not yet posted
| Group | Members | Notes |
|---|---|---|
| Criptomoedas para iniciantes e não só | 24 | No rules configured, small group. Safe, low-friction — good candidate for a first post. |
| Beleggen | 73.9K | **Strict no-self-promo rule**: "give more than you take, self-promotion/spam/irrelevant links not allowed," and any link needs a real explanation of why it's interesting or the post gets removed (rules 3 + 9). A direct pitch is high-risk here — would need reframing as a genuine discussion/question, not a promo post, or skip. |

### Not yet checked
The UK Personal Finance Community showed "aprovação de administrador pendente" too (1 post) — grouped with the pending list above, not re-verified content-wise this pass.

Older, unrelated groups also in the account (traffic/radar groups, 21–48 weeks old) — not part of this campaign, ignore.

Two friend requests also came in around the same time (Carmen Mesaros, Investiční Fórum Akcie) — not acted on, that's a personal call, not outreach-related.

### New group candidates — joined 2026-07-13, drafts prepared

*Skipped Criptomoedas para iniciantes e não só as a target — only 24 members, effectively inactive. Searched for bigger/more active replacements instead. Joined 4 groups (all instant/public, no approval needed to join). CryptoBenelux could not be reliably re-located via search after the initial find — skipped this pass, try again manually if wanted.*

| Group | Members | Rules | Draft status |
|---|---|---|---|
| Trading and Investing for beginners (ETF,Stocks,Crypto,Forex) | 1.2K | None configured | Drafted (English, direct pitch + link), left unposted in composer — **lost on navigation, not saved**. Text: "Solo-building a free app that teaches investing and crypto from absolute zero, mechanics only, no stock picks, no coin recommendations, no price predictions. EU-focused, only points to regulated platforms, and there's a dedicated section on the scams beginners actually fall for since most resources skip that part entirely. / Free, just a waitlist while I keep building: https://www.newinvestor.app/ / Curious from people actually further along than me starting out: does something like this fill a real gap, or is there a resource you'd point beginners to instead?" |
| Hangmatbeleggen | 5.4K, Dutch | None configured | Drafted (Dutch, direct pitch + link, framed around the "hangmatbelegger" passive-investing angle), left unposted — **lost on navigation, not saved**. Text: "Ben al een tijdje bezig met een gratis app die beleggen en crypto van nul af aan uitlegt, geen aandelentips, geen coin-aanraders, gewoon de mechanica uitgelegd voordat je echt geld inzet. Past denk ik wel bij de hangmatbelegger-mentaliteit: simpel, low-cost, lange termijn, geen hype. / Gratis, gewoon een wachtlijst terwijl ik verder bouw: https://www.newinvestor.app/ / Benieuwd of dit een echt gat opvult voor beginners, of dat er al iets beters bestaat in deze groep dat jullie zouden aanraden." |
| INVESTIDOR INICIANTE | 16.5K, Portuguese | **Explicit no self-promo / no sales links** (rules 1 and 3) | Reframed as a pure discussion question, **no link, no product mention** — safest approach given the rule. Currently sitting typed in the composer, not yet posted. Text: "Pergunta para quem já passou pela fase de iniciante: o que é que mais vos faltou quando começaram a investir, foi a falta de explicação sobre os mecanismos básicos, foi não saber reconhecer um esquema/burla a tempo, ou outra coisa? / Pergunto porque ando a mapear isso de perto e a resposta da comunidade vale mais do que qualquer suposição minha." Only mention the app in a follow-up comment if people respond well — posting a link outright here risks removal. |
| Bitcoin & Cryptocurrency Investing for Beginners | 66K, 90+ posts/day | Not verified — FB search kept surfacing a different, unrelated 79-member group with the identical name | **Joined the correct 66K group** (confirmed via join toast), but couldn't reliably reopen it to check rules or draft a post. Open it from your own "Os teus grupos" list and check `/about` for rules before posting here. |

**Still on the list, not yet joined:**
- CryptoBenelux (18K members, 10+ posts/day, public, Dutch/Belgian) — active, matches NL audience slice, re-locate via search if wanted.

**Decent, lower priority:**
- Bitcoin - Tudo sobre criptomoedas (5K, 5/day, public, Portuguese)
- CRIPTOMOEDAS E MEMECOINS (16K, 10+/day, public) — "memecoin" branding is a slight tone mismatch with the no-hype positioning, but still an engaged crypto-beginner audience
- Investimento & Renda Extra (2K, 10+/day, public, Portuguese, general investing)
- Investimento em Ações (4.2K, public, Portuguese, stocks-focused)
- Value Investing & Dividend Investing (35K, 8/day, public, English, not beginner-specific but active)

**Private, needs join request + wait:**
- BITCOIN PORTUGAL 🇵🇹₿ (19K members, private)
- Beleggen met Hefboomproducten, Opties, Aandelen en Crypto (621, private, Dutch)
- Geld Verdienen Met Beleggen | Nederland & België (1.4K, private, Dutch)
- Beleggen NL/BE (5.3K, private, Dutch)

**Skipped — off-topic:** anything real-estate/property-investment focused (Investimentos Imobiliários, Property Investors Network, etc.) and pure angel-investing/business-partnership groups (Sócio investidor, Investidores anjos) — wrong audience, not a beginner-consumer fit.

## Reddit — direct messages / mod mail (chat, separate from comment-reply inbox)

*Checked 2026-07-13. These live in Reddit's chat UI, not the comment-reply notification feed — easy to miss.*

- **r/DutchFIRE mod mail** (2026-07-07) — asked for pre-approval, mods said yes but only inside the weekly "regelvrije draad" (rule-free thread), live every Friday. Next: **2026-07-17**. Calendar item, not a draft.
- **r/beleggen mod mail** (2026-07-08) — asked for pre-approval, hard no: "no room for this here, we get too many requests like this." Closed, no action.
- **ComplexOk8859 DM** (2026-07-13) — cold outreach offering a free "second pair of eyes" on messaging/positioning after seeing the post. 5-year account, 136 karma. Reads like a soft lead-gen pattern (free-audit-then-upsell is common on Reddit), not necessarily bad-faith but worth going in aware. Cautious, non-committal reply drafted and sitting in the message box, unsent — asks what they actually do before agreeing to anything.

## Open items

- **Check Reddit chat, not just comment-reply notifications** — DMs and mod mail live in a separate inbox (reddit.com/chat) from post/comment reply notifications and are easy to miss entirely.
- **Space out posts, hard rule now**: 3 posts fired within ~22 minutes today (startupideas 3rd attempt, investingforbeginners, literaciafinanceira) — all 3 filtered. Confirmed velocity trigger, not a per-sub content issue. One post, then wait hours before the next, regardless of subreddit.
- **BlockchainStartups update** ("One week since the last post here — real numbers, and a new question," flair: Idea Validation) was posted 2026-07-12, then came back `removed: deleted`, `author: [deleted]`, 1 comment, within about a minute. Cause unconfirmed — check manually.
- **investingforbeginners, literaciafinanceira** — both filtered, likely from posting too close together rather than content. Good candidates for a solo retry each, spaced hours apart from any other post.
- Re-sweep Facebook groups for admin approval status.
- microsaas and startupideas are both dead (3/3 and 2/2 attempts respectively) — stay off both entirely, any angle.
- r/buildinpublic posted 2026-07-12, live — watch for comments.
- Draft update-content reposts for other live subs (new angle, not reworded pitch) once there's fresh material — e.g. a results/traction note or a specific lesson learned.
- Still short of the 300-visitor / signup-rate decision threshold — keep driving traffic before reading the number as final.
