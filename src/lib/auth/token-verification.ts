import { jwtVerify } from "jose";

// Secret key used to sign tokens - must match the one used to create tokens
const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key",
);

export async function verifyToken(token: string): Promise<boolean> {
  try {
    // Verify the token signature
    const { payload } = await jwtVerify(token, SECRET_KEY);

    // Check if token has required claims
    if (!payload.sub || !payload.iat) {
      return false;
    }

    // Additional checks can be added here
    // For example, check if token is in a blacklist, etc.

    return true;
  } catch (error) {
    // If verification fails, token is invalid
    return false;
  }
}
