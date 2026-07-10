import { NextResponse } from "next/server";
import { authorizeCredentials } from "@/lib/authorize-credentials";
import { signMobileToken } from "@/lib/mobile-token";

/** Mobile email/password sign-in: same authorize + lockout logic as the web Credentials provider. */
export async function POST(req: Request) {
  const body: unknown = await req.json();
  const user = await authorizeCredentials(body);
  if (!user) {
    // Same generic message for every failure reason — never hint which.
    return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
  }
  const token = await signMobileToken(user.id);
  return NextResponse.json({ token, email: user.email });
}
