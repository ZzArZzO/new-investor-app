# Mobile launch checklist

Status as of 2026-07-16. Scope decisions: store launch target, sync before release,
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
- [x] **Store config + UI polish pass** (commits `c729ea0`…`aa68b4f`)
      app.json: bundle IDs (`app.newinvestor.mobile`), build numbers, Apple Sign-In
      plugin + entitlement, encryption-exempt flag, brand adaptive-icon color, dark
      splash variant, predictive back. `eas.json` with dev/preview/production profiles
      (env values still placeholders). `api.ts` requires https in release builds.
      Privacy-policy link in settings (links to web `/privacy`).
      UI: keyboard handling on all forms, expo-haptics throughout, loading skeletons
      instead of blank hydration gates, reanimated motion (progress fill, feedback,
      quiz steps, toast), shared SegmentedControl/StatTile/Toast, a11y states +
      44pt targets + Android ripple + font-scaling cap, lessons SectionList,
      memoized app-state context.

## Phase 3 — store launch (remaining)

External / user actions:
- [ ] Apple Developer enrollment (€99/yr) — days of lead time, start early
- [ ] Google Play Console ($25 one-time)
- [ ] Privacy policy lawyer review + create `privacy@newinvestor.app` alias
      (pre-existing blocker, also gates web launch — noted in `app/src/app/(main)/privacy/page.tsx`)

Config (needs the accounts above; fill the placeholders in `eas.json`):
- [ ] Google OAuth client IDs (iOS + Android) → `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID`,
      `EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID` (eas.json) and `GOOGLE_IOS_CLIENT_ID`,
      `GOOGLE_ANDROID_CLIENT_ID` (server env — token audiences)
- [ ] `APPLE_BUNDLE_ID` (server env) — must equal `app.newinvestor.mobile`
- [ ] `EXPO_PUBLIC_API_URL` in eas.json pointed at the deployed web app (https required,
      release builds throw otherwise)

Build & test:
- [x] `ios.bundleIdentifier` + `android.package` + version/build numbers in `app.json`
- [x] `eas.json` with development / preview / production profiles (env placeholders remain)
- [ ] EAS preview build on a real phone (Expo Go can't run SDK 57 on the user's device,
      and Google/Apple sign-in need a dev build anyway)
- [ ] Google + Apple sign-in verified end-to-end on device
- [ ] Device polish pass: dark splash (no white flash), keyboard never covers inputs,
      haptics fire, skeletons on cold start, ripple on Android, large-font mode,
      VoiceOver/TalkBack on quiz + settings, predictive back gesture OK (revert
      `predictiveBackGestureEnabled` if transitions glitch)
- [ ] App icons + splash in Calm Clarity (all assets under `assets/images/` are still
      Expo template — deliberately deferred; splash/adaptive colors already branded)

Store submission:
- [ ] App Store listing + privacy nutrition labels (data: email, app-state blob; no tracking)
- [ ] Play listing + Data Safety form
- [ ] Account deletion reachable in-app — done (settings), verify in review notes
- [ ] TestFlight + Play internal track before public release

## Explicitly out of scope for v1

Plus/upgrade surface, Formspree email captures, in-app privacy page (settings links
to the web `/privacy` page), client analytics, theme toggle.
(Import-state UI shipped after all — settings "Restore from a code".)
