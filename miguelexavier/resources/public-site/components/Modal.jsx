/**
 * COMPONENTE: Modal
 * 
 * Componente genérico para exibir conteúdo em sobreposição (modal/popup).
 * 
 * Props:
 * - isOpen: boolean - Se o modal está visível
 * - onClose: function - Função chamada ao fechar
 * - title: string - Título do modal
 * - children: node - Conteúdo do modal
 */

import { useEffect } from 'react';
import { X } from 'lucide-react';
import './Modal.css';

function Modal({ isOpen, onClose, title, children }) {
    // Fecha com ESC
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            // Bloqueia scroll do body
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    // Fecha ao clicar fora (backdrop)
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-container fade-in">
                <div className="modal-header">
                    <h3 className="modal-title">{title}</h3>
                    <button className="modal-close-btn" onClick={onClose} aria-label="Fechar">
                        <X size={24} />
                    </button>
                </div>
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;
