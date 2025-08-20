import { Router } from 'express'
import { Answer } from '../controller/Agent'

const router = Router()

router.route('/Agent/:agent').post(Answer)

export default router;