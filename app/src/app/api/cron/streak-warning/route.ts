import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { Resend } from "resend";
import { db } from "@/db/client";
import { userAppState, users } from "@/db/schema";
import { todayStr, yesterdayStr } from "@/lib/date";
import { streakWarningEmail } from "@/lib/email-templates";
import { shouldSendStreakWarning } from "@/lib/retention-rules";
import type { AppState } from "@/content/types";

export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_FROM = process.env.EMAIL_FROM ?? "New Investor <hi@mail.newinvestor.app>";
const EMAIL_REPLY_TO = process.env.EMAIL_REPLY_TO;

export async function GET(req: Request) {
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const today = todayStr();
  const yesterday = yesterdayStr();

  const rows = await db
    .select({
      userId: userAppState.userId,
      email: users.email,
      state: userAppState.state,
      sentOn: userAppState.streakWarningSentOn,
    })
    .from(userAppState)
    .innerJoin(users, eq(users.id, userAppState.userId));

  let sent = 0;
  for (const row of rows) {
    const streak = (row.state as Partial<AppState>).streak;
    if (!shouldSendStreakWarning(streak, row.sentOn, today, yesterday)) continue;

    const { subject, html } = streakWarningEmail(streak!.count);
    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: [row.email],
      subject,
      html,
      ...(EMAIL_REPLY_TO && { replyTo: EMAIL_REPLY_TO }),
    });
    if (error) continue;

    await db.update(userAppState).set({ streakWarningSentOn: today }).where(eq(userAppState.userId, row.userId));
    sent++;
  }

  return NextResponse.json({ sent });
}
