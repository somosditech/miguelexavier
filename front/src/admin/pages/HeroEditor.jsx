/**
 * EDITOR DE HERO SECTION
 */

import { useState, useEffect } from 'react';
import { getHero, updateHero } from '../services/adminApi';
import { Save, FileText } from 'lucide-react';
import '../styles/Editor.css';

function HeroEditor() {
    const [hero, setHero] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadHero();
    }, []);

    const loadHero = async () => {
        try {
            const data = await getHero();
            setHero(data);
        } catch (error) {
            console.error('Error loading hero:', error);
            setMessage('Erro ao carregar hero');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setHero({ ...hero, [field]: value });
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');

        try {
            await updateHero(hero);
            setMessage('Hero salvo com sucesso!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error saving hero:', error);
            setMessage('Erro ao salvar hero');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="loading">Carregando...</div>;

    return (
        <div className="editor-page">
            <div className="editor-header">
                <div>
                    <h1><FileText size={28} /> Editor de Hero</h1>
                    <p>Edite a seção principal do site</p>
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
                        value={hero?.title || ''}
                        onChange={(e) => handleChange('title', e.target.value)}
                        placeholder="Ex: Excelência Jurídica ao Seu Alcance"
                    />
                </div>

                <div className="form-field">
                    <label>Subtítulo</label>
                    <input
                        type="text"
                        value={hero?.subtitle || ''}
                        onChange={(e) => handleChange('subtitle', e.target.value)}
                        placeholder="Ex: Mais de 20 anos de experiência..."
                    />
                </div>

                <div className="form-field">
                    <label>Descrição</label>
                    <textarea
                        value={hero?.description || ''}
                        onChange={(e) => handleChange('description', e.target.value)}
                        placeholder="Descrição detalhada..."
                    />
                </div>

                <div className="form-field">
                    <label>URL da Imagem de Fundo</label>
                    <input
                        type="url"
                        value={hero?.background_image_url || ''}
                        onChange={(e) => handleChange('background_image_url', e.target.value)}
                        placeholder="https://exemplo.com/imagem.jpg"
                    />
                    <small>Cole a URL de uma imagem externa (Unsplash, etc)</small>
                </div>

                <div className="form-field">
                    <label>Texto do Botão CTA</label>
                    <input
                        type="text"
                        value={hero?.cta_button_text || ''}
                        onChange={(e) => handleChange('cta_button_text', e.target.value)}
                        placeholder="Ex: Fale com um Advogado"
                    />
                </div>

                <div className="form-field">
                    <label>Link do Botão CTA</label>
                    <input
                        type="text"
                        value={hero?.cta_button_href || ''}
                        onChange={(e) => handleChange('cta_button_href', e.target.value)}
                        placeholder="Ex: #contact"
                    />
                </div>
            </div>
        </div>
    );
}

export default HeroEditor;
