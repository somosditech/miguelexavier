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
            setUser(response.user);
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

            if (response && response.success) {
                localStorage.setItem('admin_token', response.access_token);
                localStorage.setItem('admin_user', JSON.stringify(response.user));
                setUser(response.user);
                setIsAuthenticated(true);
                return { success: true };
            }

            return {
                success: false,
                message: response?.message || 'Credenciais inválidas'
            };
        } catch (error) {
            console.error('Login error:', error);

            // Trata diferentes tipos de erro
            if (error.response) {
                // Erro de resposta do servidor
                const message = error.response.data?.message || 'Credenciais inválidas';
                return { success: false, message };
            } else if (error.request) {
                // Erro de rede
                return { success: false, message: 'Erro de conexão. Verifique sua internet.' };
            } else {
                // Outro tipo de erro
                return { success: false, message: 'Erro ao fazer login. Tente novamente.' };
            }
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
