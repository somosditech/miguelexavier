/**
 * COMPONENTE: About
 * 
 * Seção "Sobre o Escritório".
 * Mostra informações sobre o escritório e destaques (estatísticas).
 * 
 * O conteúdo vem da API através do hook useContent.
 */

import { useContent } from '../hooks/useContent';
import * as LucideIcons from 'lucide-react'; // Importa todos os ícones do Lucide
import { motion } from 'framer-motion'; // Biblioteca de animações
import LazyImage from './LazyImage';
import './About.css';

function About() {
    // Busca o conteúdo da seção about da API
    const { content, loading } = useContent('about');

    // Enquanto carrega, mostra um placeholder
    if (loading) {
        return (
            <section id="about" className="about section">
                <div className="container">
                    <div className="spinner"></div>
                </div>
            </section>
        );
    }

    return (
        <section id="about" className="about section">
            <div className="container">
                <div className="about-grid">
                    {/* Coluna da esquerda: Imagem */}
                    <motion.div
                        className="about-image-wrapper"
                        initial={{ opacity: 0, x: -50 }} // Começa invisível e à esquerda
                        whileInView={{ opacity: 1, x: 0 }} // Aparece ao entrar na viewport
                        viewport={{ once: true, amount: 0.3 }} // Anima apenas uma vez
                        transition={{ duration: 0.6 }}
                    >
                        <LazyImage
                            src={content.imageUrl}
                            alt="Escritório Miguel & Xavier - Ambiente profissional e acolhedor"
                            className="about-image"
                        />
                    </motion.div>

                    {/* Coluna da direita: Conteúdo */}
                    <motion.div
                        className="about-content"
                        initial={{ opacity: 0, x: 50 }} // Começa invisível e à direita
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <p className="section-subtitle">{content.subtitle}</p>
                        <h2 className="section-title">{content.title}</h2>
                        <p className="about-description">{content.description}</p>

                        {/* Grid de destaques (estatísticas) */}
                        {/* <div className="highlights-grid">
                            {content.highlights.map((highlight, index) => {
                                // Pega o componente de ícone dinamicamente pelo nome
                                const IconComponent = LucideIcons[highlight.icon];

                                return (
                                    <motion.div
                                        key={highlight.id}
                                        className="highlight-card"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }} // Delay escalonado
                                        whileHover={{ scale: 1.05 }} // Aumenta ao passar o mouse
                                    >
                                        <div className="highlight-icon"> */}
                        {/* Renderiza o ícone Lucide React */}
                        {/* {IconComponent && <IconComponent size={48} strokeWidth={1.5} />}
                                        </div>
                                        <h3 className="highlight-title">{highlight.title}</h3>
                                        <p className="highlight-description">{highlight.description}</p>
                                    </motion.div>
                                );
                            })}
                        </div> */}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default About;
