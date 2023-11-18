import { useTokens } from '@/hooks'

export const useSwapbox = () => {
    const { data: tokenData } = useTokens()

    return {
        tokens: tokenData || []
    }
}
