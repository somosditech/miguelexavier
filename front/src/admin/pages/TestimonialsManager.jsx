/**
 * GERENCIADOR DE DEPOIMENTOS (CRUD)
 */

import { useState, useEffect } from 'react';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../services/adminApi';
import { Plus, Edit, Trash2, Save } from 'lucide-react';
import '../styles/Manager.css';

function TestimonialsManager() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        text: '',
        order: 0
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadTestimonials();
    }, []);

    const loadTestimonials = async () => {
        try {
            const data = await getTestimonials();
            setTestimonials(data);
        } catch (error) {
            console.error('Error loading testimonials:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (testimonial) => {
        setEditing(testimonial.id);
        setFormData({
            name: testimonial.name,
            role: testimonial.role,
            text: testimonial.text,
            order: testimonial.order
        });
    };

    const handleNew = () => {
        setEditing('new');
        setFormData({
            name: '',
            role: '',
            text: '',
            order: testimonials.length + 1
        });
    };

    const handleCancel = () => {
        setEditing(null);
        setFormData({ name: '', role: '', text: '', order: 0 });
    };

    const handleSave = async () => {
        try {
            if (editing === 'new') {
                await createTestimonial(formData);
                setMessage('Depoimento criado com sucesso!');
            } else {
                await updateTestimonial(editing, formData);
                setMessage('Depoimento atualizado com sucesso!');
            }
            loadTestimonials();
            handleCancel();
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error saving testimonial:', error);
            setMessage('Erro ao salvar depoimento');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Tem certeza que deseja deletar este depoimento?')) return;

        try {
            await deleteTestimonial(id);
            setMessage('Depoimento deletado com sucesso!');
            loadTestimonials();
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error deleting testimonial:', error);
            setMessage('Erro ao deletar depoimento');
        }
    };

    if (loading) return <div className="loading">Carregando...</div>;

    return (
        <div className="manager-page">
            <div className="manager-header">
                <div>
                    <h1>Gerenciador de Depoimentos</h1>
                    <p>{testimonials.length} depoimento(s) cadastrado(s)</p>
                </div>
                <button onClick={handleNew} className="btn-primary">
                    <Plus size={18} />
                    Novo Depoimento
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
                        <h2>{editing === 'new' ? 'Novo Depoimento' : 'Editar Depoimento'}</h2>

                        <div className="form-field">
                            <label>Nome do Cliente</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Ex: Maria Silva"
                            />
                        </div>

                        <div className="form-field">
                            <label>Profissão/Cargo</label>
                            <input
                                type="text"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                placeholder="Ex: Empresária"
                            />
                        </div>

                        <div className="form-field">
                            <label>Depoimento</label>
                            <textarea
                                value={formData.text}
                                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                                placeholder="Texto do depoimento..."
                                rows={5}
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
                {testimonials.map(testimonial => (
                    <div key={testimonial.id} className="item-card">
                        <h3>{testimonial.name}</h3>
                        <p><strong>{testimonial.role}</strong></p>
                        <p>"{testimonial.text}"</p>
                        <div className="item-meta">
                            <span>Ordem: {testimonial.order}</span>
                        </div>
                        <div className="item-actions">
                            <button onClick={() => handleEdit(testimonial)} className="btn-icon">
                                <Edit size={16} />
                            </button>
                            <button onClick={() => handleDelete(testimonial.id)} className="btn-icon-danger">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TestimonialsManager;
