/**
 * COMPONENTE PRINCIPAL: App
 * 
 * Este é o componente raiz da aplicação.
 * Ele organiza todos os outros componentes e gerencia o tema global.
 * 
 * Estrutura:
 * - Header (cabeçalho fixo)
 * - Hero (seção principal)
 * - About (sobre o escritório)
 * - Services (áreas de atuação)
 * - Team (equipe)
 * - ContactForm (formulário de contato)
 * - Footer (rodapé)
 */

import { Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import NotFound from './components/NotFound';
import WhatsAppButton from './components/WhatsAppButton';
import LoadingSkeleton from './components/LoadingSkeleton';
import SEO from './components/SEO';
import SchemaMarkup from './components/SchemaMarkup';
import SkipLink from './components/SkipLink';
import CookieBanner from './components/CookieBanner';

function App() {
    const { theme, loading, error } = useTheme();

    if (error) {
        if (import.meta.env.DEV) {
            console.error('Erro ao carregar tema:', error);
        }
    }

    if (loading) {
        return <LoadingSkeleton />;
    }

    return (
        <div className="app">
            {/* SEO e Meta Tags */}
            <SEO />
            <SchemaMarkup />

            {/* Skip Link para Acessibilidade */}
            <SkipLink />

            {/* Cabeçalho fixo no topo */}
            <Header />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>

            {/* Rodapé */}
            <Footer />

            {/* Botão flutuante do WhatsApp */}
            <WhatsAppButton />

            {/* Banner de Cookies LGPD */}
            <CookieBanner />
        </div>
    );
}

export default App;
