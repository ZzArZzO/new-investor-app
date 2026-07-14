import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { users } from "@/db/schema";
import { hashPassword } from "@/lib/password";
import { registerSchema } from "@/lib/auth-credentials-schema";
import { checkRateLimit, clientIp, RATE_LIMIT_MESSAGE } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (!(await checkRateLimit("register", ip, 5, 15 * 60 * 1000))) {
    return NextResponse.json({ message: RATE_LIMIT_MESSAGE }, { status: 429 });
  }
  const body: unknown = await req.json();
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Enter a valid email and a password of at least 8 characters." },
      { status: 400 },
    );
  }
  const { email, password } = parsed.data;

  const [existing] = await db.select({ id: users.id }).from(users).where(eq(users.email, email));
  if (existing) {
    return NextResponse.json({ message: "That email is already registered." }, { status: 409 });
  }

  const passwordHash = await hashPassword(password);
  await db.insert(users).values({ email, password: passwordHash });

  return NextResponse.json({ ok: true });
}
