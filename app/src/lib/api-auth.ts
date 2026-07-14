import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db/client";
import { users } from "@/db/schema";
import { verifyMobileToken } from "@/lib/mobile-token";

export interface ApiUser {
  id: string;
  email: string | null;
}

/**
 * Resolves the requesting user from either a mobile bearer token
 * (Authorization: Bearer <jwt>) or the NextAuth web session. Web behavior is
 * unchanged, the bearer path only engages when the header is present.
 */
export async function resolveUser(req: Request): Promise<ApiUser | null> {
  const header = req.headers.get("authorization");
  if (header?.startsWith("Bearer ")) {
    const userId = await verifyMobileToken(header.slice("Bearer ".length));
    if (!userId) return null;
    const [user] = await db.select({ id: users.id, email: users.email }).from(users).where(eq(users.id, userId));
    return user ?? null;
  }

  const session = await auth();
  if (!session?.user) return null;
  return { id: session.user.id, email: session.user.email ?? null };
}
