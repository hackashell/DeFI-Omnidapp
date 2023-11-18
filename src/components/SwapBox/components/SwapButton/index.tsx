import styled from 'styled-components'

import { ELEMENTS_BACKGROUND_PRIMARY } from '../../constants'
import {Button} from "@ensdomains/thorin";

export const SwapButton = () => <Button2>APPROVE</Button2>

const Button2 = styled(Button)`
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border: none;
    border-radius: 12px;
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
