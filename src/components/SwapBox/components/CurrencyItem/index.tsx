import styled from 'styled-components'
import { AnimatePresence } from 'framer-motion'

import {
    ELEMENTS_BACKGROUND_PRIMARY,
    ELEMENTS_BACKGROUND_SECONDARY,
    ELEMENTS_BORDER_PRIMARY,
    ELEMENTS_BORDER_SECONDARY,
    ELEMENTS_SPACING,
    BorderStyle
} from '../../constants'
import { useState } from 'react'

import { TokenPicker } from './TokenPicker'
import { CurrencyAmount } from './CurrencyAmount'
import { CurrencyType } from './CurrencyType'
import { TokenInfo } from '@uniswap/token-lists'

type CurrencyItemProps = {
    tokens: TokenInfo[]
    amount: string
    setAmount: (amount: string) => void
    selectedCurrency: TokenInfo | undefined
    onCurrencySelect: (token: TokenInfo) => void
}

export const CurrencyItem = ({
    tokens,
    amount,
    setAmount,
    selectedCurrency,
    onCurrencySelect
}: CurrencyItemProps) => {
    const [tokenPickerOpened, setTokenPickerOpened] = useState(false)

    const openTokenPicker = () => setTokenPickerOpened(true)
    const closeTokenPicker = () => setTokenPickerOpened(false)

    return (
        <CurrencyContainer>
            <CurrencyAmountContainer>
                <CurrencyAmount amount={amount} setAmount={setAmount} />
            </CurrencyAmountContainer>
            <CurrencyInfoContainer onClick={openTokenPicker}>
                <CurrencyType selectedCurrency={selectedCurrency} />
            </CurrencyInfoContainer>
            <AnimatePresence>
                {tokenPickerOpened && (
                    <TokenPicker
                        tokens={tokens}
                        closeTokenPicker={closeTokenPicker}
                        onCurrencySelect={onCurrencySelect}
                    />
                )}
            </AnimatePresence>
        </CurrencyContainer>
    )
}

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
