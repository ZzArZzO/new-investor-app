import { track } from "@vercel/analytics";

/**
 * The curated set of product events we send to Vercel Web Analytics. Kept
 * small and low-cardinality on purpose — these are the retention signals that
 * gate Phase 2 (do people come back and take repeated actions?), not a
 * firehose. No personal data is ever attached.
 */
export type AnalyticsEvent =
  | "quiz_completed"
  | "lesson_completed"
  | "daily_question_answered"
  | "daily_scam_played"
  | "tool_opened"
  | "holding_added"
  | "contribution_logged"
  | "action_step_completed"
  | "broker_link_clicked"
  | "exchange_link_clicked"
  | "results_email_captured";

type AnalyticsProps = Record<string, string | number | boolean | null>;

export function trackEvent(event: AnalyticsEvent, props?: AnalyticsProps): void {
  track(event, props);
}
