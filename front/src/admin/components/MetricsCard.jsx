/**
 * METRICS CARD COMPONENT
 * 
 * Card para exibir métricas com ícone, valor e tendência
 */

import { TrendingUp, TrendingDown } from 'lucide-react';
import PropTypes from 'prop-types';
import '../styles/MetricsCard.css';

function MetricsCard({ icon: Icon, value, label, color, trend }) {
    const trendDirection = trend?.direction || 'neutral';
    const trendValue = trend?.value || 0;

    return (
        <div className="metrics-card" style={{ '--card-color': color }}>
            <div className="metrics-icon">
                <Icon size={32} />
            </div>
            <div className="metrics-content">
                <h3 className="metrics-value">{value}</h3>
                <p className="metrics-label">{label}</p>
                {trend && (
                    <div className={`metrics-trend ${trendDirection}`}>
                        {trendDirection === 'up' ? (
                            <TrendingUp size={14} />
                        ) : trendDirection === 'down' ? (
                            <TrendingDown size={14} />
                        ) : null}
                        <span>{Math.abs(trendValue)}% vs mês anterior</span>
                    </div>
                )}
            </div>
        </div>
    );
}

MetricsCard.propTypes = {
    icon: PropTypes.elementType.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    label: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    trend: PropTypes.shape({
        value: PropTypes.number,
        direction: PropTypes.oneOf(['up', 'down', 'neutral'])
    })
};

export default MetricsCard;
