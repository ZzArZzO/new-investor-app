import type { WeeklyItem } from "@/content/types";

interface EmailContent {
  subject: string;
  html: string;
}

const FOOTER = `<p style="margin-top:24px;font-size:12px;color:#6b7280;">
  Educational information, not personal financial advice. Investing involves risk, including loss of the money you invest.
</p>
<p style="font-size:12px;color:#6b7280;">
  You can turn these emails off any time in the app: Settings &rarr; Email preferences.
</p>`;

export function streakWarningEmail(streakCount: number): EmailContent {
  return {
    subject: `Your ${streakCount}-day streak is still open today`,
    html: `
      <p>You've kept a ${streakCount}-day streak going — nice work.</p>
      <p>It's still open today. A quick lesson, the daily scam question, or logging a contribution keeps it alive.</p>
      ${FOOTER}
    `,
  };
}

const KIND_LABEL: Record<WeeklyItem["kind"], string> = {
  concept: "Concept",
  myth: "Myth vs fact",
  tip: "Tip of the week",
};

export function weeklyDigestEmail(item: WeeklyItem): EmailContent {
  return {
    subject: `This week: ${item.title}`,
    html: `
      <p style="text-transform:uppercase;font-size:12px;font-weight:700;color:#33553f;">${KIND_LABEL[item.kind]}</p>
      <p style="font-size:16px;font-weight:700;">${item.title}</p>
      <p>${item.body}</p>
      ${FOOTER}
    `,
  };
}
