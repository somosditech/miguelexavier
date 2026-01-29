/**
 * BADGE DE NOTIFICAÇÕES - EXEMPLO DE USO
 * 
 * Este componente pode ser adicionado ao Header para mostrar
 * o número de mensagens não lidas em tempo real.
 */

import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePusherNotifications } from './PusherNotifications';
import '../styles/NotificationBadge.css';

function NotificationBadge() {
    const { unreadCount, resetUnreadCount } = usePusherNotifications();
    const navigate = useNavigate();

    const handleClick = () => {
        // Resetar contador ao clicar
        resetUnreadCount();
        // Navegar para página de mensagens
        navigate('/messages');
    };

    return (
        <button onClick={handleClick} className="notification-badge-btn">
            <Bell size={18} />
            {unreadCount > 0 && (
                <span className="notification-count">
                    {unreadCount > 99 ? '99+' : unreadCount}
                </span>
            )}
        </button>
    );
}

export default NotificationBadge;
