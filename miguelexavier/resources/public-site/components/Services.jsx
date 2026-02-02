/**
 * COMPONENTE: Services
 * 
 * Seção de "Áreas de Atuação" / "Serviços".
 * Mostra os serviços oferecidos pelo escritório em cards.
 * 
 * O conteúdo vem da API através do hook useContent.
 */

import { useContent } from '../hooks/useContent';
import dynamicIconImports from 'lucide-react/dynamicIconImports'; // Importação dinâmica
import { motion } from 'framer-motion';
import { lazy, Suspense, useMemo } from 'react';
import './Services.css';

// Componente para renderizar ícone de forma dinâmica
const DynamicIcon = ({ name, ...props }) => {
    const LucideIcon = useMemo(() => {
        // Converte PascalCase para kebab-case (ex: Briefcase -> briefcase, Building2 -> building-2)
        const iconName = name
            .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
            .toLowerCase();

        const dynamicIcon = dynamicIconImports[iconName];

        if (!dynamicIcon) {
            if (import.meta.env.DEV) {
                console.warn(`Ícone "${name}" (convertido para "${iconName}") não encontrado em lucide-react.`);
            }
            return lazy(dynamicIconImports['briefcase']); // Fallback
        }

        return lazy(dynamicIcon);
    }, [name]);

    return (
        <Suspense fallback={<div style={{ width: 56, height: 56, background: '#f0f0f0', borderRadius: '50%' }} />}>
            <LucideIcon {...props} />
        </Suspense>
    );
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
                                    {/* Renderiza o ícone via componente dinâmico */}
                                    <DynamicIcon name={service.icon} size={56} strokeWidth={1.5} />
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