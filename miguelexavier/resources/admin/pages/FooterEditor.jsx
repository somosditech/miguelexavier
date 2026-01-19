/**
 * EDITOR DE FOOTER
 */

import { useState, useEffect } from 'react';
import { getFooter, updateFooter } from '../services/adminApi';
import { Save, PanelBottomClose } from 'lucide-react';
import '../styles/Editor.css';

function FooterEditor() {
    const [footer, setFooter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    // Estados para redes sociais
    const [facebookUrl, setFacebookUrl] = useState('');
    const [instagramUrl, setInstagramUrl] = useState('');
    const [linkedinUrl, setLinkedinUrl] = useState('');

    // Estados para conteúdo legal (Texto)
    const [privacyContent, setPrivacyContent] = useState('');
    const [termsContent, setTermsContent] = useState('');

    useEffect(() => {
        loadFooter();
    }, []);

    const loadFooter = async () => {
        try {
            const data = await getFooter();
            setFooter(data);

            // Preencher redes sociais
            if (data.social_links && Array.isArray(data.social_links)) {
                data.social_links.forEach(link => {
                    if (link.name === 'Facebook') setFacebookUrl(link.url);
                    if (link.name === 'Instagram') setInstagramUrl(link.url);
                    if (link.name === 'LinkedIn') setLinkedinUrl(link.url);
                });
            }

            // Preencher conteúdo legal
            setPrivacyContent(data.privacy_policy_content || '');
            setTermsContent(data.terms_of_use_content || '');
        } catch (error) {
            console.error('Error loading footer:', error);
            setMessage('Erro ao carregar footer');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setFooter({ ...footer, [field]: value });
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        setErrors({});

        try {
            // Construir array de social_links
            const socialLinks = [];
            if (facebookUrl) socialLinks.push({ name: 'Facebook', url: facebookUrl });
            if (instagramUrl) socialLinks.push({ name: 'Instagram', url: instagramUrl });
            if (linkedinUrl) socialLinks.push({ name: 'LinkedIn', url: linkedinUrl });

            const dataToUpdate = {
                ...footer,
                social_links: socialLinks,
                privacy_policy_content: privacyContent,
                terms_of_use_content: termsContent
            };

            await updateFooter(dataToUpdate);
            setMessage('Footer salvo com sucesso!');
            // Scroll suave para o topo para mostrar a mensagem de sucesso
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error saving footer:', error);

            // Tratamento de erros de validação do backend
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
                // Scroll para o topo para mostrar os erros
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (error.response?.data?.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Erro ao salvar footer');
            }
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="loading">Carregando...</div>;

    return (
        <div className="editor-page">
            <div className="editor-header">
                <div>
                    <h1><PanelBottomClose size={28} /> Editor do Rodapé</h1>
                    <p>Edite o rodapé do site</p>
                </div>
            </div>

            {message && (
                <div className={`message ${message.includes('sucesso') ? 'success' : 'error'}`}>
                    {message}
                </div>
            )}
            <div className="editor-content">

                <h3>Seção Sobre</h3>

                <div className="form-field">
                    <label>Título</label>
                    <input
                        type="text"
                        value={footer?.about_title || ''}
                        onChange={(e) => handleChange('about_title', e.target.value)}
                        placeholder="Ex: Sobre Nós"
                    />
                </div>

                <div className="form-field">
                    <label>Descrição</label>
                    <textarea
                        value={footer?.about_description || ''}
                        onChange={(e) => handleChange('about_description', e.target.value)}
                        placeholder="Breve descrição do escritório..."
                        rows={4}
                    />
                </div>

                <hr style={{ margin: '32px 0', border: 'none', borderTop: '2px solid #e5e5e5' }} />

                <h3>Informações de Contato</h3>

                <div className="form-field">
                    <label>Título</label>
                    <input
                        type="text"
                        value={footer?.contact_title || ''}
                        onChange={(e) => handleChange('contact_title', e.target.value)}
                        placeholder="Ex: Contato"
                    />
                </div>

                <div className="form-field">
                    <label>Endereço</label>
                    <input
                        type="text"
                        value={footer?.contact_address || ''}
                        onChange={(e) => handleChange('contact_address', e.target.value)}
                        placeholder="Rua, número, bairro, cidade"
                    />
                </div>

                <div className="form-field">
                    <label>Telefone</label>
                    <input
                        type="text"
                        value={footer?.contact_phone || ''}
                        onChange={(e) => handleChange('contact_phone', e.target.value)}
                        placeholder="(11) 1234-5678"
                    />
                </div>

                <div className="form-field">
                    <label>Email</label>
                    <input
                        type="email"
                        value={footer?.contact_email || ''}
                        onChange={(e) => handleChange('contact_email', e.target.value)}
                        placeholder="contato@exemplo.com"
                    />
                </div>

                <div className="form-field">
                    <label>Horário de Atendimento</label>
                    <input
                        type="text"
                        value={footer?.contact_hours || ''}
                        onChange={(e) => handleChange('contact_hours', e.target.value)}
                        placeholder="Seg-Sex: 9h às 18h"
                    />
                </div>

                <hr style={{ margin: '32px 0', border: 'none', borderTop: '2px solid #e5e5e5' }} />

                <h3>Redes Sociais</h3>

                <div className="form-field">
                    <label>Facebook (URL)</label>
                    <input
                        type="url"
                        value={facebookUrl}
                        onChange={(e) => setFacebookUrl(e.target.value)}
                        placeholder="https://facebook.com/seu-perfil"
                    />
                </div>

                <div className="form-field">
                    <label>Instagram (URL)</label>
                    <input
                        type="url"
                        value={instagramUrl}
                        onChange={(e) => setInstagramUrl(e.target.value)}
                        placeholder="https://instagram.com/seu-perfil"
                    />
                </div>

                <div className="form-field">
                    <label>LinkedIn (URL)</label>
                    <input
                        type="url"
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                        placeholder="https://linkedin.com/in/seu-perfil"
                    />
                </div>

                <hr style={{ margin: '32px 0', border: 'none', borderTop: '2px solid #e5e5e5' }} />

                <h3>Conteúdo Legal</h3>

                <div className="form-field">
                    <label>Política de Privacidade</label>
                    <textarea
                        value={privacyContent}
                        onChange={(e) => setPrivacyContent(e.target.value)}
                        placeholder="Insira o texto da política de privacidade aqui..."
                        rows={10}
                        style={{ minHeight: '200px' }}
                    />
                </div>

                <div className="form-field">
                    <label>Termos de Uso</label>
                    <textarea
                        value={termsContent}
                        onChange={(e) => setTermsContent(e.target.value)}
                        placeholder="Insira o texto dos termos de uso aqui..."
                        rows={10}
                        style={{ minHeight: '200px' }}
                    />
                </div>

                {/* Exibir erros de validação */}
                {Object.keys(errors).length > 0 && (
                    <div className="error-list">
                        {Object.entries(errors).map(([field, messages]) => (
                            <div key={field} className="error-item">
                                {messages[0]}
                            </div>
                        ))}
                    </div>
                )}

                {/* Botão Salvar */}
                <div className="form-actions remove-border">
                    <button onClick={handleSave} disabled={saving} className="btn-primary btn-large">
                        <Save size={18} />
                        {saving ? 'Salvando...' : 'Salvar Alterações'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FooterEditor;
