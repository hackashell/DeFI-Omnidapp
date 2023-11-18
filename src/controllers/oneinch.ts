import { RequestHandler } from 'express'
import axios from 'axios'

export const getAmountTo: RequestHandler = async (req, res, next) => {
    console.log(req.body)

    const { from, to, amount } = req.body

    console.log(from, to, amount)

    try {
        const { data } = await axios.get(
            'https://api.1inch.dev/swap/v5.2/1/quote',
            {
                headers: {
                    Authorization: `Bearer ${process.env.VITE_ONE_INCH_API_KEY}`
                },
                params: {
                    src: from,
                    dst: to,
                    amount: amount
                }
            }
        )

        res.status(201).json({ response: data })
    } catch (err) {
        next(err)
    }
}
