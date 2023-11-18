import styled from 'styled-components'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export const Header = () => {
    return (
        <Container>
            <Logo>DeFi Omni Dapp</Logo>
            <div>
                <ConnectButton />
            </div>
        </Container>
    )
}

const Container = styled.header`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
`

const Logo = styled.p`
    line-height: 1;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -1px;
    background: -webkit-linear-gradient(300deg, #93f5ec 20%, #a77bf3 70%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
`
