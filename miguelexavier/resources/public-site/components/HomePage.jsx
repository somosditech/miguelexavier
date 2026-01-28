/**
 * PÁGINA: Home
 * 
 * Conteúdo da página inicial (Landing Page)
 */

import Hero from './Hero';
import About from './About';
import Services from './Services';
import CtaSituations from './CtaSituations';
import CtaServiceWork from './CtaServiceWork';
import Team from './Team';
import ContactForm from './ContactForm';

function HomePage() {
    return (
        <main id="main-content">
            <Hero />
            <CtaSituations />
            <Services />
            <CtaServiceWork />
            <About />
            <Team />
            <ContactForm />
        </main>
    );
}

export default HomePage;