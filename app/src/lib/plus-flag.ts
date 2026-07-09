/**
 * Master switch for all Plus fake-door surfaces (locked lessons, upgrade sheet,
 * locked tracker card, review-cap upsell). OFF by default: first launch ships
 * with everything free and no paid tier visible. Set NEXT_PUBLIC_PLUS_FAKEDOOR=1
 * (build-time) to run the willingness-to-pay test later — see subscription-plan.md.
 */
export const PLUS_FAKEDOOR_ENABLED = process.env.NEXT_PUBLIC_PLUS_FAKEDOOR === "1";
