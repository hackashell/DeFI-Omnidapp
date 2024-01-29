import styled from 'styled-components'
import { ConnectButton } from '@rainbow-me/rainbowkit'

import GitHubSVG from '../../assets/svg/github.svg?react'

export const Header = () => {
    return (
        <Container>
            <LogoContainer href='https://github.com/hackashell' target='_blank'>
                <GitHubLogo />
                <Logo>DeFi Omni Dapp</Logo>
            </LogoContainer>

            <div>
                <ConnectButton />
            </div>
        </Container>
    )
}

const Container = styled.header`
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
`

const LogoContainer = styled.a`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`

const GitHubLogo = styled(GitHubSVG)`
    width: 32px;
    height: 32px;
    cursor: pointer;
`

// const Logo = styled.img`
//     width: 200px;
// `

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
