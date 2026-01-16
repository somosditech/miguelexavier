/**
 * RECENT MESSAGES COMPONENT
 * 
 * Exibe as mensagens mais recentes recebidas
 */

import { Link } from 'react-router-dom';
import { Mail, Clock, ArrowRight } from 'lucide-react';
import PropTypes from 'prop-types';
import '../styles/RecentMessages.css';

function RecentMessages({ messages = [], maxItems = 5 }) {
    const displayMessages = messages.slice(0, maxItems);

    const formatTimeAgo = (date) => {
        const now = new Date();
        const messageDate = new Date(date);
        const diffInHours = Math.floor((now - messageDate) / (1000 * 60 * 60));

        if (diffInHours < 1) return 'Agora mesmo';
        if (diffInHours < 24) return `${diffInHours}h atrás`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays === 1) return '1 dia atrás';
        if (diffInDays < 7) return `${diffInDays} dias atrás`;
        return messageDate.toLocaleDateString('pt-BR');
    };

    if (displayMessages.length === 0) {
        return (
            <div className="recent-messages">
                <div className="section-header">
                    <Mail size={24} />
                    <h2>Mensagens Recentes</h2>
                </div>
                <div className="empty-state">
                    <Mail size={48} />
                    <p>Nenhuma mensagem recebida ainda</p>
                </div>
            </div>
        );
    }

    return (
        <div className="recent-messages">
            <div className="section-header">
                <Mail size={24} />
                <h2>Mensagens Recentes</h2>
            </div>
            <div className="messages-list">
                {displayMessages.map((message) => (
                    <Link
                        key={message.id}
                        to={`/admin/messages`}
                        className={`message-item ${!message.read_at ? 'unread' : ''}`}
                    >
                        <div className="message-header">
                            <span className="message-name">{message.name}</span>
                            {!message.read_at && <span className="unread-badge">Nova</span>}
                        </div>
                        <p className="message-subject">{message.subject || message.message?.substring(0, 50) + '...'}</p>
                        <div className="message-footer">
                            <Clock size={14} />
                            <span>{formatTimeAgo(message.created_at)}</span>
                        </div>
                    </Link>
                ))}
            </div>
            <Link to="/admin/messages" className="view-all-link">
                Ver todas as mensagens
                <ArrowRight size={16} />
            </Link>
        </div>
    );
}

RecentMessages.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            subject: PropTypes.string,
            message: PropTypes.string,
            created_at: PropTypes.string.isRequired,
            read_at: PropTypes.string
        })
    ),
    maxItems: PropTypes.number
};

export default RecentMessages;
