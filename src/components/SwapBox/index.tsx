import styled from 'styled-components'
import { CurrencyItem, SwapButton, SwitchCurrenciesButton } from './components'

import { SWAPBOX_WIDTH } from './constants'
import { useSwapbox } from '@/services'

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
        isFetching,
        switchCurrencies
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
            <SwitchCurrenciesButton
                isFetching={isFetching}
                onClick={switchCurrencies}
            />
            <CurrencyItem
                tokens={tokens}
                amount={outputAmount}
                setAmount={setOutputAmount}
                selectedCurrency={outputCurrency}
                onCurrencySelect={handleOutputCurrencySelect}
            />
            <SwapButton chain={chain} isFetching={isFetching} />
        </Container>
    )
}

const Container = styled.div`
    width: ${SWAPBOX_WIDTH};
    position: relative;
    margin: 0 auto 80px;
`
