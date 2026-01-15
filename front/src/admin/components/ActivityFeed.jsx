/**
 * ACTIVITY FEED COMPONENT
 * 
 * Exibe feed de atividades recentes do sistema
 */

import { Activity, FileText, Users, Star, Settings } from 'lucide-react';
import PropTypes from 'prop-types';
import '../styles/ActivityFeed.css';

function ActivityFeed({ activities = [] }) {
    const getIcon = (type) => {
        const icons = {
            hero_updated: FileText,
            about_updated: FileText,
            footer_updated: FileText,
            theme_updated: Settings,
            service_added: FileText,
            team_added: Users,
            testimonial_added: Star,
            default: Activity
        };
        return icons[type] || icons.default;
    };

    const formatTimeAgo = (date) => {
        const now = new Date();
        const activityDate = new Date(date);
        const diffInHours = Math.floor((now - activityDate) / (1000 * 60 * 60));

        if (diffInHours < 1) return 'Agora mesmo';
        if (diffInHours < 24) return `${diffInHours}h atrás`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays === 1) return 'há 1 dia';
        if (diffInDays < 7) return `há ${diffInDays} dias`;
        if (diffInDays < 30) {
            const weeks = Math.floor(diffInDays / 7);
            return `há ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`;
        }
        return activityDate.toLocaleDateString('pt-BR');
    };

    if (activities.length === 0) {
        return (
            <div className="activity-feed">
                <div className="section-header">
                    <Activity size={24} />
                    <h2>Últimas Atualizações</h2>
                </div>
                <div className="empty-state">
                    <Activity size={48} />
                    <p>Nenhuma atividade recente</p>
                </div>
            </div>
        );
    }

    return (
        <div className="activity-feed">
            <div className="section-header">
                <Activity size={24} />
                <h2>Últimas Atualizações</h2>
            </div>
            <div className="activities-list">
                {activities.map((activity, index) => {
                    const Icon = getIcon(activity.type);
                    return (
                        <div key={index} className="activity-item">
                            <div className="activity-icon">
                                <Icon size={18} />
                            </div>
                            <div className="activity-content">
                                <p className="activity-description">{activity.description}</p>
                                <span className="activity-time">{formatTimeAgo(activity.date)}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

ActivityFeed.propTypes = {
    activities: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired
        })
    )
};

export default ActivityFeed;
