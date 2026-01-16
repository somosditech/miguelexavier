/**
 * COMPONENTE: Services
 * 
 * Seção de "Áreas de Atuação" / "Serviços".
 * Mostra os serviços oferecidos pelo escritório em cards.
 * 
 * O conteúdo vem da API através do hook useContent.
 */

import { useContent } from '../hooks/useContent';
import { Briefcase, Heart, Building2, Home, Scale, Shield } from 'lucide-react'; // Apenas os ícones necessários
import { motion } from 'framer-motion'; // Biblioteca de animações
import './Services.css';

// Mapeamento de ícones disponíveis
const iconMap = {
    Briefcase,
    Heart,
    Building2,
    Home,
    Scale,
    Shield
};

function Services() {
    // Busca o conteúdo da seção services da API
    const { content, loading } = useContent('services');

    // Enquanto carrega, mostra um placeholder
    if (loading || !content) {
        return (
            <section id="services" className="services section">
                <div className="container">
                    <div className="spinner"></div>
                </div>
            </section>
        );
    }

    // Se content é um array, usa diretamente; senão, pega content.services
    const services = Array.isArray(content) ? content : (content.services || []);
    const title = content.title || 'Áreas de Atuação';
    const subtitle = content.subtitle || 'Soluções Jurídicas Completas';

    return (
        <section id="services" className="services section">
            <div className="container">
                {/* Cabeçalho da seção */}
                <div className="section-header">
                    <p className="section-subtitle">{subtitle}</p>
                    <h2 className="section-title">{title}</h2>
                </div>

                {/* Grid de serviços */}
                <div className="services-grid">
                    {services.map((service, index) => {
                        // Pega o ícone do mapeamento
                        const IconComponent = iconMap[service.icon];

                        // Se o ícone não for encontrado, usa Briefcase como fallback e avisa no console
                        if (!IconComponent) {
                            console.warn(`Ícone "${service.icon}" não encontrado. Usando Briefcase como fallback.`);
                        }
                        const FinalIcon = IconComponent || Briefcase;

                        return (
                            <motion.div
                                key={service.id}
                                className="service-card"
                                initial={{ opacity: 0, y: 50 }} // Começa invisível e abaixo
                                whileInView={{ opacity: 1, y: 0 }} // Aparece ao entrar na viewport
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }} // Delay escalonado
                                whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }} // Levanta ao passar o mouse
                            >
                                {/* Ícone do serviço */}
                                <motion.div
                                    className="service-icon"
                                    whileHover={{ scale: 1.1, rotate: 5 }} // Animação do ícone
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Renderiza o ícone Lucide React ou fallback */}
                                    <FinalIcon size={56} strokeWidth={1.5} />
                                </motion.div>

                                {/* Título do serviço */}
                                <h3 className="service-title">{service.title}</h3>

                                {/* Descrição do serviço */}
                                <p className="service-description">{service.description}</p>

                                {/* Lista de características/features */}
                                <ul className="service-features">
                                    {service.features.map((feature, idx) => (
                                        <motion.li
                                            key={idx}
                                            className="service-feature"
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.3, delay: 0.5 + (idx * 0.05) }}
                                        >
                                            <span className="feature-bullet">✓</span>
                                            {feature}
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default Services;
