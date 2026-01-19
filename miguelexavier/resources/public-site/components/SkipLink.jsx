/**
 * COMPONENTE: SkipLink
 * 
 * Link de pular para conteúdo principal.
 * Melhora acessibilidade para usuários de teclado e screen readers.
 */

import './SkipLink.css';

function SkipLink() {
    return (
        <a href="#main-content" className="skip-link">
            Pular para o conteúdo principal
        </a>
    );
}

export default SkipLink;
