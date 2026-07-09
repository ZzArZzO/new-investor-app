import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { users } from "@/db/schema";
import { signInSchema } from "@/lib/auth-credentials-schema";
import { verifyPassword } from "@/lib/password";
import { isLocked, nextLockoutState } from "@/lib/auth-lockout";

export interface AuthorizedUser {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
}

/**
 * Credentials provider authorize logic, extracted from auth.ts for direct testing.
 * Same generic null for "no such user", "Google-only account", "locked out", and
 * "wrong password" — never hint at which reason to an attacker.
 */
export async function authorizeCredentials(credentials: unknown): Promise<AuthorizedUser | null> {
  const parsed = signInSchema.safeParse(credentials);
  if (!parsed.success) return null;
  const { email, password } = parsed.data;

  const [user] = await db.select().from(users).where(eq(users.email, email));
  if (!user?.password) return null;
  if (isLocked(user.lockedUntil, new Date())) return null;

  const valid = await verifyPassword(password, user.password);
  if (!valid) {
    const next = nextLockoutState(user.failedLoginAttempts, new Date());
    await db.update(users).set(next).where(eq(users.id, user.id));
    return null;
  }

  await db.update(users).set({ failedLoginAttempts: 0, lockedUntil: null }).where(eq(users.id, user.id));
  return { id: user.id, email: user.email, name: user.name, image: user.image };
}
