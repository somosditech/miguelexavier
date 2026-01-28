import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../hooks/useContent';
import './CtaServiceWork.css';

/**
 * COMPONENTE: CtaServiceWork
 * 
 * Seção que explica o passo a passo do atendimento no formato Timeline.
 */
const CtaServiceWork = () => {
    const { content: whatsappContent } = useContent('whatsapp');

    const phoneNumber = whatsappContent?.phoneNumber || '554184737511';
    const message = whatsappContent?.predefinedMessage || 'Olá! Gostaria de agendar um atendimento.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    const steps = [
        {
            number: "1",
            title: "PRIMEIRO CONTATO",
            description: "VOCÊ ENTRA EM CONTATO PELO WHATSAPP E EXPLICA A SITUAÇÃO"
        },
        {
            number: "2",
            title: "ANÁLISE DO CASO",
            description: "ANALISAMOS SEU CASO COM ATENÇÃO, ÉTICA E RESPONSABILIDADE JURÍDICA"
        },
        {
            number: "3",
            title: "ORIENTAÇÃO E ESTRATÉGIA",
            description: "INDICAMOS O MELHOR CAMINHO JURÍDICO E ACOMPANHAMOS TODAS AS ETAPAS"
        }
    ];

    return (
        <section className="cta-service-work">
            <div className="container">
                <div className="service-work-wrapper">
                    <motion.h2
                        className="service-work-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        COMO FUNCIONA O ATENDIMENTO?
                    </motion.h2>

                    <div className="timeline-container">
                        {/* Linha vertical da timeline */}
                        <div className="timeline-line"></div>

                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                className="timeline-step"
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                <div className="timeline-marker">
                                    <span className="marker-number">{step.number}</span>
                                </div>
                                <div className="timeline-content">
                                    <h3 className="step-title">{step.title}</h3>
                                    <p className="step-description">{step.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="service-work-footer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <motion.a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary service-work-button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Entre em contato
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="#ffffff"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.2 8.2 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31c-.22.25-.87.86-.87 2.07c0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18s.21-1.07.15-1.18c-.07-.1-.23-.16-.48-.27c-.25-.14-1.47-.74-1.69-.82-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44c.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43c-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01" /></svg>
                        </motion.a>
                    </motion.div>
                </div>
            </div>

            {/* Ícone de fundo sutil */}
            <div className="bg-icon-overlay">
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3L4 6V8C4 13.1 7.4 17.8 12 19C16.6 17.8 20 13.1 20 8V6L12 3ZM12 17.2C8.6 16.1 6 12.3 6 8.5V7L12 4.8L18 7V8.5C18 12.3 15.4 16.1 12 17.2Z" />
                    <path d="M12 12V15H15V12H12Z" />
                </svg>
            </div>
        </section>
    );
};

export default CtaServiceWork;
