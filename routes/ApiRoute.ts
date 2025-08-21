import { Router, IRouter } from "express";
import AgentRoute from "./AgentRoute";

const router = Router();

// Apply Zod-based request validation before hitting the controller
const r1: IRouter = Router();
r1.use(AgentRoute);

router.use("/api/v1", r1);

export default router;
