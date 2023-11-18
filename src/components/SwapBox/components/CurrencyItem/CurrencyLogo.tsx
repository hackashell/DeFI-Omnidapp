import styled from 'styled-components'

export const CurrencyLogo = ({ logoURI }: { logoURI: string }) => (
    <Container>
        <StyledLogo src={logoURI} />
    </Container>
)

const Container = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: linear-gradient(
        ${({ theme }) => theme.colors.no4elementBackgroundHovered},
        ${({ theme }) => theme.colors.no3elementBackground}
    );
`

const StyledLogo = styled.img`
    width: 20px;
    height: 20px;
    border-radius: 50%;
`
