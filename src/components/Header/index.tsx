import { APPLICATION_WIDTH } from '@/constants'
import styled from 'styled-components'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export const Header = () => {
    return (
        <Container>
            <Content>
                <div>DeFi Omni Dapp</div>
                <div>
                    <ConnectButton />
                </div>
            </Content>
        </Container>
    )
}

const Container = styled.header``

const Content = styled.div`
    width: 100%;
    padding: 20px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
