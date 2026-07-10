# Referral Program — engagement-gated by design
*Drafted: 2026-07-10 · Owner decision doc · Not deployed (`*.md` excluded via `.vercelignore`)*

A design decision recorded **before** referrals are built, so the reward is never wired to
raw signup by default. There is no referral feature today and none is scheduled — this doc
exists only to fix one rule in advance. It is a design decision, **not a build ticket**.

## The rule

**A referral reward fires on real engagement by the referred user, never on signup alone.**
Concretely: the reward triggers only once the referred user has **completed the type quiz
AND their first lesson** (`quiz_completed` + one `lesson_completed`). Signup, email confirm,
or app-open do **not** qualify.

## Why (from the research)

Unconditional referral rewards attract low-quality "bonus hunters" who sign up for the
incentive and never engage; comparator consumer-finance apps that gated rewards on a
genuine engagement action saw materially better retention and lower cost-per-retained-user.
Gating on quiz + first lesson ties the payout to the same activation behavior the retention
gate already treats as the core funnel (`phase-gate.md`, metric #5).

## Proposed analytics event

One new event, following the existing `<noun>_<past-tense-verb>` convention in
`app/src/lib/analytics.ts`:

- **`referral_qualified`** — fires when a referred user crosses the engagement bar
  (quiz + first lesson), i.e. the moment a reward becomes payable. (Alt name if preferred:
  `referral_activated`.)

Not needed until build: any `referral_created` / `referral_reward_granted` events — scope
those when the feature is actually specced.

## Explicitly NOT part of this doc

No schema/table, no `users`-table columns, no invite-code UI, no reward mechanic, and no
analytics wiring happen until referrals are actually prioritized. When that day comes, this
rule is the starting constraint, not a greenfield decision.

## Related

- Revenue model this would support: `revenue-stream-options.md` (Option A).
- Freemium tier + hard rules the reward must respect (comparison neutrality, free core):
  `subscription-plan.md`.
- Why growth mechanics stay gated on proven retention first: `phase-gate.md`.
