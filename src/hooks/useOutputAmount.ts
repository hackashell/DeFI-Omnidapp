import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const oneInchApiKey = import.meta.env.VITE_ONE_INCH_API_KEY

export const useOutputAmount = () => {
    const getOutputAmount = (variables: {
        from: string
        to: string
        amount: string
    }) => {
        const { from, to, amount } = variables
        return axios.get('https://api.1inch.dev/swap/v5.2/1/quote', {
            headers: {
                Authorization: `Bearer ${oneInchApiKey}`
            },
            params: {
                src: from,
                dst: to,
                amount: amount
            }
        })
    }

    return useMutation({
        mutationFn: getOutputAmount
    })
}
