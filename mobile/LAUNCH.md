# Mobile launch checklist

Status as of 2026-07-10. Scope decisions: store launch target, sync before release,
auth = email + Google + Apple, no Plus surface on mobile (see repo plan / README).

## Done

- [x] **Phase 1 — feature parity, device-local** (commit `daa2847`)
      Tracker (holdings, DCA log, donut), home cards (today's scam, tracker snapshot,
      action checklist, this-week), persona type pages, settings with backup export.
- [x] **Phase 2 — accounts + sync** (commit `9d3cbea`)
      Server: `/api/mobile/{login,register,google,apple}` JWT endpoints; state/account
      routes accept bearer tokens alongside web sessions.
      Mobile: SecureStore auth, sign in/up UI, email-pref toggles, delete account,
      sync (migrate-on-first-login, server wins, debounced PUT, offline fallback).
      E2E-verified against local `next dev`; 124 web tests pass.

## Phase 3 — store launch (not started)

External / user actions:
- [ ] Apple Developer enrollment (€99/yr) — days of lead time, start early
- [ ] Google Play Console ($25 one-time)
- [ ] Privacy policy lawyer review + create `privacy@newinvestor.app` alias
      (pre-existing blocker, also gates web launch — noted in `app/src/app/(main)/privacy/page.tsx`)

Config (needs the accounts above):
- [ ] Google OAuth client IDs (iOS + Android) → `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID`,
      `EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID` (mobile) and `GOOGLE_IOS_CLIENT_ID`,
      `GOOGLE_ANDROID_CLIENT_ID` (server env — token audiences)
- [ ] `APPLE_BUNDLE_ID` (server env) — must match `ios.bundleIdentifier`
- [ ] `EXPO_PUBLIC_API_URL` pointed at the deployed web app for release builds

Build & test:
- [ ] `ios.bundleIdentifier` + `android.package` + version/build numbers in `app.json`
- [ ] `eas.json` with development / preview / production profiles
- [ ] EAS preview build on a real phone (Expo Go can't run SDK 57 on the user's device,
      and Google/Apple sign-in need a dev build anyway)
- [ ] Google + Apple sign-in verified end-to-end on device
- [ ] App icons + splash in Calm Clarity (all assets under `assets/images/` are still Expo template)

Store submission:
- [ ] App Store listing + privacy nutrition labels (data: email, app-state blob; no tracking)
- [ ] Play listing + Data Safety form
- [ ] Account deletion reachable in-app — done (settings), verify in review notes
- [ ] TestFlight + Play internal track before public release

## Explicitly out of scope for v1

Plus/upgrade surface, Formspree email captures, in-app privacy page (links to web),
client analytics, import-state UI, theme toggle.
