import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useOutputAmount = () => {
    const getOutputAmount = (variables: {
        from: string
        to: string
        amount: string
    }) => {
        return axios.post(
            'http://localhost:3000/one-inch/find-best-quote',
            variables
        )
    }

    return useMutation({
        mutationFn: getOutputAmount
    })
}
