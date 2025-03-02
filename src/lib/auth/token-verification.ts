import { jwtVerify } from "jose";

// Secret key used to sign tokens - must match the one used to create tokens
const JWT_SECRET =
  process.env.JWT_SECRET || "7CP92p-hxcYAziAcm8MiMRNdWHg_85wIFwILjfqmW8c";

const SECRET_KEY = new TextEncoder().encode(JWT_SECRET);

export async function verifyToken(token: string): Promise<boolean> {
  try {
    // Verify the token signature
    const { payload } = await jwtVerify(token, SECRET_KEY);

    // Check if token has required claims based on your JWT structure
    // Your token has 'sub' for subject ID and 'exp' for expiration
    if (!payload.sub) {
      return false;
    }

    // JWT library automatically checks expiration, but we can add an extra check
    if (payload.exp && typeof payload.exp === "number") {
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime > payload.exp) {
        return false;
      }
    }

    return true;
  } catch (error) {
    // If verification fails, token is invalid
    return false;
  }
}
