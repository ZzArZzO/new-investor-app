import { NextResponse } from "next/server";
import { authorizeCredentials } from "@/lib/authorize-credentials";
import { signMobileToken } from "@/lib/mobile-token";
import { checkRateLimit, clientIp, RATE_LIMIT_MESSAGE } from "@/lib/rate-limit";

/** Mobile email/password sign-in: same authorize + lockout logic as the web Credentials provider. */
export async function POST(req: Request) {
  const ip = clientIp(req);
  if (!(await checkRateLimit("login", ip, 10, 15 * 60 * 1000))) {
    return NextResponse.json({ message: RATE_LIMIT_MESSAGE }, { status: 429 });
  }
  const body: unknown = await req.json();
  const user = await authorizeCredentials(body);
  if (!user) {
    // Same generic message for every failure reason, never hint which.
    return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
  }
  const token = await signMobileToken(user.id);
  return NextResponse.json({ token, email: user.email });
}
