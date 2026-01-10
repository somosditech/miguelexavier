/**
 * VISUALIZADOR DE MENSAGENS DE CONTATO
 */

import { useState, useEffect } from 'react';
import { getContactMessages, markMessageAsRead } from '../services/adminApi';
import { Mail, Clock, CheckCircle, Eye } from 'lucide-react';
import '../styles/Messages.css';

function Messages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState(null);

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

    const handleMarkAsRead = async (id) => {
        try {
            await markMessageAsRead(id);
            setMessages(messages.map(msg =>
                msg.id === id ? { ...msg, read_at: new Date().toISOString() } : msg
            ));
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
                                        <CheckCircle size={16} />
                                        Lida
                                    </span>
                                ) : (
                                    <span className="unread-badge-large">
                                        <Eye size={16} />
                                        Não lida
                                    </span>
                                )}
                            </div>

                            <div className="message-detail-info">
                                <div className="info-row">
                                    <strong>De:</strong> {selectedMessage.name}
                                </div>
                                <div className="info-row">
                                    <strong>Email:</strong> <a href={`mailto:${selectedMessage.email}`}>{selectedMessage.email}</a>
                                </div>
                                <div className="info-row">
                                    <strong>Telefone:</strong> {selectedMessage.phone || 'Não informado'}
                                </div>
                                <div className="info-row">
                                    <strong>Área de Interesse:</strong> {selectedMessage.area_of_interest || 'Não especificada'}
                                </div>
                                <div className="info-row">
                                    <strong>Data:</strong> {new Date(selectedMessage.created_at).toLocaleString('pt-BR')}
                                </div>
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
        </div>
    );
}

export default Messages;
