/**
 * MAIN ENTRY POINT - SITE PÚBLICO
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import ThemeProvider from './components/ThemeProvider.jsx';
import './styles/index.css';
import { registerServiceWorker } from './utils/serviceWorkerRegistration';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <HelmetProvider>
                    <App />
                </HelmetProvider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
);

// Registra o Service Worker para PWA
// Apenas em produção (não em desenvolvimento)
if (import.meta.env.PROD) {
    registerServiceWorker();
}
