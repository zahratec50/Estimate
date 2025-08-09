import jwt from "jsonwebtoken";

/**
 * Generate Apple Client Secret for Apple OAuth
 * Reads required info from env variables
 */
export function generateAppleClientSecret(): string {
  if (
    !process.env.APPLE_TEAM_ID ||
    !process.env.APPLE_ID_CLIENT_ID ||
    !process.env.APPLE_PRIVATE_KEY ||
    !process.env.APPLE_KEY_ID
  ) {
    throw new Error("Missing Apple OAuth environment variables");
  }

  const privateKey = process.env.APPLE_PRIVATE_KEY.replace(/\\n/g, "\n");

  const now = Math.floor(Date.now() / 1000);

  const payload = {
    iss: process.env.APPLE_TEAM_ID, // Apple Team ID
    iat: now, // Issued At
    exp: now + 60 * 60 * 24, // Expires in 24 hours
    aud: "https://appleid.apple.com",
    sub: process.env.APPLE_ID_CLIENT_ID, // Service ID (Client ID)
  };

  return jwt.sign(payload, privateKey, {
    algorithm: "ES256",
    keyid: process.env.APPLE_KEY_ID,
  });
}
