import styled from 'styled-components'

import CloseSVG from '../../assets/close.svg?react'
import { TOKEN_PICKER_CLOSE_BUTTON_BACKGROUND_COLOR } from '../../constants'

type CloseButtonProps = {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export function CloseButton({ onClick }: CloseButtonProps) {
    return (
        <Button onClick={onClick}>
            <CloseSVG />
        </Button>
    )
}

const Button = styled.button`
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 1px solid #8e89c6;
    background: ${TOKEN_PICKER_CLOSE_BUTTON_BACKGROUND_COLOR};
    box-shadow:
        inset 0px 1.11185px 6.6711px rgba(165, 164, 255, 0.08),
        inset 6.6711px 2.2237px 11.1185px rgba(143, 141, 255, 0.1);
    backdrop-filter: blur(5px);
    cursor: pointer;
`
