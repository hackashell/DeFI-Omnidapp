import styled from 'styled-components'
import { Card, Avatar } from '@ensdomains/thorin'
import { APPLICATION_WIDTH } from '@/constants'

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
        <Content>
            <SectionHeading>Contributors</SectionHeading>
            <ContributorsList>
                {members.map(member => (
                    <a
                        href={member.githubUrl}
                        target='_blank'
                        key={`${member.firstName}-${member.lastName}`}
                    >
                        <StyledCard>
                            <ProfilePhoto>
                                <Avatar src={member.photoUrl} />
                            </ProfilePhoto>
                        </StyledCard>
                    </a>
                ))}
            </ContributorsList>
            <Paragraph>
                Created in November 2023, for ETH Global Istanbul 🇹🇷 hackathon
            </Paragraph>
        </Content>
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

const Content = styled.div`
    width: ${APPLICATION_WIDTH};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const SectionHeading = styled.h2`
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.no7bordersInteractive};
    margin-bottom: 0.75rem;
`

const StyledCard = styled(Card)`
    display: inline-flex;
    justify-content: flex-start;
    gap: 0.25rem;
    flex-direction: row;
    align-items: center;
    border: none;
    border-radius: 0.5rem;
    padding: 3px;
    opacity: 0.9;
    cursor: pointer;
    background-color: transparent;
`

const Paragraph = styled.p`
    display: inline-block;
    line-height: 1;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.no7bordersInteractive};
    margin-top: 2rem;
`

const ContributorsList = styled.div``

const ProfilePhoto = styled.div`
    width: 40px;
    height: 40px;
    border: 1px solid ${({ theme }) => theme.colors.no7bordersInteractive};
    border-radius: 50%;
`
