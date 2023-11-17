import { APPLICATION_WIDTH } from '@/constants'
import styled from 'styled-components'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export const Header = () => {
    return (
        <Container>
            <Content>
                <ConnectButton />
            </Content>
        </Container>
    )
}

const Container = styled.header``

const Content = styled.div`
    width: 100%;
    max-width: ${APPLICATION_WIDTH};
    margin: 0 auto;
`
