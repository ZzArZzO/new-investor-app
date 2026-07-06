# Phase 0 — Launch Kit (demand validation)

**Goal:** find out if strangers want this *before* you build it. Target: **≥300 visitors** to the landing page and a **signup rate ≥11%** (waitlist median). Below ~5% = fix the message or the audience before spending more time.

Everything here is free or near-free. Total time to go live: ~1–2 hours.

---

## Step 1 — Wire up email capture (10 min, free)

The landing page (`landing/index.html`) has a waitlist form. It needs a place to send emails. Easiest free option:

**Formspree** (free tier: 50 submissions/month — enough to start):
1. Sign up at [formspree.io](https://formspree.io), create a new form, copy your form ID (looks like `xryzabcd`).
2. In `landing/index.html`, find **both** occurrences of `REPLACE_WITH_YOUR_FORM_ID` and replace with your ID.
   (There are two forms — the hero and the final CTA. Replace both.)
3. Done. The hero form shows an inline "you're on the list" message; the second does a normal submit.

**Alternatives if you prefer:** [Tally](https://tally.so) (free, unlimited, embed a form), [Google Forms](https://forms.google.com) (100% free, less pretty), or Buttondown/beehiiv if you want it to double as a newsletter list from day one.

> Tip: if you already know you want a newsletter later, use beehiiv or Buttondown now so the waitlist *is* your mailing list — no migration later.

## Step 2 — Deploy the page (15 min, free)

You build it yourself, so pick whichever is fastest for you:

- **Vercel** (recommended — you have the tooling): drag the `landing` folder into a new Vercel project, or `vercel deploy` from inside it. Free, gives you a `something.vercel.app` URL instantly. Add a custom domain later if you want.
- **Netlify Drop**: drag the `landing` folder onto [app.netlify.com/drop](https://app.netlify.com/drop). Live in seconds.
- **Cloudflare Pages / GitHub Pages**: also free.

A custom domain (e.g. `.nl` or `.eu`, ~€10–15/yr) makes it look more credible but is **optional** for the test.

## Step 3 — Add analytics (5 min, free)

You need to know visitor count to compute the signup rate.

- **Vercel Analytics** — one toggle if you deploy on Vercel. Easiest.
- **Plausible** free trial / **Cloudflare Web Analytics** (free, privacy-friendly, no cookie banner needed) — add the snippet before `</head>`.

What to track: **unique visitors** and **form submissions**. Signup rate = submissions ÷ unique visitors.

---

## Step 4 — Drive traffic (organic, €0)

Post in communities where first-time EU investors already hang out. **Don't spam** — lead with value, mention the waitlist once, genuinely reply to comments. Space posts out over a few days across different communities.

Post across **both** investing and crypto communities and note which converts better — that's a free read on whether investing or crypto is your stronger acquisition hook.

### Where to post
- **Investing — Reddit:** r/DutchFIRE, r/eupersonalfinance, r/Netherlands, r/beleggen (Dutch), r/investingforbeginners
- **Crypto/blockchain — Reddit:** r/CryptoCurrency (beginner/daily threads), r/BitcoinBeginners, r/CryptoCurrencyMeta beginner spaces, r/ethfinance, relevant EU crypto subs — lead with the *honest, learn-the-risks* angle, which stands out in these communities
- **Facebook groups:** EU personal-finance, FIRE, and crypto-beginner groups
- **Discord/Slack:** personal-finance, FIRE, and beginner-crypto servers
- **Your own network:** WhatsApp/LinkedIn — friends who've said "I want to start investing but don't know how" *or* "I want to get into crypto but don't want to get scammed" are your perfect first testers

> Read each community's self-promotion rules first. Some require a "feedback wanted" framing rather than a launch announcement — the post below is written that way on purpose.

> Tip: tune the framing to the community. In investing subs, lead with the investing line; in crypto subs, lead with the *honest, no-scam, learn-the-risks* crypto line. Same product, different door in.

### Post A — "feedback" framing (best for strict subs)

> **Building a calm, no-hype way to learn investing *and* crypto for first-timers in Europe — would love a gut check**
>
> I keep meeting people (myself included, a while back) who *want* to start investing or get into crypto but bounce off — the stocks apps ignore crypto, the crypto world is full of hype and people trying to sell you something, and nobody slows down to honestly explain what you're actually doing.
>
> So I'm building the opposite: a short course (~5 min lessons) that covers both worlds from zero — the foundations, traditional investing, and a straight, no-hype take on crypto/blockchain *including* the risks — built specifically around EU rules and only regulated, licensed platforms.
>
> One-page description here: https://new-investor-app.vercel.app
>
> Does this resonate, or is it solving a problem you don't think people have? Honest feedback very welcome — including "this already exists, use X."

### Post B — shorter, more direct (for relaxed communities)

> **A calm "learn before you invest" course covering investing *and* crypto — for first-timers in Europe**
>
> Most apps push you to deposit first and learn later — and make you pick a "stocks app" or a "crypto app." I'm building the reverse: short lessons that take you from zero across both worlds, with an honest, no-hype take on crypto's risks, built around EU tools and rules.
>
> Early access + a say in what gets built if you join the waitlist: https://new-investor-app.vercel.app
>
> Happy to answer anything about the approach in the comments.

### Post C — LinkedIn / personal network

> I'm working on a side project: a calm, jargon-free way for people in Europe to actually understand investing *and* crypto before risking any money — short lessons from zero, with a straight take on crypto that doesn't pretend the risks aren't real.
>
> If you (or someone you know) has ever said "I want to start investing but it's overwhelming" or "I want to get into crypto but I'm scared of getting scammed," I'd love for you to join the waitlist and tell me what you'd want from it: https://new-investor-app.vercel.app

---

## Step 5 — Track the result (go/no-go)

Keep a simple tally (a note or spreadsheet):

| Metric | Target | Actual |
|---|---|---|
| Unique visitors | ≥ 300 | |
| Waitlist signups | — | |
| **Signup rate** | **≥ 11% = strong · 5–11% = promising · <5% = rework** | |
| Best-performing community | (note which) | |
| Common objection in comments | (note it) | |

**What each outcome means:**
- **≥11%** → real demand. Move to Phase 1 (write Modules 0–3) and trigger the legal consult.
- **5–11%** → promising but the message or audience may be slightly off. Try a second round with tweaked copy/positioning before committing.
- **<5%** → the offer isn't landing. Before building anything, figure out why from the comments — wrong audience, unclear value, or a real "this already exists" problem.

Also read the **comments** as data, not noise: the objections people raise are your Phase 1 content and your positioning fixes.

---

## Notes / guardrails

- The page footer already carries an **educational-not-advice disclaimer** — keep it on every version. Good habit to start now, and it costs nothing.
- Don't buy ads yet. Prove it works organically first; paid traffic just tells you if you can *rent* attention, not whether the idea is good.
- Keep the landing page copy honest — no fake "10,000 users" or invented testimonials. It'll bite you later and it's not who you want to be.
- Save every email address properly (GDPR: you're collecting personal data — a one-line "we'll only email you about this project" is enough at waitlist stage, and the form microcopy already says that).
