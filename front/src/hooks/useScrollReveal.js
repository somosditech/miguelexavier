/**
 * HOOK: useScrollReveal
 * 
 * Hook customizado para aplicar animações quando elementos entram na viewport.
 * Usa Intersection Observer API para performance otimizada.
 * 
 * @param {Object} options - Opções de configuração
 * @param {number} options.threshold - Porcentagem do elemento visível para trigger (0-1)
 * @param {string} options.animationType - Tipo de animação ('fade-in', 'slide-up', 'slide-left', 'slide-right')
 * @param {number} options.delay - Delay antes da animação (ms)
 * @returns {Object} - Ref para anexar ao elemento
 */

import { useEffect, useRef, useState } from 'react';

export const useScrollReveal = (options = {}) => {
    const {
        threshold = 0.1,
        animationType = 'fade-in-up',
        delay = 0,
        triggerOnce = true
    } = options;

    const elementRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        // Configurar Intersection Observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Aplicar delay se especificado
                        setTimeout(() => {
                            setIsVisible(true);
                            element.classList.add('is-visible');
                        }, delay);

                        // Se triggerOnce, desconectar após primeira visualização
                        if (triggerOnce) {
                            observer.unobserve(element);
                        }
                    } else if (!triggerOnce) {
                        // Se não for triggerOnce, remover classe quando sair da viewport
                        setIsVisible(false);
                        element.classList.remove('is-visible');
                    }
                });
            },
            {
                threshold,
                rootMargin: '0px 0px -50px 0px' // Trigger um pouco antes do elemento estar totalmente visível
            }
        );

        // Adicionar classe de animação ao elemento
        element.classList.add('scroll-reveal', animationType);

        // Observar elemento
        observer.observe(element);

        // Cleanup
        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [threshold, animationType, delay, triggerOnce]);

    return { ref: elementRef, isVisible };
};

export default useScrollReveal;
