/**
 * COMPONENTE: CookieBanner
 * 
 * Banner de consentimento de cookies conforme LGPD
 * Permite aceitar, recusar ou personalizar cookies
 */

import { useState, useEffect } from 'react';
import { X, Cookie, Settings } from 'lucide-react';
import './CookieBanner.css';

function CookieBanner() {
    const [showBanner, setShowBanner] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [preferences, setPreferences] = useState({
        essential: true, // Sempre true, não pode ser desabilitado
        analytics: false,
        marketing: false
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
                analytics: true,
                marketing: true
            }
        };
        localStorage.setItem('cookie_consent', JSON.stringify(consent));
        setShowBanner(false);

        // Aqui você pode inicializar scripts de analytics/marketing
        initializeAnalytics();
    };

    const handleRejectAll = () => {
        const consent = {
            timestamp: new Date().toISOString(),
            preferences: {
                essential: true,
                analytics: false,
                marketing: false
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
        // Aqui você pode adicionar Google Analytics, etc
        console.log('Analytics initialized');
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
                        <Cookie size={32} />
                    </div>

                    <div className="cookie-text">
                        <h3>Este site usa cookies</h3>
                        <p>
                            Utilizamos cookies para melhorar sua experiência, personalizar conteúdo e analisar nosso tráfego.
                            Ao clicar em "Aceitar todos", você concorda com o uso de cookies conforme nossa{' '}
                            <a href="#privacy" className="cookie-link">Política de Privacidade</a>.
                        </p>
                    </div>

                    <div className="cookie-actions">
                        <button
                            onClick={() => setShowSettings(true)}
                            className="btn-settings"
                            title="Configurar cookies"
                        >
                            <Settings size={18} />
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
                            Aceitar todos
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal de Configurações */}
            {showSettings && (
                <div className="cookie-modal-overlay" onClick={() => setShowSettings(false)}>
                    <div className="cookie-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="cookie-modal-header">
                            <h2>Configurações de Cookies</h2>
                            <button
                                onClick={() => setShowSettings(false)}
                                className="btn-close"
                                aria-label="Fechar"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="cookie-modal-body">
                            <p className="cookie-modal-intro">
                                Personalize suas preferências de cookies. Os cookies essenciais são necessários
                                para o funcionamento básico do site e não podem ser desabilitados.
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
                                        <p>Nos ajudam a entender como os visitantes usam o site</p>
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

                            {/* Cookies de Marketing */}
                            <div className="cookie-category">
                                <div className="cookie-category-header">
                                    <div>
                                        <h3>Cookies de Marketing</h3>
                                        <p>Usados para personalizar anúncios e conteúdo</p>
                                    </div>
                                    <label className="cookie-toggle">
                                        <input
                                            type="checkbox"
                                            checked={preferences.marketing}
                                            onChange={() => togglePreference('marketing')}
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
