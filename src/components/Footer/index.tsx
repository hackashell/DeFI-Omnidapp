import styled from 'styled-components'

export const Footer = () => (
    <Container>
        <ProfilePhoto src='https://avatars.githubusercontent.com/u/24759563?v=4' />
        <ProfilePhoto src='https://avatars.githubusercontent.com/u/9700675?v=4' />
        <ProfilePhoto src='https://avatars.githubusercontent.com/u/26670962?v=4' />
    </Container>
)

const Container = styled.footer`
    height: 200px;
    background: linear-gradient(
        ${({ theme }) => theme.colors.no2subtleBackground},
        ${({ theme }) => theme.colors.no3elementBackground}
    );
`

const ProfilePhoto = styled.img`
    width: 64px;
    height: 64px;
    border: 3px solid ${({ theme }) => theme.colors.no7bordersInteractive};
    border-radius: 50%;
`
