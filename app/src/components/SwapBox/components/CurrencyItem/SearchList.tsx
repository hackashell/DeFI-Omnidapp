import styled from 'styled-components'

import { SearchItem } from './SearchItem'
import { TokenInfo } from '@uniswap/token-lists'

type SearchListProps = {
    filteredTokens: TokenInfo[]
    onCurrencySelect: (token: TokenInfo) => void
}

export function SearchList({
    filteredTokens,
    onCurrencySelect
}: SearchListProps) {
    return (
        <Container>
            {filteredTokens.map(token => (
                <SearchItem
                    key={`${token.chainId}-${token.address}`}
                    token={token}
                    onCurrencySelect={() => onCurrencySelect(token)}
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
