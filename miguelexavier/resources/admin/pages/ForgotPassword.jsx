import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { sendPasswordResetLink } from '../services/adminApi';
import '../styles/Auth.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        try {
            const response = await sendPasswordResetLink(email);
            setMessage(response.message);
            setEmail('');

            // Redirecionar para login após 3 segundos
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            if (err.response?.data?.errors?.email) {
                setError(err.response.data.errors.email[0]);
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError('Erro ao enviar link de recuperação. Tente novamente.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>Recuperar Senha</h1>
                    <p>Informe seu email para receber o link de redefinição</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-field">
                        <label htmlFor="email">
                            <Mail size={18} />
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                            required
                            disabled={loading}
                        />
                    </div>

                    {message && (
                        <div className="message success">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="message error">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="enviar-email-button"
                        disabled={loading}
                    >
                        {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
                    </button>

                    <Link to="/login" className="back-link">
                        <ArrowLeft size={16} />
                        Voltar ao Login
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
