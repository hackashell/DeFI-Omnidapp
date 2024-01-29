import styled from 'styled-components'

import { CurrencySymbol } from './CurrencySymbol'
import DownArrowLarge from '../../assets/down-arrow-large.svg?react'
import { TokenInfo } from '@uniswap/token-lists'
import { CurrencyLogo } from './CurrencyLogo'

type CurrencyTypeProps = {
    selectedCurrency: TokenInfo | undefined
}

export const CurrencyType = ({ selectedCurrency }: CurrencyTypeProps) => (
    <Container>
        {selectedCurrency?.logoURI && (
            <CurrencyLogo logoURI={selectedCurrency.logoURI} />
        )}
        <CurrencySymbol currency={selectedCurrency?.symbol} />
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
