import '@rainbow-me/rainbowkit/styles.css'

import { ReactNode } from 'react'
import {
    getDefaultWallets,
    RainbowKitProvider,
    darkTheme
} from '@rainbow-me/rainbowkit'
import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import {
    sepolia,
    arbitrumSepolia,
    polygonMumbai,
    polygonZkEvmTestnet,
    lineaTestnet,
    gnosisChiado,
    mantleTestnet,
    scrollTestnet,
    celoAlfajores,
} from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const { chains, publicClient } = configureChains(
    [sepolia, arbitrumSepolia, polygonMumbai, polygonZkEvmTestnet, gnosisChiado, scrollTestnet, mantleTestnet, lineaTestnet, celoAlfajores],
    [publicProvider()]
)

const { connectors } = getDefaultWallets({
    appName: 'DeFi Omni Dapp (powered by Shell Protocol)',
    projectId: 'OMNI_DAPP',
    chains
})

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
})

export function WagmiProvider({ children }: { children: ReactNode }) {
    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains} theme={darkTheme()}>
                {children}
            </RainbowKitProvider>
        </WagmiConfig>
    )
}
