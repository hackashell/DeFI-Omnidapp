import '@rainbow-me/rainbowkit/styles.css'

import { ReactNode } from 'react'
import {
    getDefaultWallets,
    RainbowKitProvider,
    darkTheme
} from '@rainbow-me/rainbowkit'
import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import {
    mainnet,
    arbitrum,
    avalanche,
    optimism,
    polygon,
    zkSync,
    gnosis
} from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const { chains, publicClient } = configureChains(
    [mainnet, arbitrum, avalanche, gnosis, optimism, polygon, zkSync],
    [publicProvider()]
)

const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
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
