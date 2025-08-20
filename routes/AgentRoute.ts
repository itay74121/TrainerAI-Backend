import { Router } from 'express'
import { Answer } from '../controller/Agent'
import { validateAgentRequest, AgentRequestFromSchema } from '../util/validation'

const router = Router()

// Apply Zod-based request validation before hitting the controller
router.route('/Agent/:agent').post(validateAgentRequest, Answer)

export default router;