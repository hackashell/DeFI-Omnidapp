import { useTokens } from '@/hooks'
import { useOutputAmount } from '@/hooks/useOutputAmount'
import { TokenInfo } from '@uniswap/token-lists'
import { useCallback, useEffect, useState } from 'react'
import { useNetwork } from 'wagmi'
import { parseUnits, formatUnits } from 'ethers'

export const useSwapbox = () => {
    const { data: tokenData } = useTokens()
    const { chain } = useNetwork()
    const { mutateAsync: getOutputAmount } = useOutputAmount()

    const [inputCurrency, setInputCurrency] = useState<TokenInfo>()
    const [outputCurrency, setOutputCurrency] = useState<TokenInfo>()
    const [inputAmount, setInputAmount] = useState<string>('')
    const [outputAmount, setOutputAmount] = useState<string>('')

    const [isFetching, setIsfetching] = useState<boolean>(false)

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
            setIsfetching(true)

            getOutputAmount({
                from: inputCurrency.address,
                to: outputCurrency.address,
                amount: parseUnits(
                    inputAmount,
                    inputCurrency.decimals
                ).toString()
            })
                .then(res => {
                    setOutputAmount(
                        parseInt(
                            formatUnits(
                                res.data.response.toAmount,
                                outputCurrency.decimals
                            )
                        ).toFixed(2)
                    )
                })
                .catch(error => console.warn(error))
                .finally(() => setIsfetching(false))
        }
    }, [
        inputAmount,
        outputAmount,
        inputCurrency,
        outputCurrency,
        getOutputAmount
    ])

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
        setOutputAmount,
        isFetching
    }
}
