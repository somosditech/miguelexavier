/**
 * SIDEBAR ADMIN
 */

import { NavLink } from 'react-router-dom';
import { Home, Settings, FileText, Briefcase, Users, Star, MessageSquare, Palette } from 'lucide-react';
import '../styles/Sidebar.css';

function Sidebar() {
    const menuItems = [
        { path: '/admin/dashboard', icon: Home, label: 'Dashboard' },
        { path: '/admin/theme', icon: Palette, label: 'Tema' },
        { path: '/admin/hero', icon: FileText, label: 'Hero' },
        { path: '/admin/about', icon: FileText, label: 'Sobre' },
        { path: '/admin/services', icon: Briefcase, label: 'Serviços' },
        { path: '/admin/team', icon: Users, label: 'Equipe' },
        { path: '/admin/testimonials', icon: Star, label: 'Depoimentos' },
        { path: '/admin/footer', icon: Settings, label: 'Rodapé' },
        { path: '/admin/messages', icon: MessageSquare, label: 'Mensagens' }
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
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
}

export default Sidebar;
