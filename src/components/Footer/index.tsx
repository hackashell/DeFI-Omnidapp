import styled from 'styled-components'
import { Card } from '@ensdomains/thorin'

type Member = {
    firstName: string
    lastName: string
    photoUrl: string
    githubUrl: string
}

const members: Member[] = [
    {
        firstName: 'Mirko',
        lastName: 'Basic',
        photoUrl: 'https://avatars.githubusercontent.com/u/24759563?v=4',
        githubUrl: 'https://github.com/bejzik8'
    },
    {
        firstName: 'Viraz',
        lastName: 'Malhotra',
        photoUrl: 'https://avatars.githubusercontent.com/u/26670962?v=4',
        githubUrl: 'https://github.com/viraj124'
    },
    {
        firstName: 'Petar',
        lastName: 'Popovic',
        photoUrl: 'https://avatars.githubusercontent.com/u/9700675?v=4',
        githubUrl: 'https://github.com/develo-pera'
    }
]

export const Footer = () => (
    <Container>
        {members.map(member => (
            <a
                href={member.githubUrl}
                target='_blank'
                key={`${member.firstName}-${member.lastName}`}
            >
                <StyledCard>
                    <ProfilePhoto src={member.photoUrl} />
                    <Paragraph>{member.firstName}</Paragraph>
                    <Paragraph>{member.lastName}</Paragraph>
                </StyledCard>
            </a>
        ))}
    </Container>
)

const Container = styled.footer`
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    position: relative;
    background: rgba(16, 20, 28, 0.7);
`

const StyledCard = styled(Card)`
    display: inline-block;
    padding: 1rem;
    background: linear-gradient(
        ${({ theme }) => theme.colors.no2subtleBackground},
        ${({ theme }) => theme.colors.no3elementBackground}
    );
    border: none;
    border-radius: 0.5rem;
    opacity: 0.9;
    cursor: pointer;
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
