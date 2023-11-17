import styled from 'styled-components'

function App() {
    return <Container>We're ready! 🚀</Container>
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: ${({ theme }) => theme.colors.no1};
`

export default App
