import { APPLICATION_WIDTH } from '@/constants'
import styled from 'styled-components'

export const Header = () => (
    <Container>
        <Content>HEADER GOES HERE PETAR! 🤓</Content>
    </Container>
)

const Container = styled.header``

const Content = styled.div`
    width: 100%;
    max-width: ${APPLICATION_WIDTH};
    margin: 0 auto;
`
