import { SignJWT, jwtVerify } from "jose";

const AUDIENCE = "newinvestor-mobile";
const ISSUER = "newinvestor";
/** Long-lived: mobile has no cookie refresh; users shouldn't be signed out weekly. */
const EXPIRY = "180d";

function secretKey(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET not configured");
  return new TextEncoder().encode(secret);
}

/** Issues the bearer token the mobile app stores in SecureStore. */
export async function signMobileToken(userId: string): Promise<string> {
  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setAudience(AUDIENCE)
    .setIssuer(ISSUER)
    .setIssuedAt()
    .setExpirationTime(EXPIRY)
    .sign(secretKey());
}

/** Returns the user id for a valid mobile token, null for anything else. */
export async function verifyMobileToken(token: string): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey(), { audience: AUDIENCE, issuer: ISSUER });
    return typeof payload.sub === "string" && payload.sub.length > 0 ? payload.sub : null;
  } catch {
    return null;
  }
}
