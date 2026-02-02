/**
 * EDITOR DE FLUXO DE ATENDIMENTO
 */

import { useState, useEffect } from 'react';
import { getServiceWork, updateServiceWork } from '../services/adminApi';
import { Save, ClipboardCheck, Plus, X } from 'lucide-react';
import '../styles/Editor.css';

function ServiceWork() {
    const [formData, setFormData] = useState({
        title: '',
        content: [],
        cta_button_text: 'Entre em contato'
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
            const data = await getServiceWork();
            if (data) {
                setFormData({
                    title: data.title || '',
                    content: Array.isArray(data.content) ? data.content : [],
                    cta_button_text: data.cta_button_text || 'Entre em contato'
                });
            }
        } catch (error) {
            if (import.meta.env.DEV) {
                console.error('Error loading service work:', error);
            }
            setMessage('Erro ao carregar dados');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleStepAdd = () => {
        const nextNumber = (formData.content.length + 1).toString();
        setFormData({
            ...formData,
            content: [...formData.content, { number: nextNumber, title: '', description: '' }]
        });
    };

    const handleStepChange = (index, field, value) => {
        const newContent = [...formData.content];
        newContent[index] = { ...newContent[index], [field]: value };
        setFormData({ ...formData, content: newContent });
    };

    const handleStepRemove = (index) => {
        const newContent = formData.content.filter((_, i) => i !== index);
        setFormData({ ...formData, content: newContent });
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        setErrors({});

        try {
            await updateServiceWork(formData);
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
                    <h1><ClipboardCheck size={28} /> Fluxo de Atendimento</h1>
                    <p>Gerencie o passo a passo que explica o funcionamento do escritório</p>
                </div>
            </div>

            {message && (
                <div className={`message ${message.includes('sucesso') ? 'success' : 'error'}`}>
                    {message}
                </div>
            )}

            <div className="editor-content">
                <div className="form-field">
                    <label>Título da Seção</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        placeholder="Ex: COMO FUNCIONA O ATENDIMENTO?"
                    />
                </div>

                <div className="form-field">
                    <label>Passos do Atendimento (Timeline)</label>
                    <div className="steps-editor-list">
                        {formData.content.map((step, index) => (
                            <div key={index} className="step-editor-item" style={{ background: '#f8f9fa', border: '1px solid #e9ecef', borderRadius: '8px', padding: '20px', marginBottom: '20px', position: 'relative' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                    <h4 style={{ margin: 0 }}>Passo {index + 1}</h4>
                                    <button onClick={() => handleStepRemove(index)} className="btn-icon-danger" title="Remover passo">
                                        <X size={18} />
                                    </button>
                                </div>
                                <div className="step-grid" style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '20px' }}>
                                    <div className="form-field" style={{ marginBottom: 0 }}>
                                        <label>Número/Ref</label>
                                        <input
                                            type="text"
                                            value={step.number}
                                            onChange={(e) => handleStepChange(index, 'number', e.target.value)}
                                            placeholder="Ex: 1"
                                        />
                                    </div>
                                    <div className="form-field" style={{ marginBottom: 0 }}>
                                        <label>Título do Passo</label>
                                        <input
                                            type="text"
                                            value={step.title}
                                            onChange={(e) => handleStepChange(index, 'title', e.target.value)}
                                            placeholder="Ex: PRIMEIRO CONTATO"
                                        />
                                    </div>
                                    <div className="form-field" style={{ gridColumn: 'span 2', marginBottom: 0 }}>
                                        <label>Descrição</label>
                                        <textarea
                                            value={step.description}
                                            onChange={(e) => handleStepChange(index, 'description', e.target.value)}
                                            placeholder="Descreva o que acontece nesta etapa..."
                                            rows={2}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button onClick={handleStepAdd} className="btn-secondary">
                            <Plus size={16} />
                            Adicionar Novo Passo
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

export default ServiceWork;
