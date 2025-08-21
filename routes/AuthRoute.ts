import { Router } from 'express'
import express from "express";
import { verifyFirebaseIdToken } from "../controller/Auth";

const router = Router()

// Apply Zod-based request validation before hitting the controller
router.route('/auth').get(verifyFirebaseIdToken)

export default router;