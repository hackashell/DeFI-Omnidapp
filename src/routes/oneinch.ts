import { Router } from 'express'

import { getTokenList, getAmountTo } from '../controllers/oneinch'

const router = Router()

router.get('/get-tokens', getTokenList)
router.post('/find-best-quote', getAmountTo)

export default router
