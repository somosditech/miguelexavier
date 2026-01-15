/**
 * COMPONENTE: Footer
 * 
 * Rodapé do site com informações de contato, links e redes sociais.
 * 
 * O conteúdo vem da API através do hook useContent.
 */

import { useContent } from '../hooks/useContent';
import './Footer.css';

function Footer() {
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
                        {content.legalLinks && content.legalLinks.map((link, index) => (
                            <a key={index} href={link.url} className="footer-link">
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
