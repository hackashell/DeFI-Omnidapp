import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { StyledComponentsProvider } from './providers'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <StyledComponentsProvider>
            <App />
        </StyledComponentsProvider>
    </React.StrictMode>
)
