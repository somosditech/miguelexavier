/**
 * EDITOR DE ABOUT SECTION
 */

import { useState, useEffect } from 'react';
import { getAbout, updateAbout } from '../services/adminApi';
import { Save, FileText, Upload } from 'lucide-react';
import '../styles/Editor.css';

function AboutEditor() {
    const [about, setAbout] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        loadAbout();
    }, []);

    const loadAbout = async () => {
        try {
            const data = await getAbout();
            setAbout(data);
            if (data.image_url) {
                setImagePreview(`/storage/${data.image_url}`);
            }
        } catch (error) {
            setMessage('Erro ao carregar about');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setAbout({ ...about, [field]: value });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setMessage('');
        setErrors({});

        try {
            const formData = new FormData();
            formData.append('image', file);

            const token = localStorage.getItem('admin_token');

            const response = await fetch('/api/admin/about/upload-image', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                setMessage('Imagem enviada com sucesso!');
                setImagePreview(result.url);
                setAbout({ ...about, image_url: result.path });
                setTimeout(() => setMessage(''), 3000);
            } else {
                if (error.response?.data?.errors) {
                    setErrors(error.response.data.errors);
                } else if (error.response?.data?.message) {
                    setMessage(error.response.data.message);
                } else {
                    if (import.meta.env.DEV) {
                        console.log(result);
                        console.log(result.errors);
                        console.log(result.message);
                    }
                    setMessage('Erro ao salvar Foto');
                }
            }
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else if (error.response?.data?.message) {
                setMessage(error.response.data.message);
            } else {
                if (import.meta.env.DEV) {
                    console.log(error);
                    console.log(error.errors);
                    console.log(error.message);
                }
                setMessage('Erro ao salvar Foto');
            }
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        setErrors({});

        try {
            await updateAbout(about);
            setMessage('About salvo com sucesso!');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else if (error.response?.data?.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Erro ao salvar About');
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
                    <h1><FileText size={28} /> Sobre</h1>
                    <p>Edite a seção Sobre o escritório</p>
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
                    <label>Imagem</label>
                    <label htmlFor="about-image-upload" className="upload-label">
                        <Upload size={20} />
                        {uploading ? 'Enviando...' : 'Escolher Imagem'}
                    </label>
                    <input
                        id="about-image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        style={{ display: 'none' }}
                    />
                    <small>Formatos aceitos: JPG, PNG, GIF (máx: 5MB)</small>
                    {imagePreview && (
                        <div className="logo-preview">
                            <img src={imagePreview} alt="About Preview" style={{ maxHeight: '200px', marginTop: '10px' }} />
                        </div>
                    )}
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

export default AboutEditor;
