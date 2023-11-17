import styled from 'styled-components'

import { ELEMENTS_BACKGROUND_PRIMARY } from '../../constants'

export const SwapButton = () => <Button>APPROVE</Button>

const Button = styled.button`
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border: none;
    border-radius: 12px;
    background: linear-gradient(
        90deg,
        rgba(46, 23, 242, 1) 0%,
        rgba(80, 0, 115, 1) 100%
    );
    box-shadow: 0px 0px 42px rgba(129, 62, 127, 0.32);
    cursor: pointer;

    &:hover {
        opacity: 0.9;
    }

    &:active {
        opacity: 0.8;
    }

    &:disabled {
        background: ${ELEMENTS_BACKGROUND_PRIMARY};
        cursor: default;
    }
`
