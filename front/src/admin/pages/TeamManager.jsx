/**
 * GERENCIADOR DE EQUIPE (CRUD)
 */

import { useState, useEffect, useRef } from 'react';
import { getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember } from '../services/adminApi';
import { Plus, Edit, Trash2, Save, Upload } from 'lucide-react';
import '../styles/Manager.css';

function TeamManager() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        specialization: '',
        oab: '',
        description: '',
        image_url: '',
        linkedin_url: '',
        email: '',
        order: 0
    });
    const [message, setMessage] = useState('');
    const messageRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        loadMembers();
    }, []);

    // Rola para a mensagem quando ela aparecer
    useEffect(() => {
        if (message && messageRef.current) {
            setTimeout(() => {
                messageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }, [message]);

    const loadMembers = async () => {
        try {
            const data = await getTeamMembers();
            setMembers(data);
        } catch (error) {
            console.error('Error loading members:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (member) => {
        setEditing(member.id);
        setFormData({
            name: member.name,
            role: member.role,
            specialization: member.specialization,
            oab: member.oab,
            description: member.description,
            image_url: member.image_url,
            linkedin_url: member.linkedin_url,
            email: member.email,
            order: member.order
        });

        // Carregar preview da imagem existente
        if (member.image_url) {
            setImagePreview(`http://localhost:8000/storage/${member.image_url}`);
        } else {
            setImagePreview(null);
        }

        setMessage(''); // Limpa mensagem ao abrir modal
    };

    const handleNew = () => {
        setEditing('new');
        setFormData({
            name: '',
            role: '',
            specialization: '',
            oab: '',
            description: '',
            image_url: '',
            linkedin_url: '',
            email: '',
            order: members.length + 1
        });
        setImagePreview(null);
        setMessage(''); // Limpa mensagem ao abrir modal
    };

    const handleCancel = () => {
        setEditing(null);
        setFormData({ name: '', role: '', specialization: '', oab: '', description: '', image_url: '', linkedin_url: '', email: '', order: 0 });
        setImagePreview(null);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setMessage('');

        try {
            const formDataUpload = new FormData();
            formDataUpload.append('photo', file);
            if (editing !== 'new') {
                formDataUpload.append('member_id', editing);
            }

            const response = await fetch('http://localhost:8000/api/upload-team-photo', {
                method: 'POST',
                body: formDataUpload
            });

            const result = await response.json();

            if (result.success) {
                setFormData({ ...formData, image_url: result.path });
                setImagePreview(`http://localhost:8000${result.url}`);
                setMessage('Foto enviada com sucesso!');
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage('Erro ao enviar foto');
            }
        } catch (error) {
            console.error('Error uploading photo:', error);
            setMessage('Erro ao enviar foto');
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        try {
            if (editing === 'new') {
                await createTeamMember(formData);
                setMessage('Membro criado com sucesso!');
            } else {
                await updateTeamMember(editing, formData);
                setMessage('Membro atualizado com sucesso!');
            }
            loadMembers();
            handleCancel();
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error saving member:', error);

            // Extrai mensagem de erro do backend
            let errorMessage = 'Erro ao salvar membro';

            if (error.response?.data?.errors) {
                // Se houver erros de validação, mostra todos os erros
                const errors = error.response.data.errors;
                const errorMessages = [];

                // Itera sobre todos os campos com erro
                Object.keys(errors).forEach(fieldName => {
                    const fieldErrors = errors[fieldName];

                    // Cada campo pode ter múltiplos erros (array)
                    if (Array.isArray(fieldErrors)) {
                        fieldErrors.forEach(errorText => {
                            errorMessages.push(errorText);
                        });
                    } else {
                        errorMessages.push(fieldErrors);
                    }
                });

                // Junta todos os erros com quebra de linha
                errorMessage = errorMessages.join('\n');
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }

            setMessage(errorMessage);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Tem certeza que deseja deletar este membro?')) return;

        try {
            await deleteTeamMember(id);
            setMessage('Membro deletado com sucesso!');
            loadMembers();
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error deleting member:', error);
            setMessage('Erro ao deletar membro');
        }
    };

    if (loading) return <div className="loading">Carregando...</div>;

    return (
        <div className="manager-page">
            <div className="manager-header">
                <div>
                    <h1>Gerenciador de Equipe</h1>
                    <p>{members.length} membro(s) cadastrado(s)</p>
                </div>
                <button onClick={handleNew} className="btn-primary">
                    <Plus size={18} />
                    Novo Membro
                </button>
            </div>


            {editing && (
                <div className="edit-modal">
                    <div className="edit-modal-content">
                        <h2>{editing === 'new' ? 'Novo Membro' : 'Editar Membro'}</h2>

                        <div className="form-field">
                            <label>Nome</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Ex: Dr. João Silva"
                            />
                        </div>

                        <div className="form-field">
                            <label>Cargo</label>
                            <input
                                type="text"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                placeholder="Ex: Sócio Fundador"
                            />
                        </div>

                        <div className="form-field">
                            <label>Especialização</label>
                            <input
                                type="text"
                                value={formData.specialization}
                                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                                placeholder="Ex: Direito Empresarial"
                            />
                        </div>

                        <div className="form-field">
                            <label>OAB</label>
                            <input
                                type="text"
                                value={formData.oab}
                                onChange={(e) => setFormData({ ...formData, oab: e.target.value })}
                                placeholder="Ex: OAB/SP 123.456"
                            />
                        </div>

                        <div className="form-field">
                            <label>Descrição</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Biografia do advogado..."
                            />
                        </div>


                        <div className="form-field">
                            <label htmlFor="photo-upload">Foto do Membro</label>
                            <label htmlFor="photo-upload" className="upload-label">
                                <Upload size={20} />
                                {uploading ? 'Enviando...' : 'Escolher Foto'}
                            </label>
                            <input
                                id="photo-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={uploading}
                                style={{ display: 'none' }}
                            />
                            <small>Formatos aceitos: JPG, PNG, GIF (máx: 2MB)</small>
                        </div>

                        {imagePreview && (
                            <div className="image-preview">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    style={{
                                        maxHeight: '200px',
                                        width: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '8px',
                                        marginTop: '10px'
                                    }}
                                />
                            </div>
                        )}


                        <div className="form-field">
                            <label>LinkedIn</label>
                            <input
                                type="url"
                                value={formData.linkedin_url}
                                onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                                placeholder="https://linkedin.com/in/..."
                            />
                        </div>

                        <div className="form-field">
                            <label>Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="email@exemplo.com"
                            />
                        </div>

                        <div className="form-field">
                            <label>Ordem</label>
                            <input
                                type="number"
                                value={formData.order}
                                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                            />
                        </div>

                        {message && (
                            <div ref={messageRef} className={`message ${message.includes('sucesso') ? 'success' : 'error'}`}>
                                {message}
                            </div>
                        )}

                        <div className="modal-actions">
                            <button onClick={handleCancel} className="btn-secondary">Cancelar</button>
                            <button onClick={handleSave} className="btn-primary">
                                <Save size={18} />
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="items-grid">
                {members.map(member => (
                    <div key={member.id} className="item-card">
                        {member.image_url && (
                            <img
                                src={`http://localhost:8000/storage/${member.image_url}`}
                                alt={member.name}
                                style={{
                                    width: '100%',
                                    height: '200px',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                    marginBottom: '12px'
                                }}
                            />
                        )}
                        <h3>{member.name}</h3>
                        <p><strong>{member.role}</strong></p>
                        <p>{member.specialization}</p>
                        <div className="item-meta">
                            <span>{member.oab}</span>
                            <span>Ordem: {member.order}</span>
                        </div>
                        <div className="item-actions">
                            <button onClick={() => handleEdit(member)} className="btn-icon">
                                <Edit size={16} />
                            </button>
                            <button onClick={() => handleDelete(member.id)} className="btn-icon-danger">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TeamManager;
