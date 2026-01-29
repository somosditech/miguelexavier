/**
 * EDITOR DE SITUAÇÕES (CTA)
 */

import { useState, useEffect } from 'react';
import { getSituation, updateSituation } from '../services/adminApi';
import { Save, AlertCircle, Plus, X } from 'lucide-react';
import '../styles/Editor.css';

function Situation() {
    const [formData, setFormData] = useState({
        title: '',
        message: '',
        content: [],
        cta_button_text: 'QUERO ORIENTAÇÃO JURÍDICA'
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await getSituation();
            if (data) {
                setFormData({
                    title: data.title || '',
                    message: data.message || '',
                    content: Array.isArray(data.content) ? data.content : [],
                    cta_button_text: data.cta_button_text || 'QUERO ORIENTAÇÃO JURÍDICA'
                });
            }
        } catch (error) {
            console.error('Error loading situation:', error);
            setMessage('Erro ao carregar dados');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleItemAdd = () => {
        setFormData({ ...formData, content: [...formData.content, ''] });
    };

    const handleItemChange = (index, value) => {
        const newItems = [...formData.content];
        newItems[index] = value;
        setFormData({ ...formData, content: newItems });
    };

    const handleItemRemove = (index) => {
        const newItems = formData.content.filter((_, i) => i !== index);
        setFormData({ ...formData, content: newItems });
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        setErrors({});

        try {
            await updateSituation(formData);
            setMessage('Dados salvos com sucesso!');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else if (error.response?.data?.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Erro ao salvar dados');
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
                    <h1><AlertCircle size={28} /> Gerenciador de Situações (CTA)</h1>
                    <p>Configure o bloco de situações que aparece no site</p>
                </div>
            </div>

            {message && (
                <div className={`message ${message.includes('sucesso') ? 'success' : 'error'}`}>
                    {message}
                </div>
            )}

            <div className="editor-content">
                <div className="form-field">
                    <label>Título Principal</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        placeholder="Ex: VOCÊ ESTÁ PASSANDO POR ALGUMAS DESSAS SITUAÇÕES?"
                    />
                </div>

                <div className="form-field">
                    <label>Mensagem de Subtítulo / Frase acima do botão</label>
                    <textarea
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        placeholder="Texto que aparece acima do botão..."
                        rows={3}
                    />
                </div>

                <div className="form-field">
                    <label>Lista de Situações (Itens com Check)</label>
                    <div className="list-editor">
                        {formData.content.map((item, index) => (
                            <div key={index} className="list-item-input" style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => handleItemChange(index, e.target.value)}
                                    placeholder="Ex: DIVÓRCIO OU SEPARAÇÃO"
                                    style={{ flex: 1 }}
                                />
                                <button
                                    onClick={() => handleItemRemove(index)}
                                    className="btn-icon-danger"
                                    title="Remover item"
                                    style={{ padding: '0 10px', height: '42px' }}
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        ))}
                        <button onClick={handleItemAdd} className="btn-secondary" style={{ marginTop: '5px' }}>
                            <Plus size={16} />
                            Adicionar Situação
                        </button>
                    </div>
                </div>

                <div className="form-field">
                    <label>Texto do Botão CTA</label>
                    <input
                        type="text"
                        value={formData.cta_button_text}
                        onChange={(e) => handleChange('cta_button_text', e.target.value)}
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

                <div className="form-actions" style={{ marginTop: '30px' }}>
                    <button onClick={handleSave} disabled={saving} className="btn-primary btn-large">
                        <Save size={18} />
                        {saving ? 'Salvando...' : 'Salvar Alterações'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Situation;
