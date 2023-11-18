import styled from 'styled-components'
import { CurrencyItem, SwapButton, SwitchCurrenciesButton } from './components'

import { SWAPBOX_WIDTH } from './constants'
import { useSwapbox } from '@/services/useSwapbox'

export const Swapbox = () => {
    const {
        chain,
        tokens,
        inputCurrency,
        outputCurrency,
        handleInputCurrencySelect,
        handleOutputCurrencySelect,
        inputAmount,
        outputAmount,
        setInputAmount,
        setOutputAmount,
        isFetching
    } = useSwapbox()

    return (
        <Container>
            <CurrencyItem
                tokens={tokens}
                amount={inputAmount}
                setAmount={setInputAmount}
                selectedCurrency={inputCurrency}
                onCurrencySelect={handleInputCurrencySelect}
            />
            <SwitchCurrenciesButton isFetching={isFetching} />
            <CurrencyItem
                tokens={tokens}
                amount={outputAmount}
                setAmount={setOutputAmount}
                selectedCurrency={outputCurrency}
                onCurrencySelect={handleOutputCurrencySelect}
            />
            <SwapButton chain={chain} />
        </Container>
    )
}

const Container = styled.div`
    width: ${SWAPBOX_WIDTH};
    position: relative;
    margin: 0 auto 80px;
`
