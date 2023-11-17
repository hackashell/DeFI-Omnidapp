import styled from 'styled-components'
import { CurrencyItem, SwapButton, SwitchCurrenciesButton } from './components'

import { SWAPBOX_WIDTH } from './constants'

export const Swapbox = () => (
    <Container>
        <CurrencyItem />
        <SwitchCurrenciesButton />
        <CurrencyItem />
        <SwapButton />
    </Container>
)

const Container = styled.div`
    width: ${SWAPBOX_WIDTH};
    position: relative;
    margin: 0 auto 80px;
`
