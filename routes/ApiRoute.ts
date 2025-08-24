import { Router, IRouter } from "express";
import AgentRoute from "./AgentRoute";
import AuthRoute from "./AuthRoute"

const router = Router();

// Apply Zod-based request validation before hitting the controller
const r1: IRouter = Router();
r1.use(AgentRoute);
r1.use(AuthRoute);

router.use("/api/v1", r1);

export default router;
