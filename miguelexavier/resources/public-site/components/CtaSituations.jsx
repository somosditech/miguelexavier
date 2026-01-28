import React from 'react';
import { CheckSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContent } from '../hooks/useContent';
import './CtaSituations.css';

/**
 * COMPONENTE: CtaSituations
 * 
 * Seção de CTA que lista situações comuns e convida para orientação jurídica.
 */
const CtaSituations = () => {
    // Busca informações de contato da API (opcional, para o link do WhatsApp)
    const { content: whatsappContent } = useContent('whatsapp');

    const phoneNumber = whatsappContent?.phoneNumber || '554184737511';
    const message = whatsappContent?.predefinedMessage || 'Olá! Gostaria de uma orientação jurídica sobre minha situação.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    const situations = [
        "DIVÓRCIO OU SEPARAÇÃO",
        "GUARDA DE FILHOS OU PENSÃO",
        "BENEFÍCIO DO INSS NEGADO",
        "APOSENTADORIA OU BPC LOAS",
        "INSEGURANÇA SOBRE SEUS DIREITOS"
    ];

    return (
        <section className="cta-situations">
            <div className="container">
                <div className="cta-situations-wrapper">
                    <motion.div
                        className="cta-situations-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="cta-title">
                            VOCÊ ESTÁ PASSANDO POR <br className="mobile-only" /> ALGUMAS DESSAS SITUAÇÕES?
                        </h2>
                    </motion.div>

                    <ul className="situations-list">
                        {situations.map((item, index) => (
                            <motion.li
                                key={index}
                                className="situation-item"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                            >
                                <div className="icon-wrapper">
                                    <CheckSquare className="check-icon" size={28} strokeWidth={1.5} />
                                </div>
                                <span className="situation-text">{item}</span>
                            </motion.li>
                        ))}
                    </ul>

                    <motion.div
                        className="cta-footer"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        <p className="cta-subtext">
                            SITUAÇÕES JURÍDICAS EXIGEM ORIENTAÇÃO SEGURA <br className="desktop-only" />
                            E DECISÕES BEM FUNDAMENTADAS
                        </p>

                        <motion.a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary cta-button"
                            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(119, 18, 32, 0.4)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            QUERO ORIENTAÇÃO JURÍDICA
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="#ffffff"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.2 8.2 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31c-.22.25-.87.86-.87 2.07c0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18s.21-1.07.15-1.18c-.07-.1-.23-.16-.48-.27c-.25-.14-1.47-.74-1.69-.82-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44c.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43c-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01" /></svg>
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CtaSituations;