/**
 * COMPONENTE: Footer
 * 
 * Rodapé do site com informações de contato, links e redes sociais.
 * 
 * O conteúdo vem da API através do hook useContent.
 */

import { useState } from 'react';
import { useContent } from '../hooks/useContent';
import Modal from './Modal';
import './Footer.css';

function Footer() {
    // Estados para controle dos modais
    const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
    const [isTermsOpen, setIsTermsOpen] = useState(false);

    // Busca o conteúdo do footer da API
    const { content, loading } = useContent('footer');

    // Enquanto carrega, mostra um placeholder
    if (loading) {
        return (
            <footer className="footer">
                <div className="container">
                    <div className="spinner"></div>
                </div>
            </footer>
        );
    }

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Coluna 1: Sobre */}
                    <div className="footer-column">
                        <h3 className="footer-title">{content.about.title}</h3>
                        <p className="footer-text">{content.about.description}</p>
                    </div>

                    {/* Coluna 2: Contato */}
                    <div className="footer-column">
                        <h3 className="footer-title">{content.contact.title}</h3>
                        <div className="footer-contact">
                            <p className="footer-text">
                                <strong>Endereço:</strong><br />
                                {content.contact.address.split('\n').map((line, index) => (
                                    <span key={index}>
                                        {line}
                                        {index === 0 && <br />}
                                    </span>
                                ))}
                            </p>
                            <p className="footer-text">
                                <strong>Telefone:</strong><br />
                                <a href={`tel:${content.contact.phone.replace(/\D/g, '')}`}>
                                    {content.contact.phone}
                                </a>
                            </p>
                            <p className="footer-text">
                                <strong>Email:</strong><br />
                                <a href={`mailto:${content.contact.email}`}>
                                    {content.contact.email}
                                </a>
                            </p>
                            <p className="footer-text">
                                <strong>Horário:</strong><br />
                                {content.contact.hours}
                            </p>
                        </div>
                    </div>

                    {/* Coluna 3: Redes Sociais */}
                    <div className="footer-column">
                        <h3 className="footer-title">Redes Sociais</h3>
                        <div className="footer-social">
                            {content.socialLinks && content.socialLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    className="social-button"
                                    aria-label={link.name}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Linha divisória */}
                <div className="footer-divider"></div>

                {/* Rodapé inferior */}
                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © {new Date().getFullYear()} Miguel & Xavier. Todos os direitos reservados.
                    </p>
                    <div className="footer-links">
                        <div className="footer-links">
                            <button onClick={() => setIsPrivacyOpen(true)} className="footer-link-btn">
                                Política de Privacidade
                            </button>
                            <button onClick={() => setIsTermsOpen(true)} className="footer-link-btn">
                                Termos de Uso
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modais de Conteúdo Legal */}
            <Modal
                isOpen={isPrivacyOpen}
                onClose={() => setIsPrivacyOpen(false)}
                title="Política de Privacidade"
            >
                {content.privacy_policy_content || "Conteúdo não disponível."}
            </Modal>

            <Modal
                isOpen={isTermsOpen}
                onClose={() => setIsTermsOpen(false)}
                title="Termos de Uso"
            >
                {content.terms_of_use_content || "Conteúdo não disponível."}
            </Modal>
        </footer>
    );
}

export default Footer;
