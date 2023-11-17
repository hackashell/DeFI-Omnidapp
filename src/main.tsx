import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { StyledComponentsProvider } from '@/providers'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <StyledComponentsProvider>
            <App />
        </StyledComponentsProvider>
    </React.StrictMode>
)
