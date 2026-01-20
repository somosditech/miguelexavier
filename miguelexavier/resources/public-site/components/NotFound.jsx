/**
 * COMPONENTE: NotFound (Página 404)
 * 
 * Página exibida quando o usuário tenta acessar uma rota que não existe.
 * Design simples e elegante seguindo o padrão visual do projeto.
 */

import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
    return (
        <div className="not-found">
            <div className="not-found-content">
                <div className="not-found-number">404</div>
                <h1 className="not-found-title">Página Não Encontrada</h1>
                <p className="not-found-description">
                    Desculpe, a página que você está procurando não existe ou foi movida.
                </p>
                <Link to="/" className="not-found-button">
                    Voltar para o Início
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
