import { useState, useEffect } from 'react';
import { getContactMessages, markMessageAsRead, deleteMessage } from '../services/adminApi';
import { Mail, Clock, CheckCircle, Eye, Trash2, AlertTriangle } from 'lucide-react';
import '../styles/Messages.css';

function Messages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState(null);

    // Estados do Modal de Exclusão
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageToDelete, setMessageToDelete] = useState(null);

    useEffect(() => {
        loadMessages();
    }, []);

    const loadMessages = async () => {
        try {
            const data = await getContactMessages();
            setMessages(data);
        } catch (error) {
            console.error('Error loading messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const openDeleteModal = (e, message) => {
        e.stopPropagation(); // Impede que a mensagem seja selecionada ao clicar na lixeira
        setMessageToDelete(message);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!messageToDelete) return;

        try {
            await deleteMessage(messageToDelete.id);

            // Se a mensagem excluída era "Não Lida", atualiza o contador global
            if (!messageToDelete.read_at) {
                window.dispatchEvent(new CustomEvent('messageRead'));
            }

            // Remove da lista local
            setMessages(messages.filter(msg => msg.id !== messageToDelete.id));

            // Se a mensagem que estava aberta foi a excluída, limpa o detalhe
            if (selectedMessage?.id === messageToDelete.id) {
                setSelectedMessage(null);
            }

            // Fecha o modal e limpa o estado
            setIsModalOpen(false);
            setMessageToDelete(null);
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            await markMessageAsRead(id);
            setMessages(messages.map(msg =>
                msg.id === id ? { ...msg, read_at: new Date().toISOString() } : msg
            ));
            // Atualiza o contador na sidebar/header
            window.dispatchEvent(new CustomEvent('messageRead'));
        } catch (error) {
            console.error('Error marking as read:', error);
        }
    };

    const handleViewMessage = (message) => {
        setSelectedMessage(message);
        if (!message.read_at) {
            handleMarkAsRead(message.id);
        }
    };

    if (loading) return <div className="loading">Carregando...</div>;

    return (
        <div className="messages-page">
            <div className="messages-header">
                <h1><Mail size={28} /> Mensagens de Contato</h1>
                <p>{messages.length} mensagem(ns) recebida(s)</p>
            </div>

            <div className="messages-container">
                <div className="messages-list">
                    {messages.length === 0 ? (
                        <div className="empty-state">
                            <Mail size={48} />
                            <p>Nenhuma mensagem recebida ainda</p>
                        </div>
                    ) : (
                        messages.map(message => (
                            <div
                                key={message.id}
                                className={`message-item ${!message.read_at ? 'unread' : ''} ${selectedMessage?.id === message.id ? 'active' : ''}`}
                                onClick={() => handleViewMessage(message)}
                            >
                                {/* Botão de Excluir */}
                                <button
                                    className="delete-message-btn"
                                    onClick={(e) => openDeleteModal(e, message)}
                                    title="Excluir mensagem"
                                >
                                    <Trash2 size={18} />
                                </button>

                                <div className="message-item-header">
                                    <strong>{message.name}</strong>
                                    {!message.read_at && <span className="unread-badge">Nova</span>}
                                </div>
                                <div className="message-item-subject">{message.subject}</div>
                                <div className="message-item-meta">
                                    <Clock size={14} />
                                    {new Date(message.created_at).toLocaleDateString('pt-BR')}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="message-detail">
                    {selectedMessage ? (
                        <>
                            <div className="message-detail-header">
                                <h2>{selectedMessage.subject}</h2>
                                {selectedMessage.read_at ? (
                                    <span className="read-badge">
                                        <CheckCircle size={16} /> Lida
                                    </span>
                                ) : (
                                    <span className="unread-badge-large">
                                        <Eye size={16} /> Não lida
                                    </span>
                                )}
                            </div>

                            <div className="message-detail-info">
                                <div className="info-row"><strong>De:</strong> {selectedMessage.name}</div>
                                <div className="info-row"><strong>Email:</strong> <a href={`mailto:${selectedMessage.email}`}>{selectedMessage.email}</a></div>
                                <div className="info-row"><strong>Telefone:</strong> {selectedMessage.phone || 'Não informado'}</div>
                                <div className="info-row"><strong>Data:</strong> {new Date(selectedMessage.created_at).toLocaleString('pt-BR')}</div>
                            </div>

                            <div className="message-detail-body">
                                <h3>Mensagem:</h3>
                                <p>{selectedMessage.message}</p>
                            </div>
                        </>
                    ) : (
                        <div className="empty-detail">
                            <Mail size={64} />
                            <p>Selecione uma mensagem para visualizar</p>
                        </div>
                    )}
                </div>
            </div>

            {/* MODAL DE CONFIRMAÇÃO */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header-icon">
                            <div className="warning-icon">
                                <AlertTriangle size={40} />
                            </div>
                        </div>
                        <div className="modal-body">
                            <h3>Excluir Mensagem?</h3>
                            <p>Você tem certeza que deseja remover a mensagem de:</p>
                            <strong>{messageToDelete?.name}</strong>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-cancel" onClick={() => setIsModalOpen(false)}>
                                Cancelar
                            </button>
                            <button className="btn-confirm-delete" onClick={confirmDelete}>
                                Confirmar Exclusão
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Messages;