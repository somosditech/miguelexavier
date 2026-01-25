/**
 * EDITOR DE TEMA (CORES E LOGO)
 */

import { useState, useEffect } from 'react';
import { getTheme, updateTheme } from '../services/adminApi';
import { Save, Palette, Upload } from 'lucide-react';
import '../styles/Editor.css';

function ThemeEditor() {
    const [theme, setTheme] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [logoError, setLogoError] = useState('');
    const [logoPreview, setLogoPreview] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        loadTheme();
    }, []);

    const loadTheme = async () => {
        try {
            const data = await getTheme();
            setTheme(data);
            if (data.logo_url) {
                setLogoPreview(`/storage/${data.logo_url}`);
            }
        } catch (error) {
            setMessage('Erro ao carregar tema');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setTheme({ ...theme, [field]: value });
    };

    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLogoError('');
        setMessage('');

        const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/svg+xml'];
        if (!allowedFormats.includes(file.type)) {
            setLogoError('Formato não permitido. Use JPG, PNG, GIF ou SVG.');
            e.target.value = '';
            return;
        }

        // Validar tamanho do arquivo (2MB = 2 * 1024 * 1024 bytes)
        const maxSize = 2 * 1024 * 1024;
        if (file.size > maxSize) {
            setLogoError('Arquivo muito grande. Tamanho máximo: 2MB.');
            e.target.value = '';
            return;
        }

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('logo', file);

            const token = localStorage.getItem('admin_token');

            const response = await fetch('/api/test-upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                setMessage('Logo enviada com sucesso!');
                setLogoPreview(result.url);
                // Recarrega tema para pegar novo logo_url
                await loadTheme();
                setTimeout(() => setMessage(''), 3000);
            } else {
                setLogoError('Erro ao enviar logo');
            }
        } catch (error) {
            console.error('Error uploading logo:', error);
            setLogoError('Erro ao enviar logo');
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        setErrors({});

        try {
            await updateTheme(theme);
            setMessage('Tema salvo com sucesso!');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else if (error.response?.data?.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Erro ao salvar Tema');
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
                    <h1><Palette size={28} /> Tema</h1>
                    <p>Personalize as cores e logo do site</p>
                </div>
            </div>

            {message && (
                <div className={`message ${message.includes('sucesso') ? 'success' : 'error'}`}>
                    {message}
                </div>
            )}

            <div className="editor-content">
                {/* Logo Section */}
                <div className="form-section">
                    <h3>Logo do Site</h3>
                    <div className="form-field">
                        <label htmlFor="logo-upload" className="upload-label">
                            <Upload size={20} />
                            {uploading ? 'Enviando...' : 'Escolher Logo'}
                        </label>
                        <input
                            id="logo-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            disabled={uploading}
                            style={{ display: 'none' }}
                        />
                        <small>Formatos aceitos: JPG, PNG, GIF, SVG (máx: 2MB)</small>

                        {/* Mensagem de erro específica para logo */}
                        {logoError && (
                            <div className="error-message" style={{ marginTop: '10px', color: '#dc2626', fontSize: '14px', fontWeight: '500' }}>
                                ⚠️ {logoError}
                            </div>
                        )}
                    </div>
                    {logoPreview && (
                        <div className="logo-preview">
                            <img src={logoPreview} alt="Logo Preview" style={{ maxHeight: '100px', marginTop: '10px' }} />
                        </div>
                    )}
                </div>

                {/* Colors Section */}
                <div className="form-section remove-border">
                    <h3>Cores do Tema</h3>
                    <div className="color-grid">
                        <div className="color-field">
                            <label>Cor Primária</label>
                            <div className="color-input-group">
                                <input
                                    type="color"
                                    value={theme?.primary_color || '#771220'}
                                    onChange={(e) => handleChange('primary_color', e.target.value)}
                                />
                                <input
                                    type="text"
                                    value={theme?.primary_color || '#771220'}
                                    onChange={(e) => handleChange('primary_color', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="color-field">
                            <label>Cor Secundária</label>
                            <div className="color-input-group">
                                <input
                                    type="color"
                                    value={theme?.secondary_color || '#cfa750'}
                                    onChange={(e) => handleChange('secondary_color', e.target.value)}
                                />
                                <input
                                    type="text"
                                    value={theme?.secondary_color || '#cfa750'}
                                    onChange={(e) => handleChange('secondary_color', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="color-field">
                            <label>Cor de Destaque</label>
                            <div className="color-input-group">
                                <input
                                    type="color"
                                    value={theme?.accent_color || '#e6b84d'}
                                    onChange={(e) => handleChange('accent_color', e.target.value)}
                                />
                                <input
                                    type="text"
                                    value={theme?.accent_color || '#e6b84d'}
                                    onChange={(e) => handleChange('accent_color', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="color-field">
                            <label>Fundo Claro</label>
                            <div className="color-input-group">
                                <input
                                    type="color"
                                    value={theme?.background_light || '#faf8f5'}
                                    onChange={(e) => handleChange('background_light', e.target.value)}
                                />
                                <input
                                    type="text"
                                    value={theme?.background_light || '#faf8f5'}
                                    onChange={(e) => handleChange('background_light', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="color-field">
                            <label>Fundo Escuro</label>
                            <div className="color-input-group">
                                <input
                                    type="color"
                                    value={theme?.background_dark || '#771220'}
                                    onChange={(e) => handleChange('background_dark', e.target.value)}
                                />
                                <input
                                    type="text"
                                    value={theme?.background_dark || '#771220'}
                                    onChange={(e) => handleChange('background_dark', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="color-field">
                            <label>Texto Primário</label>
                            <div className="color-input-group">
                                <input
                                    type="color"
                                    value={theme?.text_primary || '#2d2416'}
                                    onChange={(e) => handleChange('text_primary', e.target.value)}
                                />
                                <input
                                    type="text"
                                    value={theme?.text_primary || '#2d2416'}
                                    onChange={(e) => handleChange('text_primary', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
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
                <div className="form-actions">
                    <button onClick={handleSave} disabled={saving} className="btn-primary btn-large">
                        <Save size={18} />
                        {saving ? 'Salvando...' : 'Salvar Alterações'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ThemeEditor;
