import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowLeft } from 'lucide-react';
import { resetPassword } from '../services/adminApi';
import '../styles/Auth.css';

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Limpar erro do campo ao digitar
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setErrors({});
        setLoading(true);

        try {
            const response = await resetPassword(
                token,
                formData.email,
                formData.password,
                formData.password_confirmation
            );

            setMessage(response.message);

            // Redirecionar para login após 2 segundos
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            } else if (err.response?.data?.message) {
                setMessage(err.response.data.message);
            } else {
                setMessage('Erro ao redefinir senha. Tente novamente.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>Redefinir Senha</h1>
                    <p>Digite sua nova senha</p>
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
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="seu@email.com"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="password">
                            <Lock size={18} />
                            Nova Senha
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Mínimo 8 caracteres"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="password_confirmation">
                            <Lock size={18} />
                            Confirmar Nova Senha
                        </label>
                        <input
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            placeholder="Confirme a senha"
                            required
                            disabled={loading}
                        />
                    </div>

                    {message && (
                        <div className={`message ${message.includes('sucesso') ? 'success' : 'error'}`}>
                            {message}
                        </div>
                    )}

                    {Object.keys(errors).length > 0 && (
                        <div className="message error">
                            {errors.email && <div>{errors.email[0]}</div>}
                            {errors.password && <div>{errors.password[0]}</div>}
                            {errors.token && <div>{errors.token[0]}</div>}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Redefinindo...' : 'Redefinir Senha'}
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

export default ResetPassword;
