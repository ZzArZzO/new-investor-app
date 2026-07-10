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

Deliberately not on mobile (see repo plan): Plus surface, Formspree captures, in-app privacy page, analytics.
Next phase: auth (email + Google + Apple) + progress sync against the web API, then store launch prep.

## Run

```bash
npm install
npx expo start        # scan QR with Expo Go
```

`npx tsc --noEmit` typechecks; `npx expo export --platform android` verifies the bundle.
