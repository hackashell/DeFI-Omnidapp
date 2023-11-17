import styled from 'styled-components'
import { CurrencyItem, SwitchCurrenciesButton } from './components'

import { SWAPBOX_WIDTH } from './constants'

export const Swapbox = () => (
    <Container>
        <CurrencyItem />
        <SwitchCurrenciesButton />
        <CurrencyItem />
    </Container>
)

const Container = styled.div`
    width: ${SWAPBOX_WIDTH};
    position: relative;
    margin: 0 auto 80px;
`
