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

import { useTheme } from './hooks/useTheme';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import LoadingSkeleton from './components/LoadingSkeleton';
import SEO from './components/SEO';
import SchemaMarkup from './components/SchemaMarkup';
import SkipLink from './components/SkipLink';
import CookieBanner from './components/CookieBanner';

function App() {
    // Carrega o tema (cores) da API
    // O hook useTheme aplica as cores automaticamente no documento
    const { theme, loading, error } = useTheme();

    // Se houver erro ao carregar o tema, mostra mensagem
    if (error) {
        console.error('Erro ao carregar tema:', error);
        // Continua mesmo com erro, usando cores padrão do CSS
    }

    // Enquanto carrega o tema, mostra um skeleton loading
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

            {/* Conteúdo principal */}
            <main id="main-content">
                {/* Seção Hero (principal) */}
                <Hero />

                {/* Seção Sobre */}
                <About />

                {/* Seção Serviços */}
                <Services />

                {/* Seção Equipe */}
                <Team />

                {/* Seção Depoimentos */}
                <Testimonials />

                {/* Seção Formulário de Contato */}
                <ContactForm />
            </main>

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
