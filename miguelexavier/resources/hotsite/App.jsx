/**
 * APP — Hotsite Miguel & Xavier
 * Design v2: Escuro premium, editorial
 */

import { useState, useEffect } from 'react';
import { fetchLinks, fetchProfile, fetchWhatsApp, FIXED_SITE_LINK } from './services/api';
import logoImg from './assets/logo.png';
import patternImg from './assets/pattern.png';
import faviconImg from './assets/favicon.png';

// ============================================
// ÍCONES SVG
// ============================================

const ICONS = {
    whatsapp: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.2 8.2 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18s.21-1.07.15-1.18c-.07-.1-.23-.16-.48-.27-.25-.14-1.47-.74-1.69-.82-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01" />
        </svg>
    ),
    site: (
        <img
            src={faviconImg}
            alt=""
            aria-hidden="true"
            style={{ width: '22px', height: '22px', objectFit: 'contain', borderRadius: '4px' }}
        />
    ),
    instagram: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
        </svg>
    ),
    lattes: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
        </svg>
    ),
    email: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
    ),
    linkedin: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
    ),
    youtube: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
        </svg>
    ),
    default: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
        </svg>
    ),
};

// ============================================
// SKELETON
// ============================================

function Skeleton() {
    return (
        <div className="hs-skeleton" aria-label="Carregando...">
            <div className="sk-base sk-logo" />
            <div className="sk-base sk-line" style={{ width: '200px', height: '1px', opacity: 0.3 }} />
            <div className="sk-base sk-line" style={{ width: '260px', height: '10px' }} />
            <div style={{ width: '100%', marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="sk-base sk-card"
                        style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
            </div>
        </div>
    );
}

// ============================================
// LINK CARD
// ============================================

function LinkCard({ link, index }) {
    const iconKey = link.icon || 'default';
    const icon = ICONS[iconKey] || ICONS.default;
    const isInternal = link.url.startsWith('mailto:') || link.url.startsWith('tel:');

    return (
        <li
            className="hs-link-item"
            style={{ animation: `fadeUp 0.45s cubic-bezier(0.4,0,0.2,1) ${0.3 + index * 0.08}s both` }}
        >
            <a
                href={link.url}
                className="hs-link-card"
                target={isInternal ? '_self' : '_blank'}
                rel="noopener noreferrer"
                aria-label={`${link.label}${link.description ? ` — ${link.description}` : ''}`}
            >
                <div className={`hs-icon ${iconKey}`}>
                    {icon}
                </div>

                <div className="hs-link-text">
                    <span className="hs-link-label">{link.label}</span>
                    {link.description && (
                        <span className="hs-link-desc">{link.description}</span>
                    )}
                </div>

                <svg className="hs-link-arrow" width="16" height="16"
                    viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
                </svg>
            </a>
        </li>
    );
}

// ============================================
// PERFIL
// ============================================

function Profile({ profile }) {
    return (
        <header className="hs-profile">
            {/* Logo real — filter CSS a torna dourada no fundo escuro */}
            <div className="hs-logo-wrap">
                <h1 className="hs-logo-h1">
                    <img
                        src={logoImg}
                        alt="Miguel & Xavier Advocacia"
                        className="hs-logo-img"
                    />
                </h1>
            </div>

            {/* Divisor ornamental */}
            <div className="hs-divider" aria-hidden="true">
                <div className="hs-divider-line" />
                <div className="hs-divider-dot" />
                <div className="hs-divider-line r" />
            </div>

            {profile.tagline && (
                <p className="hs-tagline">{profile.tagline}</p>
            )}
        </header>
    );
}

// ============================================
// APP ROOT
// ============================================

function App() {
    const [links, setLinks] = useState([]);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([fetchLinks(), fetchProfile(), fetchWhatsApp()])
            .then(([apiLinks, p, waLink]) => {
                // Links opcionais: só exibe se tiver url preenchida (is_active já filtrado no backend)
                const optionalLinks = apiLinks
                    .filter(l => l.url && l.url.trim() !== '')
                    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

                // Monta lista: Site Oficial (fixo) → WhatsApp (se cadastrado) → demais links da API
                const waLinks = waLink ? [waLink] : [];
                setLinks([FIXED_SITE_LINK, ...waLinks, ...optionalLinks]);
                setProfile(p);
            })
            .catch(() => {
                // Em caso de erro na API, exibe apenas o link fixo
                setLinks([FIXED_SITE_LINK]);
                setProfile({ name: 'Miguel & Xavier', subtitle: 'Advocacia', tagline: 'Comprometidos com a excelência jurídica e a defesa dos seus direitos.', logoUrl: null });
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <>
                <div className="hs-bg" aria-hidden="true">
                    <div className="hs-bg-pattern" style={{ backgroundImage: `url(${patternImg})` }} />
                </div>
                <main className="hs-wrapper">
                    <Skeleton />
                </main>
            </>
        );
    }

    return (
        <>
            {/* Camada de fundo com pattern */}
            <div className="hs-bg" aria-hidden="true">
                <div
                    className="hs-bg-pattern"
                    style={{ backgroundImage: `url(${patternImg})` }}
                />
            </div>

            <main className="hs-wrapper" role="main">
                <div className="hs-container">

                    {/* Ornamento topo */}
                    <div className="hs-ornament" aria-hidden="true">
                        <div className="hs-ornament-line" />
                        <div className="hs-ornament-diamond" />
                        <div className="hs-ornament-line right" />
                    </div>

                    {/* Perfil */}
                    {profile && <Profile profile={profile} />}

                    {/* Links */}
                    {links.length > 0 && (
                        <nav aria-label="Links de contato e redes sociais" style={{ width: '100%' }}>
                            <ul className="hs-links">
                                {links.map((link, i) => (
                                    <LinkCard key={link.id} link={link} index={i} />
                                ))}
                            </ul>
                        </nav>
                    )}

                    {/* Rodapé */}
                    <footer className="hs-footer">
                        <p className="hs-footer-text">
                            © {new Date().getFullYear()} Miguel &amp; Xavier Advocacia
                        </p>
                    </footer>

                </div>
            </main>
        </>
    );
}

export default App;
