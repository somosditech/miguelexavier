/**
 * COMPONENTE: Header (Cabeçalho)
 * 
 * Este é o cabeçalho do site que aparece no topo de todas as páginas.
 * Contém o logo e o menu de navegação.
 * É responsivo: em mobile, o menu vira um menu hambúrguer.
 * 
 * O conteúdo (textos e links) vem da API através do hook useContent.
 */

import { useState } from 'react';
import { useContent } from '../hooks/useContent';
import './Header.css';

function Header() {
    // Busca o conteúdo do header da API
    const { content, loading } = useContent('header');

    // Estado para controlar se o menu mobile está aberto ou fechado
    const [menuOpen, setMenuOpen] = useState(false);

    // Função para alternar o menu (abrir/fechar)
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    /**
     * Função para fechar o menu e fazer scroll suave até a seção
     * @param {Event} e - Evento de clique
     * @param {string} href - ID da seção (ex: #about)
     */
    const handleNavClick = (e, href) => {
        e.preventDefault(); // Previne o comportamento padrão do link

        // Fecha o menu mobile
        setMenuOpen(false);

        // Remove o # do href para pegar o ID
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
                    <div className="logo">
                        <img
                            src="/logo.png"
                            alt="Miguel & Xavier Advocacia"
                            className="logo-image"
                        />
                    </div>

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
                            href={content.ctaButton.href}
                            className="btn-primary cta-button"
                            onClick={(e) => handleNavClick(e, content.ctaButton.href)}
                        >
                            {content.ctaButton.text}
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
