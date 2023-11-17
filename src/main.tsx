import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { MetamaskProvider, StyledComponentsProvider } from '@/providers'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MetamaskProvider>
            <StyledComponentsProvider>
                <App />
            </StyledComponentsProvider>
        </MetamaskProvider>
    </React.StrictMode>
)
