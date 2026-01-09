/**
 * COMPONENTE: Testimonials
 * 
 * Seção de depoimentos de clientes com carrossel interativo.
 * Mostra feedback de clientes satisfeitos para gerar prova social.
 */

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../hooks/useContent';
import './Testimonials.css';

function Testimonials() {
    const { content, loading } = useContent('testimonials');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // Auto-play do carrossel
    useEffect(() => {
        if (!content?.testimonials || content.testimonials.length === 0) return;

        const interval = setInterval(() => {
            handleNext();
        }, 5000); // Muda a cada 5 segundos

        return () => clearInterval(interval);
    }, [currentIndex, content]);

    if (loading) {
        return (
            <section id="testimonials" className="testimonials section">
                <div className="container">
                    <div className="spinner"></div>
                </div>
            </section>
        );
    }

    if (!content?.testimonials || content.testimonials.length === 0) {
        return null; // Não renderiza se não houver depoimentos
    }

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) =>
            prev === content.testimonials.length - 1 ? 0 : prev + 1
        );
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) =>
            prev === 0 ? content.testimonials.length - 1 : prev - 1
        );
    };

    const handleDotClick = (index) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    return (
        <section id="testimonials" className="testimonials section">
            <div className="container">
                {/* Cabeçalho da seção */}
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="section-subtitle">{content.subtitle}</p>
                    <h2 className="section-title">{content.title}</h2>
                </motion.div>

                {/* Carrossel de depoimentos */}
                <div className="testimonials-carousel" role="region" aria-label="Depoimentos de clientes">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            className="testimonial-card"
                            role="group"
                            aria-roledescription="slide"
                            aria-label={`Depoimento ${currentIndex + 1} de ${content.testimonials.length}`}
                        >
                            {/* Ícone de aspas */}
                            <div className="quote-icon" aria-hidden="true">
                                <Quote size={64} strokeWidth={1.5} />
                            </div>

                            {/* Texto do depoimento */}
                            <p className="testimonial-text">
                                "{content.testimonials[currentIndex].text}"
                            </p>

                            {/* Informações do cliente */}
                            <div className="testimonial-author">
                                <div className="author-info">
                                    <h4 className="author-name">
                                        {content.testimonials[currentIndex].name}
                                    </h4>
                                    <p className="author-role">
                                        {content.testimonials[currentIndex].role}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Controles de navegação */}
                    <button
                        className="carousel-button carousel-button-prev"
                        onClick={handlePrev}
                        aria-label="Ver depoimento anterior"
                        type="button"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        className="carousel-button carousel-button-next"
                        onClick={handleNext}
                        aria-label="Ver próximo depoimento"
                        type="button"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Dots de navegação */}
                    <div className="carousel-dots" role="tablist" aria-label="Navegação de depoimentos">
                        {content.testimonials.map((_, index) => (
                            <button
                                key={index}
                                className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => handleDotClick(index)}
                                role="tab"
                                aria-selected={index === currentIndex}
                                aria-label={`Ir para depoimento ${index + 1}`}
                                type="button"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
