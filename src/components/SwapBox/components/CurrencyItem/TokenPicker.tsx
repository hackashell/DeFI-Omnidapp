import { useState, useEffect, ChangeEvent } from 'react'
import styled from 'styled-components'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'

import { Input } from './Input'
import { SearchList } from './SearchList'
import { CloseButton } from './CloseButton'
import { TokenInfo } from '@uniswap/token-lists'

type TokenPickerProps = {
    tokens: TokenInfo[] | undefined
    onCurrencySelect: (token: TokenInfo) => void
    closeTokenPicker: () => void
}

export const TokenPicker = ({
    tokens,
    onCurrencySelect,
    closeTokenPicker
}: TokenPickerProps) => {
    const [tokenPickerContainer] = useState(() => document.createElement('div'))
    const [tokenPickerInputValue, setTokenPickerInputValue] = useState('')

    const handleCurrencySelect = (token: TokenInfo) => {
        onCurrencySelect(token)
        closeTokenPicker()
    }

    useEffect(() => {
        tokenPickerContainer.classList.add('token-picker-root')
        document.body.appendChild(tokenPickerContainer)

        return () => {
            document.body.removeChild(tokenPickerContainer)
        }
    }, [tokenPickerContainer])

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) =>
        setTokenPickerInputValue(event.target.value)

    const clearInput = () => setTokenPickerInputValue('')

    const onClose = (
        event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
    ) => {
        if (event.target === event.currentTarget) {
            event.stopPropagation()
            closeTokenPicker()
        }
    }

    return createPortal(
        <Container
            onClick={onClose}
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
            <Input
                placeholder='Search token by name or paste address'
                value={tokenPickerInputValue}
                onChange={handleOnChange}
                clearInput={clearInput}
            />
            {tokens?.length !== 0 && (
                <SearchList
                    filteredTokens={tokens?.filter(
                        (token: TokenInfo) =>
                            token.name
                                .toLowerCase()
                                .includes(
                                    tokenPickerInputValue.toLowerCase()
                                ) ||
                            token.symbol
                                .toLocaleLowerCase()
                                .includes(tokenPickerInputValue.toLowerCase())
                    )}
                    onCurrencySelect={handleCurrencySelect}
                />
            )}

            <CloseButton onClick={closeTokenPicker} />
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
