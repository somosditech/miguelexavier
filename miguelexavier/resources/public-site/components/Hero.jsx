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
    const { content, loading } = useContent('hero');
    const { content: whatsappContent } = useContent('whatsapp');
    const phoneNumber = whatsappContent?.phoneNumber || '554184737511';
    const message = whatsappContent?.predefinedMessage || 'Olá! Gostaria de agendar um atendimento.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

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
        <section id="hero" className="hero">
            {/* Imagem de Fundo Otimizada para LCP */}
            {content.backgroundImage && (
                <img
                    src={content.backgroundImage}
                    alt="Background"
                    className="hero-bg-image"
                    fetchpriority="high" // Alta prioridade para LCP
                    loading="eager"      // Carregamento imediato
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 0,
                        filter: 'brightness(0.6)' // Ajuste visual se necessário, ou usar overlay
                    }}
                />
            )}

            {/* Overlay escuro sobre a imagem para melhorar legibilidade do texto */}
            <div className="hero-overlay" style={{ zIndex: 1 }}>
                <div className="container">
                    <motion.div
                        className="hero-content"
                        initial={{ opacity: 0, y: 50 }} // Estado inicial: invisível e abaixo
                        animate={{ opacity: 1, y: 0 }}  // Estado final: visível e na posição
                        transition={{ duration: 0.8, ease: "easeOut" }} // Duração e suavização
                    >
                        {/* Subtítulo */}
                        {content.subtitle && (
                            <motion.p
                                className="hero-subtitle"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                {content.subtitle}
                            </motion.p>
                        )}

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
                                    href={whatsappUrl}
                                    target="_blank"
                                    className='btn-primary button-whatsapp'
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {button.text}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="#ffffff"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.2 8.2 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31c-.22.25-.87.86-.87 2.07c0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18s.21-1.07.15-1.18c-.07-.1-.23-.16-.48-.27c-.25-.14-1.47-.74-1.69-.82-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44c.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43c-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01" /></svg>
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
