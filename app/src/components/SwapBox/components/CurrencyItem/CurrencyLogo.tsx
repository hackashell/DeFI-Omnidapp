import { useState } from 'react'
import styled from 'styled-components'

export const CurrencyLogo = ({ logoURI }: { logoURI: string }) => {
    const [imageError, setImageError] = useState(false)

    return (
        <Container>
            <StyledLogo
                src={
                    imageError
                        ? 'https://avatars.githubusercontent.com/u/24759563?s=400&u=ad63a8d249c09ce43a3f9e6f13807424597a81ce&v=4'
                        : logoURI
                }
                onError={() => setImageError(true)}
            />
        </Container>
    )
}

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
