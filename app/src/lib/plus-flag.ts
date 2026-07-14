/**
 * Master switch for all Plus fake-door surfaces (locked lessons, upgrade sheet,
 * locked tracker card, review-cap upsell). OFF by default: first launch ships
 * with everything free and no paid tier visible. Set NEXT_PUBLIC_PLUS_FAKEDOOR=1
 * (build-time) to run the willingness-to-pay test later, see subscription-plan.md.
 */
export const PLUS_FAKEDOOR_ENABLED = process.env.NEXT_PUBLIC_PLUS_FAKEDOOR === "1";

/**
 * Separate from PLUS_FAKEDOOR_ENABLED on purpose: rollout is waitlist-first,
 * checkout-second (subscription-plan.md Phase B, step 7, founding-member
 * coupon to the Phase-A waitlist before opening real checkout). OFF by
 * default even once billing code ships. Requires PLUS_FAKEDOOR_ENABLED to
 * also be on, this only decides what the sheet does once shown.
 */
export const PLUS_CHECKOUT_ENABLED = process.env.NEXT_PUBLIC_PLUS_CHECKOUT === "1";
