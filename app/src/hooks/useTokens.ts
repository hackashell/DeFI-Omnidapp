import axios from 'axios'
import { TokenInfo, TokenList } from '@uniswap/token-lists'
import { useQuery } from '@tanstack/react-query'

const UNISWAP_DEFAULT = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org'

export const useTokens = () => {
    const getTokens = async () => {
        let tokens: TokenInfo[] = []

        try {
            const res = await axios.get<TokenList>(UNISWAP_DEFAULT)

            tokens = res.data.tokens
        } catch (error) {
            console.log(error)
        }

        return tokens
    }

    return useQuery<TokenInfo[]>({
        queryKey: ['todos'],
        queryFn: getTokens,
        refetchOnWindowFocus: false
    })
}
