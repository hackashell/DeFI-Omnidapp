import styled from 'styled-components'

export const ThemeSwitch = ({
    themeSwitchHandler
}: {
    themeSwitchHandler: () => void
}) => (
    <Button onClick={themeSwitchHandler}>
        <ButtonIcon />
    </Button>
)

const Button = styled.button`
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0.2rem;
    border: none;
    border-radius: 1rem;
    background: ${({ theme }) => theme.colors.no11textContrastLow};
    cursor: pointer;
`

const ButtonIcon = styled.div`
    width: 0.3rem;
    height: 0.6rem;
    border-radius: 1rem 0 0 1rem;
    background: ${({ theme }) => theme.colors.no2subtleBackground};
`
