/**
 * COMPONENTE: AIChat
 * 
 * Chat com IA para análise preliminar de casos jurídicos.
 * O usuário descreve seu caso e recebe uma resposta automatizada.
 * 
 * Futuramente, este componente se conectará a uma API de IA real.
 */

import { useState } from 'react';
import { useContent } from '../hooks/useContent';
import { sendAIMessage } from '../services/api';
import { Bot } from 'lucide-react'; // Ícone de robô
import './AIChat.css';

function AIChat() {
    // Busca as configurações do chat da API
    const { content, loading: configLoading } = useContent('aiChat');

    // Estado para armazenar as mensagens do chat
    const [messages, setMessages] = useState([]);

    // Estado para a mensagem atual sendo digitada
    const [currentMessage, setCurrentMessage] = useState('');

    // Estado para controlar se está enviando
    const [sending, setSending] = useState(false);

    /**
     * Função para enviar mensagem
     */
    const handleSend = async () => {
        if (!currentMessage.trim() || sending) return;

        // Adiciona a mensagem do usuário ao chat
        const userMessage = {
            id: Date.now(),
            type: 'user',
            text: currentMessage,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setCurrentMessage('');
        setSending(true);

        try {
            // Envia para a API de IA
            const response = await sendAIMessage(currentMessage);

            // Adiciona a resposta da IA ao chat
            const aiMessage = {
                id: Date.now() + 1,
                type: 'ai',
                text: response.response,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            // Em caso de erro, mostra mensagem de erro
            const errorMessage = {
                id: Date.now() + 1,
                type: 'error',
                text: error.message || 'Erro ao processar sua mensagem. Tente novamente.',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setSending(false);
        }
    };

    /**
     * Função para enviar ao pressionar Enter
     */
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Enquanto carrega as configurações
    if (configLoading) {
        return (
            <section id="ai-chat" className="ai-chat section">
                <div className="container">
                    <div className="spinner"></div>
                </div>
            </section>
        );
    }

    return (
        <section id="ai-chat" className="ai-chat section">
            <div className="container">
                {/* Cabeçalho da seção */}
                <div className="section-header">
                    <p className="section-subtitle">{content.subtitle}</p>
                    <h2 className="section-title">{content.title}</h2>
                </div>

                {/* Container do chat */}
                <div className="chat-container fade-in">
                    {/* Área de mensagens */}
                    <div className="chat-messages">
                        {messages.length === 0 ? (
                            // Mensagem inicial quando não há conversas
                            <div className="chat-empty">
                                <div className="chat-icon">
                                    <Bot size={64} strokeWidth={1.5} />
                                </div>
                                <p>Olá! Sou o assistente virtual do escritório Miguel & Xavier.</p>
                                <p>Descreva brevemente sua situação jurídica e farei uma análise preliminar.</p>
                            </div>
                        ) : (
                            // Lista de mensagens
                            messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`chat-message ${message.type}`}
                                >
                                    <div className="message-content">
                                        {message.text}
                                    </div>
                                    <div className="message-time">
                                        {message.timestamp.toLocaleTimeString('pt-BR', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                </div>
                            ))
                        )}

                        {/* Indicador de digitação */}
                        {sending && (
                            <div className="chat-message ai typing">
                                <div className="message-content">
                                    <span className="typing-dot"></span>
                                    <span className="typing-dot"></span>
                                    <span className="typing-dot"></span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Aviso legal */}
                    <div className="chat-disclaimer">
                        <small>{content.disclaimer}</small>
                    </div>

                    {/* Área de input */}
                    <div className="chat-input-wrapper">
                        <textarea
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={content.placeholder}
                            className="chat-input"
                            rows="3"
                            disabled={sending}
                        />
                        <button
                            onClick={handleSend}
                            className="btn-primary chat-send-button"
                            disabled={sending || !currentMessage.trim()}
                        >
                            {sending ? 'Enviando...' : 'Enviar'}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AIChat;
