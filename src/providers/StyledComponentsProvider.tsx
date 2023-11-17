import { ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'

const theme = {
    colors: {
        no1: 'red'
    }
}

interface StyledComponentsProviderProps {
    children: ReactNode
}

export function StyledComponentsProvider({
    children
}: StyledComponentsProviderProps) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
