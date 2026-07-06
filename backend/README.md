# Accounts + backend — setup

**Status: foundation only, not provisioned.** This code was written ahead of Phase 0 validation results, at your explicit request — see the guardrails in `phase-0-results-tracker.md` before spending more time here. No cloud project has been created; the app runs exactly as before (localStorage-only guest progress) until you complete the steps below.

## Why Supabase

The rest of the app is a static site (HTML/JS, no server) deployed on Vercel. Supabase gives you real accounts (email magic-link sign-in) and a Postgres database with zero servers to run — the browser talks to Supabase directly over its REST API, protected by Row Level Security (RLS) instead of a custom backend. That fits a pre-validation prototype: minutes to set up, free tier, throw it away with no sunk cost if Phase 0 doesn't validate.

If you'd rather use a different provider (Firebase, PlanetScale + a real API, etc.), the shape is the same: an auth provider + a `lesson_progress` table + RLS-equivalent access control. `lessons/auth.js` is the one file that would need rewriting.

## Setup steps

1. **Create a project** at [supabase.com](https://supabase.com) (free tier is enough for this stage).
2. **Run the schema.** Open the SQL Editor in your project dashboard, paste the contents of `backend/schema.sql`, and run it. This creates `profiles` and `lesson_progress` with RLS policies and an auto-provisioning trigger.
3. **Enable email sign-in.** Authentication → Providers → Email should be on by default. This app uses **magic links** (passwordless) via `signInWithOtp`, not passwords — no reset-password flow to build.
4. **Set the redirect URL.** Authentication → URL Configuration → add your site's URL (e.g. `https://new-investor-app.vercel.app/lessons/` and `http://localhost:8000/lessons/` for local testing) to the allow list, so the magic-link email sends people back to the right place.
5. **Copy your API keys.** Project Settings → API → copy the **Project URL** and the **`anon` `public` key** (not the `service_role` key — that one must never go in browser code).
6. **Fill in `lessons/config.js`:**
   ```js
   window.NI_CONFIG = {
     supabaseUrl: 'https://YOUR-PROJECT.supabase.co',
     supabaseAnonKey: 'YOUR-ANON-PUBLIC-KEY'
   };
   ```
7. Deploy. That's it — no server to run. `lessons/auth.js` detects the config at page load; if it's present, the "Account" section in Settings switches from "not set up yet" to a real sign-in form.

## What's wired up vs. what isn't

- ✅ Sign in / sign out (magic link) on the lessons page
- ✅ Lesson-completion sync: signing in pulls your server-side progress and merges it with whatever's in localStorage; finishing a lesson while signed in writes to `lesson_progress`
- ⛔ Not wired: the landing-page quiz result and "would you pay" answer are still anonymous/local-only — `profiles` intentionally has no columns for them yet. Add columns + writes only once that flow is actually needed; don't carry speculative schema.
- ⛔ Not wired: no admin/analytics view of the data — you'd query it directly in the Supabase dashboard for now.

## GDPR note

Once this is live, `auth.users` and `lesson_progress` hold real personal data (email address, behavior). Supabase's EU region (Frankfurt) keeps data in the EU if you pick it at project creation — do that. You'll also want a privacy-policy line covering this once it's live, consistent with the disclosure style already used for the waitlist form.

## Testing without a live project

`lessons/auth.js` no-ops safely when `lessons/config.js` is left blank — every function returns immediately and the UI shows "accounts aren't set up yet." This was verified with the config left empty (the default in this repo). The actual magic-link + database round trip has **not** been tested against a live Supabase project — do a manual pass after step 7 before trusting it with real users: sign in on two different browsers/devices and confirm progress merges rather than overwrites.
