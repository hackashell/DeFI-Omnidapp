import styled from 'styled-components'
import { CurrencySymbol } from './CurrencySymbol'

export const CurrencyType = () => (
    <Container>
        <CurrencySymbol currency='USD' />
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
