/**
 * COMPONENTE: Team
 * 
 * Seção "Nossa Equipe".
 * Mostra os membros da equipe de advogados com fotos e informações.
 * 
 * O conteúdo vem da API através do hook useContent.
 */

import { useContent } from '../hooks/useContent';
import { motion } from 'framer-motion'; // Biblioteca de animações
import LazyImage from './LazyImage';
import './Team.css';

function Team() {
    // Busca o conteúdo da seção team da API
    const { content, loading } = useContent('team');

    // Enquanto carrega, mostra um placeholder
    if (loading) {
        return (
            <section id="team" className="team section">
                <div className="container">
                    <div className="spinner"></div>
                </div>
            </section>
        );
    }

    return (
        <section id="team" className="team section">
            <div className="container">
                {/* Cabeçalho da seção */}
                <div className="section-header">
                    <p className="section-subtitle">{content.subtitle}</p>
                    <h2 className="section-title">{content.title}</h2>
                </div>

                {/* Grid de membros da equipe */}
                <div className="team-grid">
                    {content.members.map((member, index) => (
                        <motion.div
                            key={member.id}
                            className="team-card"
                            initial={{ opacity: 0, y: 50 }} // Começa invisível e abaixo
                            whileInView={{ opacity: 1, y: 0 }} // Aparece ao entrar na viewport
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: index * 0.15 }} // Delay escalonado
                            whileHover={{ y: -5 }} // Levanta ao passar o mouse
                        >
                            {/* Foto do advogado */}
                            <div className="team-image-wrapper">
                                <LazyImage
                                    src={member.image}
                                    alt={`${member.name} - ${member.role} - ${member.specialization}`}
                                    className="team-image"
                                />
                            </div>

                            {/* Informações do advogado */}
                            <div className="team-info">
                                <h3 className="team-name">{member.name}</h3>
                                <p className="team-role">{member.role}</p>
                                <p className="team-specialization">{member.specialization}</p>
                                <p className="team-oab">{member.oab}</p>
                                <p className="team-description">{member.description}</p>

                                {/* Links de contato/redes sociais */}
                                <div className="team-social">
                                    {member.social.linkedin && (
                                        <motion.a
                                            href={member.social.linkedin}
                                            className="social-link"
                                            aria-label="LinkedIn"
                                            whileHover={{ scale: 1.1, y: -3 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <span>in</span>
                                        </motion.a>
                                    )}
                                    {member.social.email && (
                                        <motion.a
                                            href={`mailto:${member.social.email}`}
                                            className="social-link"
                                            aria-label="Email"
                                            whileHover={{ scale: 1.1, y: -3 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <span>✉</span>
                                        </motion.a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Team;
