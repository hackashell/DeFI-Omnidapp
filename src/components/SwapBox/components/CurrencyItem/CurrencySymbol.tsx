import styled from 'styled-components'

type CurrencySymbolProps = {
    currency?: string
}

export function CurrencySymbol({ currency }: CurrencySymbolProps) {
    return <Paragraph>{currency}</Paragraph>
}

const Paragraph = styled.p`
    display: inline-block;
    line-height: 24px;
    font-size: 20px;
    font-weight: 600;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.no12textContrastHigh};
    margin: 0 6px;
`
