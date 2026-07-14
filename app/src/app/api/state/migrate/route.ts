import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { userAppState } from "@/db/schema";
import { appStateSchema, readStateBody } from "@/lib/app-state-schema";
import { resolveUser } from "@/lib/api-auth";

/**
 * First-login-on-a-device upload. Server wins, no merge, once: if a row
 * already exists for this user, the uploaded local blob is discarded and the
 * existing server state is returned instead, merging two independent
 * XP/streak/holdings histories has no safe automatic resolution.
 */
export async function POST(req: Request) {
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

  const [existing] = await db
    .select({ state: userAppState.state })
    .from(userAppState)
    .where(eq(userAppState.userId, user.id));

  if (existing) {
    return NextResponse.json({ state: existing.state, migrated: false });
  }

  await db.insert(userAppState).values({ userId: user.id, state: parsed.data });
  return NextResponse.json({ state: parsed.data, migrated: true });
}
