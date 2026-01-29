import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

/**
 * Hook personalizado para escutar notificações de novas mensagens de contato
 */
export const usePusherNotifications = () => {
    const [notification, setNotification] = useState(null);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        // Obter credenciais do Pusher das variáveis de ambiente
        const pusherKey = import.meta.env.VITE_PUSHER_APP_KEY;
        const pusherCluster = import.meta.env.VITE_PUSHER_APP_CLUSTER;

        if (!pusherKey || !pusherCluster) {
            console.warn('Pusher credentials not configured');
            return;
        }

        // Inicializar Pusher
        const pusher = new Pusher(pusherKey, {
            cluster: pusherCluster,
            encrypted: true,
        });

        // Inscrever no canal de notificações do admin
        const channel = pusher.subscribe('admin-notifications');

        // Escutar evento de nova mensagem de contato
        channel.bind('new.contact.message', (data) => {
            console.log('Nova mensagem de contato recebida:', data);

            setNotification({
                id: data.id,
                name: data.name,
                email: data.email,
                phone: data.phone,
                message: data.message,
                created_at: data.created_at,
                timestamp: new Date(),
            });

            setUnreadCount((prev) => prev + 1);

            // Mostrar notificação do navegador se permitido
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('Nova Mensagem de Contato', {
                    body: `${data.name} enviou uma mensagem`,
                    icon: '/favicon.ico',
                    tag: `contact-${data.id}`,
                });
            }
        });

        // Limpar ao desmontar
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
            pusher.disconnect();
        };
    }, []);

    const clearNotification = () => {
        setNotification(null);
    };

    const resetUnreadCount = () => {
        setUnreadCount(0);
    };

    // Solicitar permissão para notificações do navegador
    const requestNotificationPermission = () => {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    };

    return {
        notification,
        unreadCount,
        clearNotification,
        resetUnreadCount,
        requestNotificationPermission,
    };
};

/**
 * Componente de notificação toast
 */
export const NotificationToast = ({ notification, onClose }) => {
    useEffect(() => {
        if (notification) {
            // Auto-fechar após 10 segundos
            const timer = setTimeout(() => {
                onClose();
            }, 10000);

            return () => clearTimeout(timer);
        }
    }, [notification, onClose]);

    if (!notification) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '16px 24px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                zIndex: 9999,
                maxWidth: '400px',
                animation: 'slideIn 0.3s ease-out',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>
                        📬 Nova Mensagem de Contato
                    </h4>
                    <p style={{ margin: '0 0 4px 0', fontSize: '14px' }}>
                        <strong>{notification.name}</strong>
                    </p>
                    <p style={{ margin: '0', fontSize: '12px', opacity: 0.9 }}>
                        {notification.email}
                    </p>
                </div>
                <button
                    onClick={onClose}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        fontSize: '20px',
                        cursor: 'pointer',
                        padding: '0',
                        marginLeft: '12px',
                    }}
                >
                    ×
                </button>
            </div>
            <style>
                {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
            </style>
        </div>
    );
};

/**
 * Componente principal de notificações Pusher
 */
const PusherNotifications = () => {
    const {
        notification,
        unreadCount,
        clearNotification,
        requestNotificationPermission,
    } = usePusherNotifications();

    useEffect(() => {
        // Solicitar permissão para notificações ao montar
        requestNotificationPermission();
    }, []);

    return (
        <>
            <NotificationToast notification={notification} onClose={clearNotification} />
            {/* Badge de contador pode ser adicionado ao Header */}
        </>
    );
};

export default PusherNotifications;
