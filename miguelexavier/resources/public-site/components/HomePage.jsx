/**
 * PÁGINA: Home
 * 
 * Conteúdo da página inicial (Landing Page)
 */

import Hero from './Hero';
import About from './About';
import Services from './Services';
import Team from './Team';
import Testimonials from './Testimonials';
import ContactForm from './ContactForm';

function HomePage() {
    return (
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
    );
}

export default HomePage;
