/**
 * GERENCIADOR DE EQUIPE (CRUD)
 */

import { useState, useEffect } from 'react';
import { getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember } from '../services/adminApi';
import { Plus, Edit, Trash2, Save } from 'lucide-react';
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

    useEffect(() => {
        loadMembers();
    }, []);

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
    };

    const handleCancel = () => {
        setEditing(null);
        setFormData({ name: '', role: '', specialization: '', oab: '', description: '', image_url: '', linkedin_url: '', email: '', order: 0 });
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
            setMessage('Erro ao salvar membro');
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

            {message && (
                <div className={`message ${message.includes('sucesso') ? 'success' : 'error'}`}>
                    {message}
                </div>
            )}

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
                            <label>URL da Foto</label>
                            <input
                                type="url"
                                value={formData.image_url}
                                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                placeholder="https://exemplo.com/foto.jpg"
                            />
                        </div>

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
