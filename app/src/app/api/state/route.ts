import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { userAppState } from "@/db/schema";
import { appStateSchema, readStateBody } from "@/lib/app-state-schema";
import { resolveUser } from "@/lib/api-auth";
import { planForUser } from "@/lib/entitlement";

export async function GET(req: Request) {
  const user = await resolveUser(req);
  if (!user) return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const [row] = await db
    .select({ state: userAppState.state })
    .from(userAppState)
    .where(eq(userAppState.userId, user.id));

  return NextResponse.json({ state: row?.state ?? null, plan: await planForUser(user.id, user.email) });
}

export async function PUT(req: Request) {
  const user = await resolveUser(req);
  if (!user) return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const body = await readStateBody(req);
  if (body === null) {
    return NextResponse.json({ message: "Payload too large or not valid JSON" }, { status: 413 });
  }
  const parsed = appStateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid state payload", issues: parsed.error.issues }, { status: 400 });
  }

  await db
    .insert(userAppState)
    .values({ userId: user.id, state: parsed.data })
    .onConflictDoUpdate({
      target: userAppState.userId,
      set: { state: parsed.data, updatedAt: new Date() },
    });

  return NextResponse.json({ ok: true });
}
