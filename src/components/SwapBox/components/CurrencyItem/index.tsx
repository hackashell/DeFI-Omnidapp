import styled from 'styled-components'

import {
    ELEMENTS_BACKGROUND_PRIMARY,
    ELEMENTS_BACKGROUND_SECONDARY,
    ELEMENTS_BORDER_PRIMARY,
    ELEMENTS_BORDER_SECONDARY,
    ELEMENTS_SPACING,
    BorderStyle
} from '../../constants'

import { CurrencyAmount } from './CurrencyAmount'
import { CurrencyType } from './CurrencyType'

export const CurrencyItem = () => (
    <CurrencyContainer>
        <CurrencyAmountContainer>
            <CurrencyAmount />
        </CurrencyAmountContainer>
        <CurrencyInfoContainer>
            <CurrencyType />
        </CurrencyInfoContainer>
    </CurrencyContainer>
)

const CurrencyContainer = styled.div<{ lowerItem?: boolean }>`
    width: 100%;
    height: 100px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 22px;
    background: ${({ lowerItem }) =>
        lowerItem
            ? ELEMENTS_BACKGROUND_SECONDARY
            : ELEMENTS_BACKGROUND_PRIMARY};
    ${BorderStyle}
    margin-bottom: ${ELEMENTS_SPACING};

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        border-radius: 12px;
        border: 1.5px solid transparent;
        background: ${({ lowerItem }) =>
            lowerItem ? ELEMENTS_BORDER_SECONDARY : ELEMENTS_BORDER_PRIMARY};
        mask:
            linear-gradient(#fff 0 0) padding-box,
            linear-gradient(#fff 0 0);
        -webkit-mask:
            linear-gradient(#fff 0 0) padding-box,
            linear-gradient(#fff 0 0);
        -webkit-mask-composite: destination-out;
        mask-composite: exclude;
    }
`

const CurrencyAmountContainer = styled.div`
    width: 35%;
`

const CurrencyInfoContainer = styled.div`
    width: 60%;
`
