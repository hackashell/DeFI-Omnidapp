import { useTokens } from '@/hooks'
import { useNetwork } from 'wagmi'

export const useSwapbox = () => {
    const { data: tokenData } = useTokens()
    const { chain } = useNetwork()

    return {
        chain,
        tokens: tokenData || []
    }
}
