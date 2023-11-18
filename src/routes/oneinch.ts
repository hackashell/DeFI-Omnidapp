import { Router } from 'express'

import { getAmountTo } from '../controllers/oneinch'

const router = Router()

router.get('/find-best-quote', getAmountTo)

export default router
