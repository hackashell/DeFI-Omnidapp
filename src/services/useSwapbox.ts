import { useTokens } from '@/hooks'
import { useOutputAmount } from '@/hooks/useOutputAmount'
import { TokenInfo } from '@uniswap/token-lists'
import { useCallback, useEffect, useState } from 'react'
import { useNetwork } from 'wagmi'
import { parseUnits, formatUnits } from 'ethers'
import useDebounce from '@/utils/useDebounce'

export const useSwapbox = () => {
    const { chain } = useNetwork()
    const { data: tokenData } = useTokens()
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

    const switchCurrencies = () => {
        setInputCurrency(outputCurrency)
        setOutputCurrency(inputCurrency)
    }

    const debouncedAmount = useDebounce(inputAmount, 1000)

    useEffect(() => {
        if (inputCurrency && outputCurrency && debouncedAmount) {
            setIsfetching(true)

            getOutputAmount({
                chainId: chain!.id,
                from: inputCurrency.address,
                to: outputCurrency.address,
                amount: parseUnits(
                    debouncedAmount,
                    inputCurrency.decimals
                ).toString()
            })
                .then(res => {
                    const formattedNumber = formatUnits(
                        res.data.response.toAmount,
                        outputCurrency.decimals
                    )

                    const floatedNumber = parseFloat(formattedNumber).toFixed(2)

                    setOutputAmount(floatedNumber)
                })
                .catch(error => console.warn(error))
                .finally(() => setIsfetching(false))
        }
    }, [
        debouncedAmount,
        outputAmount,
        inputCurrency,
        outputCurrency,
        getOutputAmount,
        chain
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
        isFetching,
        switchCurrencies
    }
}
