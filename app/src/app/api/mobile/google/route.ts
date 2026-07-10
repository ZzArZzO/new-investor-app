import { NextResponse } from "next/server";
import * as z from "zod";
import { verifyGoogleIdToken } from "@/lib/oidc-verify";
import { findOrCreateOAuthUser } from "@/lib/oauth-user";
import { signMobileToken } from "@/lib/mobile-token";

const bodySchema = z.object({ idToken: z.string().min(1) });

/** Native Google sign-in: mobile sends the Google ID token, we verify against Google's JWKS. */
export async function POST(req: Request) {
  const parsed = bodySchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ message: "Missing idToken." }, { status: 400 });

  const identity = await verifyGoogleIdToken(parsed.data.idToken);
  if (!identity) return NextResponse.json({ message: "Invalid Google token." }, { status: 401 });

  const user = await findOrCreateOAuthUser("google", identity);
  const token = await signMobileToken(user.id);
  return NextResponse.json({ token, email: user.email });
}
