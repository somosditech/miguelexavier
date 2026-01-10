/**
 * CONTEXT DE AUTENTICAÇÃO ADMIN
 * 
 * Gerencia o estado de autenticação do painel admin
 */

import { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, logout as apiLogout, getMe } from '../services/adminApi';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Verificar se há token ao carregar
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = localStorage.getItem('admin_token');

        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await getMe();
            setUser(response.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Auth check failed:', error);
            localStorage.removeItem('admin_token');
            localStorage.removeItem('admin_user');
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await apiLogin(email, password);

            if (response.success) {
                localStorage.setItem('admin_token', response.access_token);
                localStorage.setItem('admin_user', JSON.stringify(response.user));
                setUser(response.user);
                setIsAuthenticated(true);
                return { success: true };
            }

            return { success: false, message: 'Login failed' };
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Erro ao fazer login'
            };
        }
    };

    const logout = async () => {
        try {
            await apiLogout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
            setIsAuthenticated(false);
            localStorage.removeItem('admin_token');
            localStorage.removeItem('admin_user');
        }
    };

    const value = {
        user,
        loading,
        isAuthenticated,
        login,
        logout,
        checkAuth
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
