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
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
    // Carrega o tema (cores) da API
    // O hook useTheme aplica as cores automaticamente no documento
    const { theme, loading, error } = useTheme();

    // Se houver erro ao carregar o tema, mostra mensagem
    if (error) {
        console.error('Erro ao carregar tema:', error);
        // Continua mesmo com erro, usando cores padrão do CSS
    }

    // Enquanto carrega o tema, mostra um loading
    if (loading) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                <div className="spinner"></div>
                <p>Carregando...</p>
            </div>
        );
    }

    return (
        <div className="app">
            {/* Cabeçalho fixo no topo */}
            <Header />

            {/* Conteúdo principal */}
            <main>
                {/* Seção Hero (principal) */}
                <Hero />

                {/* Seção Sobre */}
                <About />

                {/* Seção Serviços */}
                <Services />

                {/* Seção Equipe */}
                <Team />

                {/* Seção Formulário de Contato */}
                <ContactForm />
            </main>

            {/* Rodapé */}
            <Footer />

            {/* Botão flutuante do WhatsApp */}
            <WhatsAppButton />
        </div>
    );
}

export default App;
