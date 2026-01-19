/**
 * COMPONENTE: LoadingSkeleton
 * 
 * Componente de skeleton screen para melhorar a experiência de loading.
 * Substitui o "Carregando..." genérico por uma prévia visual do conteúdo.
 */

import './LoadingSkeleton.css';

function LoadingSkeleton() {
    return (
        <div className="loading-skeleton">
            {/* Skeleton do Header */}
            <div className="skeleton-header">
                <div className="skeleton-logo shimmer"></div>
                <div className="skeleton-nav">
                    <div className="skeleton-nav-item shimmer"></div>
                    <div className="skeleton-nav-item shimmer"></div>
                    <div className="skeleton-nav-item shimmer"></div>
                    <div className="skeleton-nav-item shimmer"></div>
                </div>
            </div>

            {/* Skeleton do Hero */}
            <div className="skeleton-hero">
                <div className="skeleton-hero-content">
                    <div className="skeleton-subtitle shimmer"></div>
                    <div className="skeleton-title shimmer"></div>
                    <div className="skeleton-title shimmer" style={{ width: '60%' }}></div>
                    <div className="skeleton-description shimmer"></div>
                    <div className="skeleton-buttons">
                        <div className="skeleton-button shimmer"></div>
                        <div className="skeleton-button shimmer"></div>
                    </div>
                </div>
            </div>

            {/* Skeleton de Cards */}
            <div className="skeleton-section">
                <div className="skeleton-section-title shimmer"></div>
                <div className="skeleton-cards-grid">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="skeleton-card">
                            <div className="skeleton-card-icon shimmer"></div>
                            <div className="skeleton-card-title shimmer"></div>
                            <div className="skeleton-card-text shimmer"></div>
                            <div className="skeleton-card-text shimmer" style={{ width: '80%' }}></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LoadingSkeleton;
