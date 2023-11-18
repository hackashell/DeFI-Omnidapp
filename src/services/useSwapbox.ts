import { useTokens } from '@/hooks'
import { TokenInfo } from '@uniswap/token-lists'
import { useCallback, useEffect, useState } from 'react'
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

    const getTokens = useCallback(() => {
        if (tokenData && tokenData?.length !== 0) {
            return (tokenData as TokenInfo[]).filter(
                token => token.chainId === chain?.id
            )
        }

        return []
    }, [tokenData, chain])

    useEffect(() => {
        if (chain) {
            setInputCurrency(getTokens()[0])
            setOutputCurrency(getTokens()[1])
        }
    }, [chain, getTokens])

    return {
        chain,
        tokens: getTokens(),
        inputCurrency,
        outputCurrency,
        handleInputCurrencySelect,
        handleOutputCurrencySelect
    }
}
