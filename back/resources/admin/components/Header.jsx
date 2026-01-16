/**
 * HEADER ADMIN
 */

import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/admin/login');
    };

    return (
        <header className="admin-header">
            <div className="header-content">
                <div className="header-left">
                    <h1>Painel Administrativo</h1>
                </div>

                <div className="header-right">
                    <button onClick={handleLogout} className="logout-btn">
                        <LogOut size={18} />
                        Sair
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
