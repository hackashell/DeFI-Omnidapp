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
        handleOutputCurrencySelect
    } = useSwapbox()

    return (
        <Container>
            <CurrencyItem
                tokens={tokens}
                selectedCurrency={inputCurrency}
                onCurrencySelect={handleInputCurrencySelect}
            />
            <SwitchCurrenciesButton />
            <CurrencyItem
                tokens={tokens}
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
