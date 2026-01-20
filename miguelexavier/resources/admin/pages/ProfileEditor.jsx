/**
 * PÁGINA: Profile Editor
 * 
 * Permite ao administrador editar seu perfil (foto, nome, email, senha)
 * Com verificação por código para alterações sensíveis
 */

import { useState, useEffect } from 'react';
import { User, Mail, Lock, Camera } from 'lucide-react';
import {
    getProfile,
    updateProfile,
    uploadProfilePhoto,
    verifyAndUpdateProfile
} from '../services/adminApi';
import '../styles/Editor.css';

function ProfileEditor() {
    // Estados do formulário
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        profile_photo: null
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const [photoPreview, setPhotoPreview] = useState(null);
    const [photoFile, setPhotoFile] = useState(null);

    // Estados de controle
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('success'); // 'success' ou 'error'
    const [errors, setErrors] = useState({});

    // Estados específicos para foto
    const [photoMessage, setPhotoMessage] = useState('');
    const [photoError, setPhotoError] = useState(false);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            setLoading(true);
            const data = await getProfile();
            setProfile(data);
            setFormData({
                name: data.name,
                email: data.email,
                password: '',
                password_confirmation: ''
            });
            if (data.profile_photo) {
                setPhotoPreview(`/storage/${data.profile_photo}`);
            }
        } catch (error) {
            console.error('Erro ao carregar perfil:', error);
            setMessage('Erro ao carregar perfil');
        } finally {
            setLoading(false);
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadPhoto = async () => {
        if (!photoFile) return;

        try {
            setSaving(true);
            setPhotoMessage('');
            setPhotoError(false);

            const response = await uploadProfilePhoto(photoFile);
            setPhotoMessage(response.message);
            setPhotoError(false);
            setPhotoFile(null);

            // Atualiza preview com a foto salva
            setPhotoPreview(`/storage/${response.data.profile_photo}`);

        } catch (error) {
            console.error('Erro ao fazer upload:', error);

            // Trata erros de validação
            if (error.response?.data?.errors) {
                const errorMessages = Object.values(error.response.data.errors).flat();
                setPhotoMessage(errorMessages.join(' '));
            } else {
                setPhotoMessage(error.response?.data?.message || 'Erro ao fazer upload da foto');
            }
            setPhotoError(true);
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Limpa erro do campo
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setMessageType('success');
        setErrors({});

        try {
            setSaving(true);

            // Prepara dados para atualizar
            const updateData = {
                name: formData.name
            };

            // Adiciona senha se foi preenchida
            if (formData.password) {
                updateData.password = formData.password;
                updateData.password_confirmation = formData.password_confirmation;
            }

            // Chama API apropriada
            let response;
            if (formData.password) {
                // Se tem senha, usa o endpoint de verificação (mas sem código agora)
                response = await verifyAndUpdateProfile(updateData);
            } else {
                // Apenas nome
                response = await updateProfile(updateData);
            }

            setMessage(response.message);
            setMessageType('success');

            // Atualiza estado local
            setProfile(prev => ({ ...prev, name: formData.name }));

            // Limpa campos de senha
            setFormData(prev => ({
                ...prev,
                password: '',
                password_confirmation: ''
            }));

        } catch (error) {
            console.error('Erro ao atualizar:', error);

            // Trata erros de validação
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setMessage(error.response?.data?.message || 'Erro ao atualizar perfil');
                setMessageType('error');
            }
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="editor-container">
                <div className="loading">Carregando perfil...</div>
            </div>
        );
    }

    return (
        <div className="editor-container">
            <div className="editor-header">
                <h2>Meu Perfil</h2>
                <p>Gerencie suas informações pessoais e segurança da conta</p>
            </div>

            {/* Foto de Perfil */}
            <div className="profile-photo-section">
                <div className="photo-preview">
                    {photoPreview ? (
                        <img src={photoPreview} alt="Foto de perfil" />
                    ) : (
                        <div className="photo-placeholder">
                            <User size={64} />
                        </div>
                    )}
                </div>
                <div className="photo-upload">
                    <input
                        type="file"
                        id="photo-upload"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="photo-upload" className="btn-secondary">
                        <Camera size={20} />
                        Escolher Foto
                    </label>
                    {photoFile && (
                        <button
                            onClick={handleUploadPhoto}
                            disabled={saving}
                            className="btn-primary"
                        >
                            Salvar Foto
                        </button>
                    )}
                </div>
            </div>

            {/* Mensagem de erro da foto */}
            {photoMessage && (
                <div className={`message ${photoError ? 'error' : 'success'}`} style={{ marginTop: '16px' }}>
                    {photoMessage}
                </div>
            )}

            {/* Formulário de Dados */}
            <form onSubmit={handleSubmit} className="editor-form">
                <div className="form-field">
                    <label htmlFor="name">
                        <User size={18} />
                        Nome
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="email">
                        <Mail size={18} />
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        disabled
                        style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
                    />
                </div>

                <div className="form-divider">
                    <span>Alterar Senha (opcional)</span>
                </div>

                <div className="form-field">
                    <label htmlFor="password">
                        <Lock size={18} />
                        Nova Senha
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Deixe em branco para não alterar"
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="password_confirmation">
                        <Lock size={18} />
                        Confirmar Nova Senha
                    </label>
                    <input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        placeholder="Confirme a nova senha"
                    />
                </div>

                {/* Mensagens de Sucesso */}
                {message && (
                    <div className={`message ${messageType}`}>
                        {message}
                    </div>
                )}

                {/* Mensagens de Erro de Validação */}
                {Object.keys(errors).length > 0 && (
                    <div className="message error">
                        {errors.name && <div>{errors.name[0]}</div>}
                        {errors.password && <div>{errors.password[0]}</div>}
                        {errors.password_confirmation && <div>{errors.password_confirmation[0]}</div>}
                    </div>
                )}

                {/* Botões de Ação */}
                <div className="form-actions">
                    <button type="submit" disabled={saving} className="btn-primary">
                        {saving ? 'Salvando...' : 'Salvar Alterações'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProfileEditor;