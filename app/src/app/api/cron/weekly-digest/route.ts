import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { Resend } from "resend";
import { db } from "@/db/client";
import { userAppState, users } from "@/db/schema";
import { todayStr, mondayOf, pickForWeek } from "@/lib/date";
import { WEEKLY_ITEMS } from "@/content/weekly-items";
import { weeklyDigestEmail } from "@/lib/email-templates";
import { shouldSendWeeklyDigest } from "@/lib/retention-rules";

export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_FROM = process.env.EMAIL_FROM ?? "New Investor <hi@mail.newinvestor.app>";
const EMAIL_REPLY_TO = process.env.EMAIL_REPLY_TO;

export async function GET(req: Request) {
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const monday = todayStr(mondayOf());
  const item = pickForWeek(WEEKLY_ITEMS);
  const { subject, html } = weeklyDigestEmail(item);

  const rows = await db
    .select({ userId: userAppState.userId, email: users.email, sentOn: userAppState.weeklyDigestSentOn })
    .from(userAppState)
    .innerJoin(users, eq(users.id, userAppState.userId));

  let sent = 0;
  for (const row of rows) {
    if (!shouldSendWeeklyDigest(row.sentOn, monday)) continue;

    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: [row.email],
      subject,
      html,
      ...(EMAIL_REPLY_TO && { replyTo: EMAIL_REPLY_TO }),
    });
    if (error) continue;

    await db.update(userAppState).set({ weeklyDigestSentOn: monday }).where(eq(userAppState.userId, row.userId));
    sent++;
  }

  return NextResponse.json({ sent });
}
