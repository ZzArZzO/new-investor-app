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

> Read each community's self-promotion rules first. Some want a genuine question, not a launch announcement. The posts below are written that way.

> Tip: lead with the investing angle in investing subs, and the honest/no-scam crypto angle in crypto subs. Same product, different way in.

### Post A — r/BitcoinBeginners (crypto angle)

**Title:** Building an honest way to learn crypto (and investing) for total beginners in Europe. Does this sound useful or pointless?

> Most "learn crypto" stuff out there is either pure hype or someone trying to shill you a coin. I got sick of it so I started building the opposite.
>
> It's short lessons, like 5 minutes each, that actually explain what blockchain and crypto are, how wallets and exchanges work, how not to get scammed, and why keeping crypto to a small amount you can afford to lose is the sane move. It's built around EU rules and only ever points to MiCA licensed platforms. No coin recommendations, ever.
>
> I put up a quick page here if you want a look: https://new-investor-app.vercel.app
>
> Would this have actually helped you when you were starting out, or is it a waste of time? Genuinely want the honest version, even if it's "this already exists, go use X".

### Post B — r/DutchFIRE (investing angle)

**Title:** I'm building a calm way to learn investing and crypto from scratch, for people in Europe. Would love a gut check

> A while back I really wanted to start investing but every app just wanted me to deposit money and figure it out later. Nobody actually slowed down to explain what I was doing first. Crypto was even worse, just hype and people selling stuff.
>
> So I started building the thing I wish I'd had. Short lessons that take you from knowing nothing to actually making your first move, whether that's stocks or crypto. Built around how things work in Europe, and it only points to regulated, licensed platforms. No hype, no hot tips.
>
> Quick one page description here: https://new-investor-app.vercel.app
>
> Does this resonate, or am I solving a problem nobody really has? Tell me straight.

### Post C — LinkedIn / personal network

> Been working on a side project. A calm, no jargon way to actually learn investing and crypto before putting real money in. Short lessons, built around how things work in Europe, nothing pushy.
>
> If you've ever thought "I want to start investing but it's overwhelming" or "I want to get into crypto but I don't want to get scammed", I'd genuinely love for you to take a look and tell me what you think: https://new-investor-app.vercel.app

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
