import styled from 'styled-components'

import { SearchItem } from './SearchItem'
import { TokenInfo } from '@uniswap/token-lists'

type SearchListProps = {
    filteredTokens: TokenInfo[]
    handleCurrencySelect?: (currency: unknown) => void
}

export function SearchList({
    filteredTokens,
    handleCurrencySelect
}: SearchListProps) {
    return (
        <Container>
            {filteredTokens.map(token => (
                <SearchItem
                    key={`${token.chainId}-${token.address}`}
                    token={token}
                />
            ))}
        </Container>
    )
}

const Container = styled.div`
    max-width: 478px;
    width: 100%;
    max-height: 450px;
    overflow-y: scroll;
    margin-top: 36px;

    &::-webkit-scrollbar {
        background-color: transparent;
    }
`
