import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import {
    StyledComponentsProvider,
    ReactQueryProvider,
    WagmiProvider
} from '@/providers'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ReactQueryProvider>
            <WagmiProvider>
                <StyledComponentsProvider>
                    <App />
                </StyledComponentsProvider>
            </WagmiProvider>
        </ReactQueryProvider>
    </React.StrictMode>
)
