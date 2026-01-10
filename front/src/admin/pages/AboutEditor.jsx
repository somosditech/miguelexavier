/**
 * EDITOR DE ABOUT SECTION
 */

import { useState, useEffect } from 'react';
import { getAbout, updateAbout } from '../services/adminApi';
import { Save, FileText } from 'lucide-react';
import '../styles/Editor.css';

function AboutEditor() {
    const [about, setAbout] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadAbout();
    }, []);

    const loadAbout = async () => {
        try {
            const data = await getAbout();
            setAbout(data);
        } catch (error) {
            console.error('Error loading about:', error);
            setMessage('Erro ao carregar about');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setAbout({ ...about, [field]: value });
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');

        try {
            await updateAbout(about);
            setMessage('About salvo com sucesso!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error saving about:', error);
            setMessage('Erro ao salvar about');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="loading">Carregando...</div>;

    return (
        <div className="editor-page">
            <div className="editor-header">
                <div>
                    <h1><FileText size={28} /> Editor de About</h1>
                    <p>Edite a seção sobre o escritório</p>
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
                <div className="form-field">
                    <label>Título</label>
                    <input
                        type="text"
                        value={about?.title || ''}
                        onChange={(e) => handleChange('title', e.target.value)}
                        placeholder="Ex: Sobre o Escritório"
                    />
                </div>

                <div className="form-field">
                    <label>Subtítulo</label>
                    <input
                        type="text"
                        value={about?.subtitle || ''}
                        onChange={(e) => handleChange('subtitle', e.target.value)}
                        placeholder="Ex: Tradição e Modernidade"
                    />
                </div>

                <div className="form-field">
                    <label>Descrição</label>
                    <textarea
                        value={about?.description || ''}
                        onChange={(e) => handleChange('description', e.target.value)}
                        placeholder="Descrição completa sobre o escritório..."
                        rows={6}
                    />
                </div>

                <div className="form-field">
                    <label>URL da Imagem</label>
                    <input
                        type="url"
                        value={about?.image_url || ''}
                        onChange={(e) => handleChange('image_url', e.target.value)}
                        placeholder="https://exemplo.com/imagem.jpg"
                    />
                    <small>Cole a URL de uma imagem externa</small>
                </div>
            </div>
        </div>
    );
}

export default AboutEditor;
