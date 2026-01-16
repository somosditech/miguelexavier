/**
 * PÁGINA DE LOGIN ADMIN
 * 
 * Formulário de autenticação para acessar o painel admin
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import '../styles/Login.css';

function Login() {
    // Credenciais pré-preenchidas para facilitar desenvolvimento (remover em produção)
    const [email, setEmail] = useState('admin@miguelxavier.adv.br');
    const [password, setPassword] = useState('password123');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await login(email, password);

            if (result.success) {
                navigate('/admin/dashboard');
            } else {
                setError(result.message || 'Credenciais inválidas');
            }
        } catch (err) {
            setError('Erro ao fazer login. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <motion.div
                    className="login-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Logo/Header */}
                    <div className="login-header">
                        <div className="login-icon">
                            <LogIn size={40} />
                        </div>
                        <h1>Painel Admin</h1>
                        <p>Miguel & Xavier Advocacia</p>
                    </div>

                    {/* Formulário */}
                    <form onSubmit={handleSubmit} className="login-form">
                        {/* Email */}
                        <div className="form-group">
                            <label htmlFor="email">
                                <Mail size={18} />
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@miguelxavier.adv.br"
                                required
                                disabled={loading}
                            />
                        </div>

                        {/* Senha */}
                        <div className="form-group">
                            <label htmlFor="password">
                                <Lock size={18} />
                                Senha
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                disabled={loading}
                            />
                        </div>

                        {/* Erro */}
                        {error && (
                            <motion.div
                                className="error-message"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <AlertCircle size={18} />
                                {error}
                            </motion.div>
                        )}

                        {/* Botão */}
                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading}
                        >
                            {loading ? 'Entrando...' : 'Entrar'}
                        </button>
                    </form>


                </motion.div>
            </div>
        </div>
    );
}

export default Login;
