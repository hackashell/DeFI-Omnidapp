import { APPLICATION_WIDTH } from '@/constants'
import styled from 'styled-components'

import { useMetamask } from '@/services'

export const Header = () => {
    const { connect, disconnect, connected, chainId, account } = useMetamask()

    return (
        <Container>
            <Content>
                <button onClick={connected ? disconnect : connect}>
                    {connected ? 'Disconnect' : 'Connect'}
                </button>
                {connected && (
                    <div>
                        <>
                            {chainId && `Connected chain: ${chainId}`}
                            <p></p>
                            {account && `Connected account: ${account}`}
                        </>
                    </div>
                )}
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

const ConnectButton = styled.button``
