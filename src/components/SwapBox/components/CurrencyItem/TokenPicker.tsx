import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'

type TokenPickerProps = {
    onCurrencySelect?: () => void
    closeTokenPicker: () => void
    showNativeCurrency?: boolean
    currencyOmitList?: string[]
    selectedCurrency?: unknown | null
}

export const TokenPicker = ({
    onCurrencySelect,
    closeTokenPicker
}: TokenPickerProps) => {
    const [tokenPickerContainer] = useState(() => document.createElement('div'))

    useEffect(() => {
        tokenPickerContainer.classList.add('token-picker-root')
        document.body.appendChild(tokenPickerContainer)

        return () => {
            document.body.removeChild(tokenPickerContainer)
        }
    }, [tokenPickerContainer])

    return createPortal(
        <Container
            onClick={closeTokenPicker}
            initial={{ opacity: 0, scale: 2 }}
            animate={{
                opacity: 1,
                scale: 1,
                transition: {
                    duration: 0.2
                }
            }}
            exit={{
                opacity: 0,
                scale: 2,
                transition: {
                    duration: 0.1
                }
            }}
        >
            123
            {/* <Input
                placeholder='Search token by name or paste address'
                value={tokenPickerInputValue}
                onChange={handleInput}
                clearInput={clearInput}
            />

            <SearchList
                filteredSortedTokensWithNativeCurrency={
                    filteredSortedTokensWithNativeCurrency
                }
                handleCurrencySelect={handleCurrencySelect}
            />

            <CloseButton onClick={closeTokenPicker} /> */}
        </Container>,
        tokenPickerContainer
    )
}

const Container = styled(motion.div)`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.01);
    backdrop-filter: blur(7px);
`
