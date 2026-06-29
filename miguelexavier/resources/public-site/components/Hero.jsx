import { useContent } from '../hooks/useContent';
import { motion } from 'framer-motion';
import './Hero.css';

function Hero() {
    const { content, loading } = useContent('hero');
    const { content: whatsappContent } = useContent('whatsapp');
    const phoneNumber = whatsappContent?.phoneNumber || '554184737511';
    const message = whatsappContent?.predefinedMessage || 'Olá! Gostaria de agendar um atendimento.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

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
            {content.backgroundImage && (
                <img
                    src={content.backgroundImage}
                    alt=""
                    className="hero-bg-image"
                    fetchpriority="high"
                    loading="eager"
                />
            )}

            <div className="hero-overlay">
                <div className="container">
                    <motion.div
                        className="hero-content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Eyebrow: linha dourada + subtítulo */}
                        {content.subtitle && (
                            <motion.div
                                className="hero-eyebrow"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                <div className="hero-eyebrow-line" />
                                <p className="hero-subtitle">{content.subtitle}</p>
                            </motion.div>
                        )}

                        {/* Título */}
                        <motion.h1
                            className="hero-title"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.25 }}
                        >
                            {content.title}
                        </motion.h1>

                        {/* Ornamento dourado */}
                        <motion.div
                            className="hero-ornament"
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            style={{ transformOrigin: 'left' }}
                        >
                            <div className="hero-ornament-line" />
                            <div className="hero-ornament-diamond" />
                        </motion.div>

                        {/* Descrição */}
                        <motion.p
                            className="hero-description"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            {content.description}
                        </motion.p>

                        {/* Botões */}
                        <motion.div
                            className="hero-buttons"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.65 }}
                        >
                            {content.ctaButtons.map((button, index) => (
                                <motion.a
                                    key={index}
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary button-whatsapp"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    {button.text}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.2 8.2 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31c-.22.25-.87.86-.87 2.07c0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18s.21-1.07.15-1.18c-.07-.1-.23-.16-.48-.27c-.25-.14-1.47-.74-1.69-.82-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44c.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43c-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01" /></svg>
                                </motion.a>
                            ))}
                        </motion.div>

                        {/* Trust signals */}
                        <motion.div
                            className="hero-trust"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.85 }}
                        >
                            <p className="hero-trust-item">Atendimento on-line</p>
                            <div className="hero-trust-dot" />
                            <p className="hero-trust-item">Sigilo absoluto</p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <div className="hero-scroll" aria-hidden="true">
                    <div className="hero-scroll-line" />
                    <div className="hero-scroll-arrow" />
                </div>
            </div>
        </section>
    );
}

export default Hero;
