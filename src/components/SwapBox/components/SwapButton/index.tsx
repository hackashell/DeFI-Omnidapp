import styled from 'styled-components'

import { Chain } from 'viem'

type SwapButtonProps = {
    chain: Chain | undefined
}

export const SwapButton = ({ chain }: SwapButtonProps) => {
    const getButtonLabel = () => {
        if (!chain) return 'Please Connect a Wallet'

        return 'Approve'
    }
    return <StyledButton disabled={!chain}>{getButtonLabel()}</StyledButton>
}

const StyledButton = styled.button`
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border: none;
    border-radius: 12px;
    box-shadow: 0px 0px 42px rgba(129, 62, 127, 0.32);
    color: ${({ theme }) => theme.colors.no12textContrastHigh};
    background: ${({ theme }) => theme.colors.no8bordersInteractiveFocused};
    cursor: pointer;

    &:hover {
        opacity: 0.9;
    }

    &:active {
        opacity: 0.8;
    }

    &:disabled {
        background: ${({ theme }) => theme.colors.no2subtleBackground};
        cursor: not-allowed;
    }
`
