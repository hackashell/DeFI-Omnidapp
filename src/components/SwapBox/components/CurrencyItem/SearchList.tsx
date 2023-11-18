import styled from 'styled-components'

import { SearchItem } from './SearchItem'

type SearchListProps = {
    filteredSortedTokensWithNativeCurrency?: unknown[]
    handleCurrencySelect?: (currency: unknown) => void
}

export function SearchList({
    filteredSortedTokensWithNativeCurrency,
    handleCurrencySelect
}: SearchListProps) {
    return (
        <Container>
            <SearchItem />
            <SearchItem />
            <SearchItem />
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
