import { useTokens } from '@/hooks'
import { TokenInfo } from '@uniswap/token-lists'
import { useState } from 'react'
import { useNetwork } from 'wagmi'

export const useSwapbox = () => {
    const { data: tokenData } = useTokens()
    const { chain } = useNetwork()

    const [inputCurrency, setInputCurrency] = useState<TokenInfo>()
    const [outputCurrency, setOutputCurrency] = useState<TokenInfo>()

    const handleInputCurrencySelect = (token: TokenInfo) =>
        setInputCurrency(token)
    const handleOutputCurrencySelect = (token: TokenInfo) =>
        setOutputCurrency(token)

    return {
        chain,
        tokens:
            tokenData?.length !== 0
                ? tokenData?.filter(token => token.chainId === chain?.id)
                : [],
        inputCurrency,
        outputCurrency,
        handleInputCurrencySelect,
        handleOutputCurrencySelect
    }
}
