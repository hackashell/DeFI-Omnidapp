import styled from 'styled-components'

import { CurrencySymbol } from './CurrencySymbol'
import DownArrowLarge from '../../assets/down-arrow-large.svg?react'

export const CurrencyType = () => (
    <Container>
        <CurrencySymbol currency='USD' />
        <DownArrowLarge />
    </Container>
)

const Container = styled.div`
    height: 24px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 17px;
    cursor: pointer;
`
