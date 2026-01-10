/**
 * DASHBOARD ADMIN
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getServices, getTeamMembers, getTestimonials, getContactMessages } from '../services/adminApi';
import { Users, Briefcase, MessageSquare, Star, Settings, FileText } from 'lucide-react';
import '../styles/Dashboard.css';

function Dashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        services: 0,
        team: 0,
        testimonials: 0,
        messages: 0
    });

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const [services, team, testimonials, messages] = await Promise.all([
                getServices(),
                getTeamMembers(),
                getTestimonials(),
                getContactMessages()
            ]);

            setStats({
                services: services?.length || 0,
                team: team?.length || 0,
                testimonials: testimonials?.length || 0,
                messages: messages?.length || 0
            });
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    };

    const cards = [
        { title: 'Serviços', value: stats.services, icon: Briefcase, link: '/admin/services', color: '#771220' },
        { title: 'Equipe', value: stats.team, icon: Users, link: '/admin/team', color: '#cfa750' },
        { title: 'Depoimentos', value: stats.testimonials, icon: Star, link: '/admin/testimonials', color: '#38a169' },
        { title: 'Mensagens', value: stats.messages, icon: MessageSquare, link: '/admin/messages', color: '#3b82f6' }
    ];

    const quickLinks = [
        { title: 'Editar Tema', icon: Settings, link: '/admin/theme' },
        { title: 'Editar Hero', icon: FileText, link: '/admin/hero' },
        { title: 'Editar About', icon: FileText, link: '/admin/about' },
        { title: 'Editar Footer', icon: FileText, link: '/admin/footer' }
    ];

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Bem-vindo, {user?.name || 'Admin'}!</h1>
                <p>Gerencie o conteúdo do site Miguel & Xavier</p>
            </div>

            {/* Cards de Estatísticas */}
            <div className="stats-grid">
                {cards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <Link to={card.link} key={card.title} className="stat-card" style={{ '--card-color': card.color }}>
                            <div className="stat-icon">
                                <Icon size={32} />
                            </div>
                            <div className="stat-info">
                                <h3>{card.value}</h3>
                                <p>{card.title}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Links Rápidos */}
            <div className="quick-links-section">
                <h2>Edição Rápida</h2>
                <div className="quick-links-grid">
                    {quickLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Link to={link.link} key={link.title} className="quick-link">
                                <Icon size={24} />
                                <span>{link.title}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
