import { ReactNode, useState } from 'react'
import styled, {
    ThemeProvider,
    createGlobalStyle,
    DefaultTheme
} from 'styled-components'
import { sky, skyDark } from '@radix-ui/colors'

import { ThemeSwitch } from '@/components'

import { APPLICATION_WIDTH } from '@/constants'

const lightTheme: DefaultTheme = {
    colors: {
        no1appBackground: sky.sky1,
        no2subtleBackground: sky.sky2,

        no3elementBackground: sky.sky3,
        no4elementBackgroundHovered: sky.sky4,
        no5elementBackgroundActive: sky.sky5,

        no6bordersNonInteractive: sky.sky6,
        no7bordersInteractive: sky.sky7,
        no8bordersInteractiveFocused: sky.sky8,

        no9solidBackground: sky.sky9,
        no10solidBackgroundHovered: sky.sky10,

        no11textContrastLow: sky.sky11,
        no12textContrastHigh: sky.sky12
    }
}

const darkTheme: DefaultTheme = {
    colors: {
        no1appBackground: skyDark.sky1,
        no2subtleBackground: skyDark.sky2,

        no3elementBackground: skyDark.sky3,
        no4elementBackgroundHovered: skyDark.sky4,
        no5elementBackgroundActive: skyDark.sky5,

        no6bordersNonInteractive: skyDark.sky6,
        no7bordersInteractive: skyDark.sky7,
        no8bordersInteractiveFocused: skyDark.sky8,

        no9solidBackground: skyDark.sky9,
        no10solidBackgroundHovered: skyDark.sky10,

        no11textContrastLow: skyDark.sky11,
        no12textContrastHigh: skyDark.sky12
    }
}

const GlobalStyles = createGlobalStyle`    
    :root {
        position: relative;

        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        line-height: 1.5;
        font-weight: 400;

        color-scheme: light dark;
        color: rgba(255, 255, 255, 0.87);
        background-color: #242424;

        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    body {
        min-width: 320px;
        min-height: 100vh;
        display: flex;
        place-items: center;
        color: ${({ theme }) => theme.colors.no12textContrastHigh};
        background-color: ${({ theme }) => theme.colors.no1appBackground};
        margin: 0;
    }
`

enum Theme {
    LIGHT,
    DARK
}

interface StyledComponentsProviderProps {
    children: ReactNode
}

export function StyledComponentsProvider({
    children
}: StyledComponentsProviderProps) {
    const [theme, setTheme] = useState(Theme.DARK)

    const themeSwitchHandler = () =>
        setTheme(currentTheme =>
            currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
        )

    return (
        <ThemeProvider theme={theme === Theme.LIGHT ? lightTheme : darkTheme}>
            <GlobalStyles />
            <ThemeSwitch themeSwitchHandler={themeSwitchHandler} />
            <Container>{children}</Container>
        </ThemeProvider>
    )
}

const Container = styled.div`
    width: ${APPLICATION_WIDTH};
    max-width: ${APPLICATION_WIDTH};
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
`
