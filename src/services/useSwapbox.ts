import { useTokens } from '@/hooks'
import { useOutputAmount } from '@/hooks/useOutputAmount'
import { TokenInfo } from '@uniswap/token-lists'
import { useCallback, useEffect, useState } from 'react'
import { useNetwork } from 'wagmi'
import { parseUnits } from 'ethers'

export const useSwapbox = () => {
    const { data: tokenData } = useTokens()
    const { chain } = useNetwork()
    const { mutateAsync } = useOutputAmount()

    const [inputCurrency, setInputCurrency] = useState<TokenInfo>()
    const [outputCurrency, setOutputCurrency] = useState<TokenInfo>()
    const [inputAmount, setInputAmount] = useState<string>('')
    const [outputAmount, setOutputAmount] = useState<string>('')

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

    useEffect(() => {
        if (inputCurrency && outputCurrency && inputAmount) {
            mutateAsync({
                from: inputCurrency.address,
                to: outputCurrency.address,
                amount: parseUnits(
                    inputAmount,
                    inputCurrency.decimals
                ).toString()
            })
                .then(res => {
                    console.log('RESULT', res)
                    setOutputAmount(res.data.toTokenAmount)
                })
                .catch(error => console.warn(error))
        }
    }, [inputAmount, outputAmount, inputCurrency, outputCurrency])

    return {
        chain,
        tokens: getTokens(),
        inputCurrency,
        outputCurrency,
        handleInputCurrencySelect,
        handleOutputCurrencySelect,
        inputAmount,
        outputAmount,
        setInputAmount,
        setOutputAmount
    }
}
