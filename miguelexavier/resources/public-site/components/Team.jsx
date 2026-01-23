import { useContent } from '../hooks/useContent';
import { motion } from 'framer-motion';
import LazyImage from './LazyImage';
import './Team.css';

const TeamSkeleton = () => (
    <div className="member-row skeleton">
        <div className="member-image-side"><div className="skel-frame"></div></div>
        <div className="member-content-side">
            <div className="skel-line title"></div>
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
        <section id="team" className="team-editorial section">
            <div className="container">
                <header className="editorial-header">
                    <p className="section-subtitle">{subtitle}</p>
                    <h2 className="section-title">{title}</h2>
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
                                        <div className="member-social-float">
                                            {member.social.lattes && (
                                                <a href={member.social.lattes} target="_blank" rel="noreferrer" className="social-icon-circle lattes" aria-label="Lattes">
                                                    <span>LA</span>
                                                </a>
                                            )}
                                            {member.social.email && (
                                                <a href={`mailto:${member.social.email}`} className="social-icon-circle email" aria-label="Email">
                                                    <span>✉</span>
                                                </a>
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
                                        {member.role} <span className="sep">|</span> <strong>{member.specialization}</strong>
                                    </p>
                                </div>

                                <div className="member-bio">
                                    <p>{member.description}</p>
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