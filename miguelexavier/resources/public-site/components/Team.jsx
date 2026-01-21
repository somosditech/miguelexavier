import { useContent } from '../hooks/useContent';
import { motion } from 'framer-motion';
import LazyImage from './LazyImage';
import './Team.css';

const TeamSkeleton = () => (
    <div className="member-row skeleton">
        <div className="member-image-side">
            <div className="skel-frame"></div>
        </div>
        <div className="member-content-side">
            <div className="skel-line title"></div>
            <div className="skel-line role"></div>
            <div className="skel-line text"></div>
        </div>
    </div>
);

function Team() {
    const { content, loading } = useContent('team');

    if (loading || !content) {
        return (
            <section id="team" className="team-editorial">
                <div className="container">
                    {[1, 2].map(n => <TeamSkeleton key={n} />)}
                </div>
            </section>
        );
    }

    const members = Array.isArray(content) ? content : (content.members || []);
    const title = content.title || 'Nossa Equipe';
    const subtitle = content.subtitle || 'Excelência Jurídica';

    return (
        <section id="team" className="team-editorial">
            <div className="container">
                <header className="editorial-header">
                    <span className="ed-subtitle">{subtitle}</span>
                    <h2 className="ed-title">{title}</h2>
                    <div className="ed-line"></div>
                </header>

                <div className="members-list">
                    {members.map((member, index) => (
                        <motion.div
                            key={member.id}
                            className="member-row"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7, delay: index * 0.1 }}
                        >
                            <div className="member-image-side">
                                <div className="img-border-outer">
                                    <div className="img-frame">
                                        <LazyImage
                                            src={member.image}
                                            alt={member.name}
                                            className="member-img"
                                        />
                                        <div className="member-social-overlay">
                                            {member.social.linkedin && (
                                                <a href={member.social.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                                            )}
                                            {member.social.email && (
                                                <a href={`mailto:${member.social.email}`}>E-mail</a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="member-content-side">
                                <div className="member-meta">
                                    <span className="member-oab">{member.oab}</span>
                                    <h3 className="member-name">{member.name}</h3>
                                    <p className="member-role">
                                        {member.role} <span className="sep">|</span> {member.specialization}
                                    </p>
                                </div>

                                <div className="member-bio">
                                    <p>{member.description}</p>
                                </div>

                                <motion.a
                                    href="#contato"
                                    className="member-contact-link"
                                    whileHover={{ x: 8 }}
                                >
                                    Falar com este especialista <span>→</span>
                                </motion.a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Team;