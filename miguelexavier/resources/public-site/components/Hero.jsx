/**
 * COMPONENTE: Hero
 * 
 * Esta é a seção principal (primeira seção) do site.
 * Contém o título principal, descrição e botões de ação.
 * Tem uma imagem de fundo que vem da API.
 * 
 * O conteúdo vem da API através do hook useContent.
 */

import { useContent } from '../hooks/useContent';
import { motion } from 'framer-motion'; // Biblioteca de animações
import './Hero.css';

function Hero() {
    // Busca o conteúdo da seção hero da API
    const { content, loading } = useContent('hero');

    // Enquanto carrega, mostra um placeholder
    if (loading) {
        return (
            <section id="hero" className="hero">
                <div className="hero-overlay">
                    <div className="container">
                        <div className="hero-content">
                            <div className="spinner"></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section
            id="hero"
            className="hero"
            style={{
                // Define a imagem de fundo dinamicamente da API
                backgroundImage: `url(${content.backgroundImage})`
            }}
        >
            {/* Overlay escuro sobre a imagem para melhorar legibilidade do texto */}
            <div className="hero-overlay">
                <div className="container">
                    <motion.div
                        className="hero-content"
                        initial={{ opacity: 0, y: 50 }} // Estado inicial: invisível e abaixo
                        animate={{ opacity: 1, y: 0 }}  // Estado final: visível e na posição
                        transition={{ duration: 0.8, ease: "easeOut" }} // Duração e suavização
                    >
                        {/* Subtítulo */}
                        <motion.p
                            className="hero-subtitle"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            {content.subtitle}
                        </motion.p>

                        {/* Título principal */}
                        <motion.h1
                            className="hero-title"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            {content.title}
                        </motion.h1>

                        {/* Descrição */}
                        <motion.p
                            className="hero-description"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            {content.description}
                        </motion.p>

                        {/* Botões de ação */}
                        <motion.div
                            className="hero-buttons"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            {content.ctaButtons.map((button, index) => (
                                <motion.a
                                    key={index}
                                    href={button.href}
                                    className={button.primary ? 'btn-primary' : 'btn-secondary'}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {button.text}
                                </motion.a>
                            ))}
                        </motion.div>
                        <motion.p
                            className="cta-sub-description"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Atendimento on-line - Sigilo absoluto
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
