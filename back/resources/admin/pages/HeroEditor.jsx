/**
 * EDITOR DE HERO SECTION
 */

import { useState, useEffect } from 'react';
import { getHero, updateHero } from '../services/adminApi';
import { Save, Wallpaper, Upload } from 'lucide-react';
import '../styles/Editor.css';

function HeroEditor() {
    const [hero, setHero] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [imageError, setImageError] = useState(''); // Mensagem de erro específica para imagem
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        loadHero();
    }, []);

    const loadHero = async () => {
        try {
            const data = await getHero();
            setHero(data);
            if (data.background_image_url) {
                setImagePreview(`http://localhost:8000/storage/${data.background_image_url}`);
            }
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

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Limpar mensagens anteriores
        setImageError('');
        setMessage('');

        // Validar formato do arquivo
        const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!allowedFormats.includes(file.type)) {
            setImageError('Formato não permitido. Use JPG, PNG ou GIF.');
            e.target.value = ''; // Limpar input
            return;
        }

        // Validar tamanho do arquivo (5MB = 5 * 1024 * 1024 bytes)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            setImageError('Arquivo muito grande. Tamanho máximo: 5MB.');
            e.target.value = ''; // Limpar input
            return;
        }

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('background_image', file);

            const token = localStorage.getItem('admin_token');

            // Usando rota de upload de imagem de fundo do hero
            const response = await fetch('http://localhost:8000/api/admin/hero/upload-background', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                setMessage('Imagem enviada com sucesso!');
                setImagePreview(`http://localhost:8000${result.url}`);
                // Atualiza o hero com o novo caminho da imagem
                setHero({ ...hero, background_image_url: result.path });
                setTimeout(() => setMessage(''), 3000);
            } else {
                setImageError('Erro ao enviar imagem');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            setImageError('Erro ao enviar imagem');
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');

        try {
            await updateHero(hero);
            setMessage('Hero salvo com sucesso!');
            // Scroll suave para o topo para mostrar a mensagem de sucesso
            window.scrollTo({ top: 0, behavior: 'smooth' });
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
                    <h1><Wallpaper size={28} /> Editor de Hero</h1>
                    <p>Edite a seção principal do site</p>
                </div>
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
                    <label>Imagem de Fundo</label>
                    <label htmlFor="background-upload" className="upload-label">
                        <Upload size={20} />
                        {uploading ? 'Enviando...' : 'Escolher Imagem de Fundo'}
                    </label>
                    <input
                        id="background-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        style={{ display: 'none' }}
                    />
                    <small>Formatos aceitos: JPG, PNG, GIF (máx: 5MB)</small>

                    {/* Mensagem de erro específica para imagem */}
                    {imageError && (
                        <div className="error-message" style={{ marginTop: '10px', color: '#dc2626', fontSize: '14px', fontWeight: '500' }}>
                            ⚠️ {imageError}
                        </div>
                    )}

                    {imagePreview && (
                        <div className="logo-preview">
                            <img src={imagePreview} alt="Background Preview" style={{ maxHeight: '200px', marginTop: '10px' }} />
                        </div>
                    )}
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

export default HeroEditor;
