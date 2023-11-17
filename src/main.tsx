import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { StyledComponentsProvider, WagmiProvider } from '@/providers'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <WagmiProvider>
            <StyledComponentsProvider>
                <App />
            </StyledComponentsProvider>
        </WagmiProvider>
    </React.StrictMode>
)
