import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getServices, getTeamMembers, getTestimonials, getContactMessages } from '../services/adminApi';
import { Users, Layers, MessageSquare, Star } from 'lucide-react';
import RecentMessages from '../components/RecentMessages';
import MessagesChart from '../components/MessagesChart';
import '../styles/Dashboard.css';

function Dashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        services: 0,
        team: 0,
        testimonials: 0,
        messages: 0
    });
    const [recentMessages, setRecentMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);


    const loadDashboardData = async () => {
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

            // Mostrar todas as mensagens (não apenas não lidas)
            setRecentMessages(messages || []);
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const cards = [
        { title: 'Serviços', value: stats.services, icon: Layers, link: '/services', color: '#771220' },
        { title: 'Equipe', value: stats.team, icon: Users, link: '/team', color: '#cfa750' },
        { title: 'Depoimentos', value: stats.testimonials, icon: Star, link: '/testimonials', color: '#38a169' },
        { title: 'Mensagens', value: stats.messages, icon: MessageSquare, link: '/messages', color: '#3b82f6' }
    ];

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Bem-vindo, {user?.name || 'Admin'}!</h1>
                <p>Gerencie o conteúdo do site <a href="/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Miguel & Xavier</a></p>
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

            {/* Analytics Dashboard */}
            <div className="analytics-section">
                <div className="dashboard-grid">
                    {/* Mensagens Recentes */}
                    <RecentMessages messages={recentMessages} maxItems={3} />

                    {/* Gráfico de Mensagens */}
                    <MessagesChart />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;