import { Router } from 'express'

import { getAmountTo } from '../controllers/oneinch'

const router = Router()

router.post('/find-best-quote', getAmountTo)

export default router
