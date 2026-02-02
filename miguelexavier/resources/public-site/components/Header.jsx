/**
 * COMPONENTE: Header (Cabeçalho)
 * 
 * Este é o cabeçalho do site que aparece no topo de todas as páginas.
 * Contém o logo e o menu de navegação.
 * É responsivo: em mobile, o menu vira um menu hambúrguer.
 * 
 * O conteúdo (textos e links) vem da API através do hook useContent.
 */

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import { fetchTheme } from '../services/api';
import './Header.css';

function Header() {
    const { content, loading } = useContent('header');
    const location = useLocation();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState(null);
    const { content: whatsappContent } = useContent('whatsapp');
    const phoneNumber = whatsappContent?.phoneNumber || '554184737511';
    const message = whatsappContent?.predefinedMessage || 'Olá! Gostaria de agendar um atendimento.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Carrega o tema ao montar o componente
    useEffect(() => {
        const loadTheme = async () => {
            try {
                const themeData = await fetchTheme();
                setTheme(themeData);
            } catch (error) {
                if (import.meta.env.DEV) {
                    console.error('Error loading theme:', error);
                }
            }
        };
        loadTheme();
    }, []);

    // Função para alternar o menu (abrir/fechar)
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Previne scroll do body quando o menu está aberto
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        // Cleanup: restaura o scroll quando o componente desmonta
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    /**
     * Função para lidar com clique na logo
     * Sempre redireciona para a home e faz scroll para o topo
     */
    const handleLogoClick = (e) => {
        e.preventDefault();

        const isHomePage = location.pathname === '/';

        if (isHomePage) {
            // Já estamos na home: apenas faz scroll para o topo
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // Estamos em outra página: redireciona para a home
            navigate('/');
        }
    };

    /**
     * Função inteligente para navegação:
     * - Se estiver na home: faz scroll suave até a seção
     * - Se estiver em outra página: redireciona para home com a âncora
     * @param {Event} e - Evento de clique
     * @param {string} href - ID da seção (ex: #about)
     */
    const handleNavClick = (e, href) => {
        e.preventDefault(); // Previne o comportamento padrão do link

        // Fecha o menu mobile
        setMenuOpen(false);

        // Verifica se estamos na home
        const isHomePage = location.pathname === '/';

        if (isHomePage) {
            // Estamos na home: faz scroll suave
            const targetId = href.replace('#', '');
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Calcula a posição considerando a altura do header fixo (70px + margem)
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                // Faz o scroll suave até a seção
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        } else {
            // Estamos em outra página: redireciona para home com âncora
            navigate('/' + href);

            setTimeout(() => {
                const targetId = href.replace('#', '');
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
    };

    // Enquanto carrega, mostra um placeholder
    if (loading) {
        return (
            <header className="header">
                <div className="container">
                    <div className="header-content">
                        <div className="logo pulse">Carregando...</div>
                    </div>
                </div>
            </header>
        );
    }

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    {/* Logo do escritório */}
                    <a href="/" className="logo" onClick={handleLogoClick}>
                        {theme?.logoUrl ? (
                            <img
                                src={`/storage/${theme.logoUrl}`}
                                alt="Logo de Miguel & Xavier Advocacia"
                                className="logo-image"
                            />
                        ) : (
                            <span className="logo-text">Miguel & Xavier</span>
                        )}
                    </a>

                    {/* Botão hambúrguer para mobile */}
                    <button
                        className={`menu-toggle ${menuOpen ? 'active' : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    {/* Menu de navegação */}
                    <nav className={`nav ${menuOpen ? 'active' : ''}`}>
                        {/* Cabeçalho do menu mobile com botão de fechar */}
                        <div className="nav-header">
                            <span className="nav-title">Menu</span>
                            <button
                                className="nav-close"
                                onClick={toggleMenu}
                                aria-label="Fechar menu"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        {/* Overlay para fechar o menu ao clicar fora */}
                        <div className="nav-overlay" onClick={toggleMenu}></div>

                        <ul className="nav-list">
                            {content.navigation.map((item) => (
                                <li key={item.id} className="nav-item">
                                    <a
                                        href={item.href}
                                        className="nav-link"
                                        onClick={(e) => handleNavClick(e, item.href)}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {/* Botão de call-to-action */}
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            className="btn-primary cta-button"
                        >
                            Fale conosco
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="#ffffff"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.2 8.2 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31c-.22.25-.87.86-.87 2.07c0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18s.21-1.07.15-1.18c-.07-.1-.23-.16-.48-.27c-.25-.14-1.47-.74-1.69-.82-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44c.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43c-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01" /></svg>
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;