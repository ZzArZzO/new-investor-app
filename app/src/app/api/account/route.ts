import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { users } from "@/db/schema";
import { resolveUser } from "@/lib/api-auth";

/** GDPR erasure: cascades to sessions/accounts/user_app_state via the schema's onDelete rules. */
export async function DELETE(req: Request) {
  const user = await resolveUser(req);
  if (!user) return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  await db.delete(users).where(eq(users.id, user.id));
  return NextResponse.json({ ok: true });
}
