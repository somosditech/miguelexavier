/**
 * COMPONENTE: CookieBanner
 * 
 * Banner de consentimento de cookies conforme LGPD
 * Permite aceitar, recusar ou personalizar cookies
 */

import { useState, useEffect } from 'react';
import './CookieBanner.css';

// Ícones SVG inline (sem dependências externas)
const CookieIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
        <path d="M8.5 8.5v.01" />
        <path d="M16 15.5v.01" />
        <path d="M12 12v.01" />
        <path d="M11 17v.01" />
        <path d="M7 14v.01" />
    </svg>
);

const XIcon = ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const SettingsIcon = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v6m0 6v6M5.6 5.6l4.2 4.2m4.2 4.2l4.2 4.2M1 12h6m6 0h6M5.6 18.4l4.2-4.2m4.2-4.2l4.2-4.2" />
    </svg>
);

function CookieBanner() {
    const [showBanner, setShowBanner] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [preferences, setPreferences] = useState({
        essential: true, // Sempre true, não pode ser desabilitado
        analytics: false
    });

    useEffect(() => {
        // Verifica se o usuário já deu consentimento
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            // Aguarda 1 segundo antes de mostrar o banner
            setTimeout(() => setShowBanner(true), 1000);
        } else {
            // Carrega preferências salvas
            const saved = JSON.parse(consent);
            setPreferences(saved.preferences);
        }
    }, []);

    const handleAcceptAll = () => {
        const consent = {
            timestamp: new Date().toISOString(),
            preferences: {
                essential: true,
                analytics: true
            }
        };
        localStorage.setItem('cookie_consent', JSON.stringify(consent));
        setShowBanner(false);

        // Aqui você pode inicializar scripts de analytics
        initializeAnalytics();
    };

    const handleRejectAll = () => {
        const consent = {
            timestamp: new Date().toISOString(),
            preferences: {
                essential: true,
                analytics: false
            }
        };
        localStorage.setItem('cookie_consent', JSON.stringify(consent));
        setShowBanner(false);
    };

    const handleSavePreferences = () => {
        const consent = {
            timestamp: new Date().toISOString(),
            preferences: preferences
        };
        localStorage.setItem('cookie_consent', JSON.stringify(consent));
        setShowSettings(false);
        setShowBanner(false);

        // Inicializa apenas os scripts permitidos
        if (preferences.analytics) {
            initializeAnalytics();
        }
    };

    const initializeAnalytics = () => {
        if (import.meta.env.DEV) {
            console.log('Analytics initialized');
        }
    };

    const togglePreference = (key) => {
        if (key === 'essential') return; // Não permite desabilitar essenciais
        setPreferences(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    if (!showBanner) return null;

    return (
        <>
            {/* Banner Principal */}
            <div className="cookie-banner">
                <div className="cookie-banner-content">
                    <div className="cookie-icon">
                        <CookieIcon />
                    </div>

                    <div className="cookie-text">
                        <h3>Privacidade e Cookies</h3>
                        <p>
                            Este site utiliza cookies para garantir a melhor experiência.
                            <strong>Não coletamos dados sensíveis</strong> (como CPF, RG, religião).
                            Os dados informados (Nome, Email e Telefone) são utilizados <strong>exclusivamente para retorno de solicitações ou dúvidas</strong> e não serão usados para nenhum outro objetivo.
                        </p>
                    </div>

                    <div className="cookie-actions">
                        <button
                            onClick={() => setShowSettings(true)}
                            className="btn-settings"
                            title="Configurar cookies"
                        >
                            <SettingsIcon size={18} />
                            Configurar
                        </button>
                        <button
                            onClick={handleRejectAll}
                            className="btn-reject"
                        >
                            Recusar
                        </button>
                        <button
                            onClick={handleAcceptAll}
                            className="btn-accept"
                        >
                            Aceitar e Continuar
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal de Configurações */}
            {showSettings && (
                <div className="cookie-modal-overlay" onClick={() => setShowSettings(false)}>
                    <div className="cookie-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="cookie-modal-header">
                            <h2>Configurações de Privacidade</h2>
                            <button
                                onClick={() => setShowSettings(false)}
                                className="btn-close"
                                aria-label="Fechar"
                            >
                                <XIcon size={24} />
                            </button>
                        </div>

                        <div className="cookie-modal-body">
                            <p className="cookie-modal-intro">
                                Respeitamos sua privacidade. Coletamos apenas dados estritamente necessários (Nome, Email, Telefone) para contato direto.
                                Não realizamos spam nem compartilhamos seus dados com terceiros para fins de marketing.
                            </p>

                            {/* Cookies Essenciais */}
                            <div className="cookie-category">
                                <div className="cookie-category-header">
                                    <div>
                                        <h3>Cookies Essenciais</h3>
                                        <p>Necessários para o funcionamento básico do site</p>
                                    </div>
                                    <label className="cookie-toggle disabled">
                                        <input
                                            type="checkbox"
                                            checked={true}
                                            disabled
                                        />
                                        <span className="toggle-slider"></span>
                                    </label>
                                </div>
                            </div>

                            {/* Cookies de Analytics */}
                            <div className="cookie-category">
                                <div className="cookie-category-header">
                                    <div>
                                        <h3>Cookies de Análise</h3>
                                        <p>Nos ajudam a entender como os visitantes usam o site (dados anônimos)</p>
                                    </div>
                                    <label className="cookie-toggle">
                                        <input
                                            type="checkbox"
                                            checked={preferences.analytics}
                                            onChange={() => togglePreference('analytics')}
                                        />
                                        <span className="toggle-slider"></span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="cookie-modal-footer">
                            <button
                                onClick={() => setShowSettings(false)}
                                className="btn-cancel"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSavePreferences}
                                className="btn-save"
                            >
                                Salvar Preferências
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CookieBanner;
