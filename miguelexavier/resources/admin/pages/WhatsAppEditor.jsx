/**
 * EDITOR DE WHATSAPP
 */

import { useState, useEffect } from 'react';
import { getWhatsAppSettings, updateWhatsAppSettings, createWhatsAppSettings } from '../services/adminApi';
import { Save, MessageSquare } from 'lucide-react';
import '../styles/Editor.css';

function WhatsAppEditor() {
    const [settings, setSettings] = useState({
        phone_number: '',
        predefined_message: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    const formatPhoneNumber = (value) => {
        if (!value) return '';
        const numbers = value.toString().replace(/\D/g, '');
        const truncated = numbers.substring(0, 13);
        if (truncated.length === 0) return '';

        let formatted = '+';
        if (truncated.length > 0) formatted += truncated.substring(0, 2);
        if (truncated.length > 2) formatted += ' (' + truncated.substring(2, 4);
        if (truncated.length > 4) formatted += ') ' + truncated.substring(4, 9);
        if (truncated.length > 9) formatted += '-' + truncated.substring(9, 13);

        return formatted;
    };

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const data = await getWhatsAppSettings();
            if (data && data.data) {
                setSettings({
                    phone_number: formatPhoneNumber(data.data.phone_number),
                    predefined_message: data.data.predefined_message || ''
                });
            }
        } catch (error) {
            console.error('Error loading WhatsApp settings:', error);
            if (error.response && error.response.status !== 404) {
                setMessage('Erro ao carregar configurações');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        if (field === 'phone_number') {
            setSettings({ ...settings, [field]: formatPhoneNumber(value) });
        } else {
            setSettings({ ...settings, [field]: value });
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');

        // Remove formatação para enviar ao backend
        // Mantém apenas números
        const cleanPhoneNumber = settings.phone_number.replace(/\D/g, '');

        const dataToSend = {
            ...settings,
            phone_number: cleanPhoneNumber
        };

        try {
            await updateWhatsAppSettings(dataToSend);
            setMessage('Configurações salvas com sucesso!');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error saving settings:', error);
            if (error.response && error.response.status === 404) {
                try {
                    await createWhatsAppSettings(dataToSend);
                    setMessage('Configurações criadas com sucesso!');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setTimeout(() => setMessage(''), 3000);
                } catch (createError) {
                    console.error('Error creating settings:', createError);
                    setMessage('Erro ao salvar configurações');
                }
            } else {
                setMessage('Erro ao salvar configurações');
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="loading">Carregando...</div>;

    return (
        <div className="editor-page">
            <div className="editor-header">
                <div>
                    <h1><MessageSquare size={28} /> WhatsApp</h1>
                    <p>Configure o número e a mensagem padrão do botão de WhatsApp</p>
                </div>
            </div>

            {message && (
                <div className={`message ${message.includes('sucesso') ? 'success' : 'error'}`}>
                    {message}
                </div>
            )}

            <div className="editor-content">
                <div className="form-section remove-border">
                    <div className="form-field">
                        <label htmlFor="phone_number">Número do WhatsApp (com DDI e DDD, apenas números)</label>
                        <input
                            id="phone_number"
                            type="text"
                            value={settings.phone_number}
                            onChange={(e) => handleChange('phone_number', e.target.value)}
                            placeholder="Ex: 5541999999999"
                        />
                        <small>Utilize o formato internacional: 55 (Brasil) + DDD + Número. Ex: 5541999999999</small>
                    </div>

                    <div className="form-field">
                        <label htmlFor="predefined_message">Mensagem Pré-definida</label>
                        <textarea
                            id="predefined_message"
                            value={settings.predefined_message}
                            onChange={(e) => handleChange('predefined_message', e.target.value)}
                            placeholder="Ex: Olá! Gostaria de agendar uma consulta."
                            rows={4}
                        />
                        <small>Esta mensagem aparecerá automaticamente no campo de texto do usuário ao clicar no botão.</small>
                    </div>
                </div>

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

export default WhatsAppEditor;
