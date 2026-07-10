import { and, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { accounts, users } from "@/db/schema";
import type { VerifiedIdentity } from "@/lib/oidc-verify";

/**
 * Find-or-create for native OAuth sign-ins (Google/Apple id tokens verified
 * server-side). Mirrors what the NextAuth adapter does on web: match the
 * provider account first, then link by email, else create a fresh user.
 */
export async function findOrCreateOAuthUser(
  provider: "google" | "apple",
  identity: VerifiedIdentity,
): Promise<{ id: string; email: string }> {
  const [linked] = await db
    .select({ id: users.id, email: users.email })
    .from(accounts)
    .innerJoin(users, eq(users.id, accounts.userId))
    .where(and(eq(accounts.provider, provider), eq(accounts.providerAccountId, identity.providerAccountId)));
  if (linked) return linked;

  const [byEmail] = await db.select({ id: users.id, email: users.email }).from(users).where(eq(users.email, identity.email));
  const user =
    byEmail ??
    (
      await db
        .insert(users)
        .values({ email: identity.email, name: identity.name, emailVerified: new Date() })
        .returning({ id: users.id, email: users.email })
    )[0];

  await db
    .insert(accounts)
    .values({
      userId: user.id,
      type: "oidc",
      provider,
      providerAccountId: identity.providerAccountId,
    })
    .onConflictDoNothing();

  return user;
}
