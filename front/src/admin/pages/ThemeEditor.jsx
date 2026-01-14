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
    const [logoPreview, setLogoPreview] = useState(null);

    useEffect(() => {
        loadTheme();
    }, []);

    const loadTheme = async () => {
        try {
            const data = await getTheme();
            setTheme(data);
            if (data.logo_url) {
                setLogoPreview(`http://localhost:8000/storage/${data.logo_url}`);
            }
        } catch (error) {
            console.error('Error loading theme:', error);
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

        setUploading(true);
        setMessage('');

        try {
            const formData = new FormData();
            formData.append('logo', file);

            const token = localStorage.getItem('admin_token');
            console.log('Token:', token ? 'exists' : 'missing'); // DEBUG

            // TESTE: Usando rota sem autenticação
            const response = await fetch('http://localhost:8000/api/test-upload', {
                method: 'POST',
                // headers: {
                //     'Authorization': `Bearer ${token}`
                // },
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                setMessage('Logo enviada com sucesso!');
                setLogoPreview(`http://localhost:8000${result.url}`);
                // Recarrega tema para pegar novo logo_url
                await loadTheme();
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage('Erro ao enviar logo');
            }
        } catch (error) {
            console.error('Error uploading logo:', error);
            setMessage('Erro ao enviar logo');
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');

        try {
            await updateTheme(theme);
            setMessage('Tema salvo com sucesso!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error saving theme:', error);
            setMessage('Erro ao salvar tema');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="loading">Carregando...</div>;

    return (
        <div className="editor-page">
            <div className="editor-header">
                <div>
                    <h1><Palette size={28} /> Editor de Tema</h1>
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

export default ThemeEditor;
