import { NextResponse } from "next/server";
import * as z from "zod";
import { verifyAppleIdentityToken } from "@/lib/oidc-verify";
import { findOrCreateOAuthUser } from "@/lib/oauth-user";
import { signMobileToken } from "@/lib/mobile-token";

const bodySchema = z.object({ identityToken: z.string().min(1) });

/** Native Sign in with Apple: mobile sends the identity token, we verify against Apple's JWKS. */
export async function POST(req: Request) {
  const parsed = bodySchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ message: "Missing identityToken." }, { status: 400 });

  const identity = await verifyAppleIdentityToken(parsed.data.identityToken);
  if (!identity) return NextResponse.json({ message: "Invalid Apple token." }, { status: 401 });

  const user = await findOrCreateOAuthUser("apple", identity);
  const token = await signMobileToken(user.id);
  return NextResponse.json({ token, email: user.email });
}
