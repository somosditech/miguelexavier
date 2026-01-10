/**
 * EDITOR DE TEMA (CORES)
 */

import { useState, useEffect } from 'react';
import { getTheme, updateTheme } from '../services/adminApi';
import { Save, Palette } from 'lucide-react';
import '../styles/Editor.css';

function ThemeEditor() {
    const [theme, setTheme] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadTheme();
    }, []);

    const loadTheme = async () => {
        try {
            const data = await getTheme();
            setTheme(data);
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
                    <p>Personalize as cores do site</p>
                </div>
                <button onClick={handleSave} disabled={saving} className="btn-primary">
                    <Save size={18} />
                    {saving ? 'Salvando...' : 'Salvar Alterações'}
                </button>
            </div>

            {message && (
                <div className={`message ${message.includes('sucesso') ? 'success' : 'error'}`}>
                    {message}
                </div>
            )}

            <div className="editor-content">
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
        </div>
    );
}

export default ThemeEditor;
