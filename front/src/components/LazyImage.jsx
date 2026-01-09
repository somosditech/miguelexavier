/**
 * COMPONENTE: LazyImage
 * 
 * Componente para lazy loading de imagens com placeholder.
 * Usa Intersection Observer para carregar imagens apenas quando visíveis.
 * 
 * @param {string} src - URL da imagem
 * @param {string} alt - Texto alternativo
 * @param {string} className - Classes CSS adicionais
 * @param {string} placeholder - URL do placeholder (opcional)
 */

import { useState, useEffect, useRef } from 'react';
import './LazyImage.css';

function LazyImage({
    src,
    alt,
    className = '',
    placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3C/svg%3E',
    ...props
}) {
    const [imageSrc, setImageSrc] = useState(placeholder);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        // Intersection Observer para detectar quando imagem entra na viewport
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Imagem está visível, começar carregamento
                        const img = new Image();
                        img.src = src;

                        img.onload = () => {
                            setImageSrc(src);
                            setImageLoaded(true);
                        };

                        img.onerror = () => {
                            setImageError(true);
                        };

                        // Parar de observar após começar o carregamento
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                rootMargin: '50px', // Começar a carregar 50px antes de entrar na viewport
                threshold: 0.01
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        // Cleanup
        return () => {
            if (imgRef.current) {
                observer.unobserve(imgRef.current);
            }
        };
    }, [src]);

    return (
        <div className={`lazy-image-wrapper ${className}`} ref={imgRef}>
            <img
                src={imageSrc}
                alt={alt}
                className={`lazy-image ${imageLoaded ? 'loaded' : 'loading'} ${imageError ? 'error' : ''}`}
                loading="lazy" // Native lazy loading como fallback
                {...props}
            />
            {!imageLoaded && !imageError && (
                <div className="lazy-image-placeholder shimmer" />
            )}
            {imageError && (
                <div className="lazy-image-error">
                    <span>Erro ao carregar imagem</span>
                </div>
            )}
        </div>
    );
}

export default LazyImage;
