import 'styled-components'

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            no1appBackground: string
            no2subtleBackground: string

            no3elementBackground: string
            no4elementBackgroundHovered: string
            no5elementBackgroundActive: string

            no6bordersNonInteractive: string
            no7bordersInteractive: string
            no8bordersInteractiveFocused: string

            no9solidBackground: string
            no10solidBackgroundHovered: string

            no11textContrastLow: string
            no12textContrastHigh: string
        }
    }
}
