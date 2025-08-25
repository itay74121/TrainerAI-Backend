// auth.ts
import type { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";
import { getJWT } from "../util/Authentication";
import SecretCredential from "../trainerai-creds.json"

// Initialize Firebase Admin SDK only if not already initialized
let firebaseApp: admin.app.App;
try {
  // Check if Firebase is already initialized
  firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(SecretCredential as admin.ServiceAccount),
  });
  // firebaseApp = admin.app();
} catch (error) {
  // Initialize Firebase Admin SDK with proper configuration
  try{
  
  } catch(error){
    console.log("Log the error",error)
  }
}

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
    console.error("Firebase token verification error:", err);
    return res.status(401).send("Unauthorized");
  }
}

export async function sendSignedFireBaseToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = await getJWT(JSON.stringify(req.user));
    res.header("x-auth-token", token)
    res.status(200).json({});
  } catch (error) {
    console.error("Error generating signed token:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

