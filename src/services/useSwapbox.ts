import { useTokens } from '@/hooks'
import { TokenInfo } from '@uniswap/token-lists'
import { useState } from 'react'
import { useNetwork } from 'wagmi'

export const useSwapbox = () => {
    const { data: tokenData } = useTokens()
    const { chain } = useNetwork()

    const [inputCurrency, setInputCurrency] = useState<TokenInfo>()
    const [outputCurrency, setOutputCurrency] = useState<TokenInfo>()

    return {
        chain,
        tokens:
            tokenData?.length !== 0
                ? tokenData?.filter(token => token.chainId === chain?.id)
                : [],
        inputCurrency,
        setInputCurrency,
        outputCurrency,
        setOutputCurrency
    }
}
