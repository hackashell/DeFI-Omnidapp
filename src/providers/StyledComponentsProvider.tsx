import { ReactNode } from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

const theme = {
    colors: {
        no1: 'red'
    }
}

const GlobalStyles = createGlobalStyle`    
    :root {
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
        margin: 0;
    }
`

interface StyledComponentsProviderProps {
    children: ReactNode
}

export function StyledComponentsProvider({
    children
}: StyledComponentsProviderProps) {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            {children}
        </ThemeProvider>
    )
}
