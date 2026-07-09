import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db/client";
import { users } from "@/db/schema";

/** GDPR erasure: cascades to sessions/accounts/user_app_state via the schema's onDelete rules. */
export async function DELETE() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  await db.delete(users).where(eq(users.id, session.user.id));
  return NextResponse.json({ ok: true });
}
