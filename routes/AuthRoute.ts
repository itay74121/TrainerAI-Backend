import { Router } from 'express'
import express from "express";
import { sendSignedFireBaseToken, verifyFirebaseIdToken } from "../controller/Auth";

const router = Router()

// Apply Zod-based request validation before hitting the controller
router.route('/auth').get(verifyFirebaseIdToken,sendSignedFireBaseToken)

export default router;  