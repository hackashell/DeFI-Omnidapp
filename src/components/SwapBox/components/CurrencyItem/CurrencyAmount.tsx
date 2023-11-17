import { ChangeEvent, useState } from 'react'
import styled from 'styled-components'

export function CurrencyAmount() {
    const [inputValue, setInputValue] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>
        setInputValue(event.target.value)

    return (
        <StyledInput
            value={inputValue}
            onChange={onChangeHandler}
            type='number'
            inputMode='decimal'
            autoComplete='off'
            autoCorrect='off'
            pattern='^[0-9]*[.,]?[0-9]*$'
            placeholder='0.0'
            minLength={1}
            maxLength={79}
            spellCheck='false'
        />
    )
}

const StyledInput = styled.input`
    width: 100%;
    height: 34px;
    line-height: 34px;
    font-size: 28px;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: ${({ theme }) => theme.colors.no12textContrastHigh};
    background-color: transparent;
    border: none;
    outline: none;
    margin-bottom: 5px;

    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button,
    &:focus::-webkit-outer-spin-button,
    &:focus::-webkit-inner-spin-button,
    &:hover::-webkit-outer-spin-button,
    &:hover::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    [type='number'] {
        appearance: textfield;
        -moz-appearance: textfield;
    }
`
