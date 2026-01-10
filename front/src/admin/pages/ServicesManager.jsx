/**
 * GERENCIADOR DE SERVIÇOS (CRUD)
 */

import { useState, useEffect } from 'react';
import { getServices, createService, updateService, deleteService } from '../services/adminApi';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import '../styles/Manager.css';

function ServicesManager() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [formData, setFormData] = useState({
        icon: '',
        title: '',
        description: '',
        features: [],
        order: 0
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {
        try {
            const data = await getServices();
            setServices(data);
        } catch (error) {
            console.error('Error loading services:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (service) => {
        setEditing(service.id);
        setFormData({
            icon: service.icon,
            title: service.title,
            description: service.description,
            features: service.features || [],
            order: service.order
        });
    };

    const handleNew = () => {
        setEditing('new');
        setFormData({
            icon: 'Briefcase',
            title: '',
            description: '',
            features: [],
            order: services.length + 1
        });
    };

    const handleCancel = () => {
        setEditing(null);
        setFormData({ icon: '', title: '', description: '', features: [], order: 0 });
    };

    const handleSave = async () => {
        try {
            if (editing === 'new') {
                await createService(formData);
                setMessage('Serviço criado com sucesso!');
            } else {
                await updateService(editing, formData);
                setMessage('Serviço atualizado com sucesso!');
            }
            loadServices();
            handleCancel();
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error saving service:', error);
            setMessage('Erro ao salvar serviço');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Tem certeza que deseja deletar este serviço?')) return;

        try {
            await deleteService(id);
            setMessage('Serviço deletado com sucesso!');
            loadServices();
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error deleting service:', error);
            setMessage('Erro ao deletar serviço');
        }
    };

    const handleFeatureAdd = () => {
        setFormData({ ...formData, features: [...formData.features, ''] });
    };

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData({ ...formData, features: newFeatures });
    };

    const handleFeatureRemove = (index) => {
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData({ ...formData, features: newFeatures });
    };

    if (loading) return <div className="loading">Carregando...</div>;

    return (
        <div className="manager-page">
            <div className="manager-header">
                <div>
                    <h1>Gerenciador de Serviços</h1>
                    <p>{services.length} serviço(s) cadastrado(s)</p>
                </div>
                <button onClick={handleNew} className="btn-primary">
                    <Plus size={18} />
                    Novo Serviço
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
                        <h2>{editing === 'new' ? 'Novo Serviço' : 'Editar Serviço'}</h2>

                        <div className="form-field">
                            <label>Ícone (Lucide)</label>
                            <input
                                type="text"
                                value={formData.icon}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                placeholder="Ex: Briefcase, Heart, Scale"
                            />
                            <small>Nome do ícone Lucide React</small>
                        </div>

                        <div className="form-field">
                            <label>Título</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Ex: Direito Empresarial"
                            />
                        </div>

                        <div className="form-field">
                            <label>Descrição</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Descrição do serviço..."
                            />
                        </div>

                        <div className="form-field">
                            <label>Features</label>
                            {formData.features.map((feature, index) => (
                                <div key={index} className="feature-input">
                                    <input
                                        type="text"
                                        value={feature}
                                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                                        placeholder="Ex: Contratos"
                                    />
                                    <button onClick={() => handleFeatureRemove(index)} className="btn-icon-danger">
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                            <button onClick={handleFeatureAdd} className="btn-secondary">
                                <Plus size={16} />
                                Adicionar Feature
                            </button>
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
                {services.map(service => (
                    <div key={service.id} className="item-card">
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                        <div className="item-meta">
                            <span>Ícone: {service.icon}</span>
                            <span>Ordem: {service.order}</span>
                        </div>
                        <div className="item-actions">
                            <button onClick={() => handleEdit(service)} className="btn-icon">
                                <Edit size={16} />
                            </button>
                            <button onClick={() => handleDelete(service.id)} className="btn-icon-danger">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ServicesManager;
