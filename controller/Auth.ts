// auth.ts
import type { Request, Response, NextFunction } from "express";
import * as admin from "firebase-admin";

// Initialize once on startup
admin.initializeApp({
  // Use ADC on your server, or:
  // credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  credential: admin.credential.applicationDefault(),
});

// Augment Express types to carry the decoded token
declare global {
  namespace Express {
    interface Request {
      user?: admin.auth.DecodedIdToken;
    }
  }
}

function extractBearer(req: Request): string | null {
  const h = req.header("Authorization") || req.header("authorization");
  if (!h) return null;
  const [scheme, token] = h.split(" ");
  return scheme === "Bearer" && token ? token : null;
}

export async function verifyFirebaseIdToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const idToken = extractBearer(req);
    if (!idToken) return res.status(401).send("Missing Bearer token");

    const decoded = await admin.auth().verifyIdToken(idToken, true); // checks revocation too
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).send("Unauthorized");
  }
}



