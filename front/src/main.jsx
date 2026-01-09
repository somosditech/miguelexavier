/**
 * PONTO DE ENTRADA DA APLICAÇÃO
 * 
 * Este arquivo é o primeiro a ser executado quando a aplicação inicia.
 * Ele monta o componente App no elemento HTML com id="root".
 * 
 * Fluxo:
 * 1. Importa o React e ReactDOM
 * 2. Importa o componente App
 * 3. Importa os estilos globais
 * 4. Monta a aplicação no DOM
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './styles/index.css';
import { registerServiceWorker } from './utils/serviceWorkerRegistration';

// Cria a raiz da aplicação React
// O elemento com id="root" está no arquivo index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza a aplicação
// React.StrictMode ajuda a identificar problemas durante o desenvolvimento
// HelmetProvider permite gerenciar meta tags com react-helmet-async
root.render(
    <React.StrictMode>
        <HelmetProvider>
            <App />
        </HelmetProvider>
    </React.StrictMode>
);

// Registra o Service Worker para PWA
// Apenas em produção (não em desenvolvimento)
if (import.meta.env.PROD) {
    registerServiceWorker();
}
