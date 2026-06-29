import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './NotFound.css';

function NotFound() {
    return (
        <div className="not-found">
            <motion.div
                className="not-found-content"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                {/* Eyebrow */}
                <div className="nf-eyebrow">
                    <div className="nf-eyebrow-line" />
                    <span className="nf-eyebrow-text">Erro 404</span>
                    <div className="nf-eyebrow-line" />
                </div>

                {/* Número */}
                <div className="not-found-number">404</div>

                {/* Ornamento */}
                <div className="nf-ornament">
                    <div className="nf-ornament-line" />
                    <div className="nf-ornament-diamond" />
                    <div className="nf-ornament-line" />
                </div>

                <h1 className="not-found-title">Página não encontrada</h1>

                <p className="not-found-description">
                    Esta página não existe ou foi movida.<br />
                    Seus direitos, no entanto, continuam aqui.
                </p>

                <Link to="/" className="not-found-button">
                    Voltar ao início
                </Link>
            </motion.div>
        </div>
    );
}

export default NotFound;
