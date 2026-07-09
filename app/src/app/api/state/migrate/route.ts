import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db/client";
import { userAppState } from "@/db/schema";
import { appStateSchema } from "@/lib/app-state-schema";

/**
 * First-login-on-a-device upload. Server wins, no merge, once: if a row
 * already exists for this user, the uploaded local blob is discarded and the
 * existing server state is returned instead — merging two independent
 * XP/streak/holdings histories has no safe automatic resolution.
 */
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const body: unknown = await req.json();
  const parsed = appStateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid state payload", issues: parsed.error.issues }, { status: 400 });
  }

  const [existing] = await db
    .select({ state: userAppState.state })
    .from(userAppState)
    .where(eq(userAppState.userId, session.user.id));

  if (existing) {
    return NextResponse.json({ state: existing.state, migrated: false });
  }

  await db.insert(userAppState).values({ userId: session.user.id, state: parsed.data });
  return NextResponse.json({ state: parsed.data, migrated: true });
}
