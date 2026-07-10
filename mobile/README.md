# New Investor — Mobile (Expo)

Native iOS/Android app (Expo SDK 57, expo-router) sharing all lesson content and pure logic with the web app.

## Shared code

`./shared` is a junction/symlink to `../app/src`, created by `scripts/link-shared.js` on `npm install`.
tsconfig paths map the same aliases the web app uses:

- `@/content/*` → `shared/content/*` (lessons, quiz, brokers, glossary, badges, …)
- `@/lib/*` → `lib/*` first (mobile theme, AsyncStorage state), then `shared/lib/*` (app-state-logic, tool-math, date)
- `@/*` → project root (mobile components/screens)

Content edits in `app/src/content` show up here with no extra steps. Never edit files through `shared/` — that's the web app's tree.

## Structure

- `app/(tabs)/` — Home, Lessons, Tools (menu), Compare
- `app/lesson/[id].tsx` — lesson reading + quick check (native HTML-lite renderer, glossary tap-to-define, embedded tool)
- `app/quiz.tsx` + `app/result.tsx` — investor-type onboarding flow
- `app/review.tsx` — spaced-repetition session (due cards + glossary top-ups, daily cap)
- `app/tool/[id].tsx` — all 5 tools via `components/tools/tool-registry`
- `lib/theme.ts` — Calm Clarity palette (light/dark), Fraunces + Inter
- `lib/app-state.tsx` — AsyncStorage-backed port of the web `useAppState` (same `ni_state_v1` shape, same reducers)

- `app/tracker.tsx` — portfolio tracker (holdings, DCA contribution log, allocation donut)
- `app/types/` — persona profile pages; `app/settings.tsx` — backup export (account sync = phase 2)

- `lib/auth.tsx` + `lib/api.ts` — account sign-in (email/password + Google + Apple) against the web app's
  `/api/mobile/*` JWT endpoints; token in SecureStore; progress syncs to `/api/state` (same protocol as web:
  migrate-on-first-login, server wins, debounced PUT)

Deliberately not on mobile (see repo plan): Plus surface, Formspree captures, in-app privacy page, analytics.

## Config for device testing / release

- `EXPO_PUBLIC_API_URL` — web app URL (LAN IP for local testing; deployed URL for builds)
- `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID` / `EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID` — Google sign-in (button hidden if unset)
- Server side needs `GOOGLE_IOS_CLIENT_ID`/`GOOGLE_ANDROID_CLIENT_ID` (token audiences) and `APPLE_BUNDLE_ID`

Next phase: store launch prep (icons, EAS builds, store forms).

## Run

```bash
npm install
npx expo start        # scan QR with Expo Go
```

`npx tsc --noEmit` typechecks; `npx expo export --platform android` verifies the bundle.
