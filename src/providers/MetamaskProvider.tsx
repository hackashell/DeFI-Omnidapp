import { MetaMaskProvider } from '@metamask/sdk-react'
import { ReactNode } from 'react'

export function MetamaskProvider({ children }: { children: ReactNode }) {
    return (
        <MetaMaskProvider
            debug={false}
            sdkOptions={{
                checkInstallationImmediately: false,
                dappMetadata: {
                    name: 'Demo React App',
                    url: window.location.host
                }
            }}
        >
            {children}
        </MetaMaskProvider>
    )
}
