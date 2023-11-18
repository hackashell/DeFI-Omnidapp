import styled from 'styled-components'
import { CurrencyItem, SwapButton, SwitchCurrenciesButton } from './components'

import { SWAPBOX_WIDTH } from './constants'
import { useSwapbox } from '@/services/useSwapbox'

export const Swapbox = () => {
    const { tokens } = useSwapbox()

    console.log('TOKENS', tokens)

    return (
        <Container>
            <CurrencyItem />
            <SwitchCurrenciesButton />
            <CurrencyItem />
            <SwapButton />
        </Container>
    )
}

const Container = styled.div`
    width: ${SWAPBOX_WIDTH};
    position: relative;
    margin: 0 auto 80px;
`
