import styled from 'styled-components'

type Member = {
    firstName: string
    lastName: string
    photoUrl: string
}

const members: Member[] = [
    {
        firstName: 'Mirko',
        lastName: 'Basic',
        photoUrl: 'https://avatars.githubusercontent.com/u/24759563?v=4'
    },
    {
        firstName: 'Petar',
        lastName: 'Popovic',
        photoUrl: 'https://avatars.githubusercontent.com/u/9700675?v=4'
    },
    {
        firstName: 'Viraz',
        lastName: 'Malhotra',
        photoUrl: 'https://avatars.githubusercontent.com/u/26670962?v=4'
    }
]

export const Footer = () => (
    <Container>
        {members.map(member => (
            <Card>
                <ProfilePhoto
                    key={`${member.firstName}-${member.lastName}`}
                    src={member.photoUrl}
                />
                <Paragraph>{member.firstName}</Paragraph>
                <Paragraph>{member.lastName}</Paragraph>
            </Card>
        ))}
    </Container>
)

const Container = styled.footer`
    height: 200px;
    background: linear-gradient(
        ${({ theme }) => theme.colors.no2subtleBackground},
        ${({ theme }) => theme.colors.no1appBackground}
    );
`

const Card = styled.div`
    display: inline-block;
    padding: 1rem;
    background: linear-gradient(
        ${({ theme }) => theme.colors.no2subtleBackground},
        ${({ theme }) => theme.colors.no3elementBackground}
    );
    border-radius: 0.5rem;
`

const Paragraph = styled.p`
    line-height: 1;
    font-size: 1rem;
    text-align: center;
`

const ProfilePhoto = styled.img`
    width: 64px;
    height: 64px;
    border: 3px solid ${({ theme }) => theme.colors.no7bordersInteractive};
    border-radius: 50%;
`
