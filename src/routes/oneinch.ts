import { Router } from 'express'

import { getTokenList, getAmountTo } from '../controllers/oneinch'

const router = Router()

router.post('/get-tokens', getAmountTo)
router.post('/find-best-quote', getAmountTo)

export default router
