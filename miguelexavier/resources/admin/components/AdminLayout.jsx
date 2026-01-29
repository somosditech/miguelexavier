/**
 * LAYOUT ADMIN
 */

import { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import PusherNotifications from './PusherNotifications';
import '../styles/AdminLayout.css';

function AdminLayout() {
    const { isAuthenticated, loading } = useAuth();

    // Adiciona classe ao body para desabilitar scrollbar global
    useEffect(() => {
        document.body.classList.add('admin-page');
        return () => {
            document.body.classList.remove('admin-page');
        };
    }, []);

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
                <p>Carregando...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="admin-layout">
            <Sidebar />
            <div className="admin-main">
                <Header />
                <main className="admin-content">
                    <Outlet />
                </main>
            </div>
            <PusherNotifications />
        </div>
    );
}

export default AdminLayout;
