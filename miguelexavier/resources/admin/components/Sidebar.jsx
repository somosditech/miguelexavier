/**
 * SIDEBAR ADMIN
 */

import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PanelBottomClose, FileText, Wallpaper, Layers, Users, Star, MessageSquare, Palette } from 'lucide-react';
import { getUnreadMessagesCount } from '../services/adminApi';
import '../styles/Sidebar.css';

function Sidebar() {
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        loadUnreadCount();

        // Atualizar a cada 30 segundos
        const interval = setInterval(loadUnreadCount, 30000);

        // Listener para atualizar quando mensagem for marcada como lida
        const handleMessageRead = () => {
            loadUnreadCount();
        };
        window.addEventListener('messageRead', handleMessageRead);

        return () => {
            clearInterval(interval);
            window.removeEventListener('messageRead', handleMessageRead);
        };
    }, []);

    const loadUnreadCount = async () => {
        try {
            const count = await getUnreadMessagesCount();
            setUnreadCount(count);
        } catch (error) {
            console.error('Error loading unread count:', error);
        }
    };

    const menuItems = [
        { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/theme', icon: Palette, label: 'Tema' },
        { path: '/hero', icon: Wallpaper, label: 'Hero' },
        { path: '/about', icon: FileText, label: 'Sobre' },
        { path: '/services', icon: Layers, label: 'Serviços' },
        { path: '/team', icon: Users, label: 'Equipe' },
        // { path: '/testimonials', icon: Star, label: 'Depoimentos' },
        { path: '/footer', icon: PanelBottomClose, label: 'Rodapé' },
        { path: '/whatsapp', icon: MessageSquare, label: 'WhatsApp' },
        { path: '/messages', icon: MessageSquare, label: 'Mensagens', badge: unreadCount }
    ];

    return (
        <aside className="admin-sidebar">
            <div className="sidebar-header">
                <h2>Miguel & Xavier</h2>
                <p>Painel Admin</p>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        >
                            <Icon size={20} />
                            <span>{item.label}</span>
                            {item.badge > 0 && <span className="badge">{item.badge}</span>}
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
}

export default Sidebar;
