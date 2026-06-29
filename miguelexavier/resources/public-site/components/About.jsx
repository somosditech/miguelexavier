/**
 * COMPONENTE: About
 * 
 * Seção "Sobre o Escritório".
 * Mostra informações sobre o escritório e destaques (estatísticas).
 * 
 * O conteúdo vem da API através do hook useContent.
 */

import { useContent } from '../hooks/useContent';
import { motion } from 'framer-motion';
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
                            src={content.imageUrl || content.image}
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
                    </motion.div>
                </div>
                {/* Números de impacto — temporariamente oculto
                <motion.div
                    className="about-stats"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    {(content.highlights || [
                        { title: '+20 Anos', description: 'De experiência jurídica' },
                        { title: '+500 Casos', description: 'Resolvidos com sucesso' },
                        { title: '100%', description: 'Comprometimento com o cliente' },
                        { title: 'Digital', description: 'Atendimento online seguro' },
                    ]).map((stat, i) => (
                        <div key={stat.id || i} className="about-stat">
                            <span className="stat-value">{stat.title}</span>
                            <span className="stat-label">{stat.description}</span>
                        </div>
                    ))}
                </motion.div>
                */}
            </div>
        </section>
    );
}

export default About;
