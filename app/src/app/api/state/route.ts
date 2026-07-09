import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db/client";
import { userAppState } from "@/db/schema";
import { appStateSchema } from "@/lib/app-state-schema";
import { planForEmail } from "@/lib/entitlement";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const [row] = await db
    .select({ state: userAppState.state })
    .from(userAppState)
    .where(eq(userAppState.userId, session.user.id));

  return NextResponse.json({ state: row?.state ?? null, plan: planForEmail(session.user.email) });
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const body: unknown = await req.json();
  const parsed = appStateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid state payload", issues: parsed.error.issues }, { status: 400 });
  }

  await db
    .insert(userAppState)
    .values({ userId: session.user.id, state: parsed.data })
    .onConflictDoUpdate({
      target: userAppState.userId,
      set: { state: parsed.data, updatedAt: new Date() },
    });

  return NextResponse.json({ ok: true });
}
