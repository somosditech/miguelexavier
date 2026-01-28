/**
 * COMPONENTE: ContactForm
 * 
 * Formulário de contato para os clientes enviarem mensagens.
 * Inclui validação de campos e envio para a API.
 * 
 * Campos: nome, email, telefone, assunto, mensagem
 */

import { useState } from 'react';
import { submitContactForm } from '../services/api';
import { mockAreasDeInteresse } from '../services/mockData';
import { motion } from 'framer-motion'; // Biblioteca de animações
import './ContactForm.css';

function ContactForm() {
    // Estado para armazenar os dados do formulário
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    // Estado para controlar o envio
    const [sending, setSending] = useState(false);

    // Estado para mensagens de sucesso/erro
    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

    /**
     * Função para formatar telefone brasileiro
     * Formatos: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
     */
    const formatPhone = (value) => {
        // Remove tudo que não é número
        const numbers = value.replace(/\D/g, '');

        // Limita a 11 dígitos
        const limited = numbers.substring(0, 11);

        // Aplica a máscara
        if (limited.length <= 10) {
            // Formato: (XX) XXXX-XXXX
            return limited
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{4})(\d)/, '$1-$2');
        } else {
            // Formato: (XX) XXXXX-XXXX
            return limited
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{5})(\d)/, '$1-$2');
        }
    };

    /**
     * Função chamada quando o usuário digita em um campo
     * Atualiza o estado do formulário
     */
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Aplica máscara de telefone
        if (name === 'phone') {
            setFormData(prev => ({
                ...prev,
                [name]: formatPhone(value)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    /**
     * Função chamada quando o formulário é enviado
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o reload da página

        // Validação básica
        if (!formData.name || !formData.email || !formData.message) {
            setStatusMessage({
                type: 'error',
                text: 'Por favor, preencha todos os campos obrigatórios.'
            });
            return;
        }

        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setStatusMessage({
                type: 'error',
                text: 'Por favor, insira um email válido.'
            });
            return;
        }

        try {
            setSending(true);
            setStatusMessage({ type: '', text: '' });

            // Envia o formulário para a API
            const response = await submitContactForm(formData);

            // Sucesso
            setStatusMessage({
                type: 'success',
                text: response.message || 'Mensagem enviada com sucesso! Entraremos em contato em breve.'
            });

            // Limpa o formulário
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: ''
            });
        } catch (error) {
            // Erro
            setStatusMessage({
                type: 'error',
                text: error.message || 'Erro ao enviar mensagem. Tente novamente.'
            });
        } finally {
            setSending(false);
        }
    };

    return (
        <section id="contact" className="contact section">
            <div className="container">
                {/* Cabeçalho da seção */}
                <div className="section-header">
                    <p className="section-subtitle">Entre em Contato</p>
                    <h2 className="section-title">Fale Conosco</h2>
                    <p className="section-description">
                        Preencha o formulário abaixo e nossa equipe entrará em contato em breve.
                    </p>
                </div>

                {/* Formulário */}
                <motion.form
                    onSubmit={handleSubmit}
                    className="contact-form"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Nome */}
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">
                            Nome Completo *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Seu nome completo"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            Email *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="seu@email.com"
                            required
                        />
                    </div>

                    {/* Telefone */}
                    <div className="form-group">
                        <label htmlFor="phone" className="form-label">
                            Telefone
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="(11) 99999-9999"
                        />
                    </div>

                    {/* Mensagem */}
                    <div className="form-group">
                        <label htmlFor="message" className="form-label">
                            Mensagem *
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="form-textarea"
                            placeholder="Descreva brevemente sua situação..."
                            rows="6"
                            required
                        ></textarea>
                    </div>

                    {/* Mensagem de status (sucesso/erro) */}
                    {statusMessage.text && (
                        <motion.div
                            className={`status-message ${statusMessage.type}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {statusMessage.text}
                        </motion.div>
                    )}

                    {/* Botão de envio */}
                    <motion.button
                        type="submit"
                        className="btn-primary submit-button"
                        disabled={sending}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {sending ? 'Enviando...' : 'Enviar Mensagem'}
                    </motion.button>
                </motion.form>
            </div>
        </section>
    );
}

export default ContactForm;