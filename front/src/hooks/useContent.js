/**
 * HOOK CUSTOMIZADO: useContent
 * 
 * Este hook gerencia o conteúdo (textos e imagens) do site.
 * Ele busca o conteúdo da API para uma seção específica.
 * 
 * Como usar:
 * import { useContent } from './hooks/useContent';
 * 
 * function MeuComponente() {
 *   const { content, loading } = useContent('hero');
 *   if (loading) return <div>Carregando...</div>;
 *   return <h1>{content.title}</h1>;
 * }
 */

import { useState, useEffect } from 'react';
import {
    fetchHeader,
    fetchHero,
    fetchAbout,
    fetchServices,
    fetchTeam,
    fetchTestimonials,
    fetchFooter,
    fetchAIChatConfig
} from '../services/api';

// Mapeamento de seções para suas respectivas funções de busca
const contentFetchers = {
    header: fetchHeader,
    hero: fetchHero,
    about: fetchAbout,
    services: fetchServices,
    team: fetchTeam,
    testimonials: fetchTestimonials,
    footer: fetchFooter,
    aiChat: fetchAIChatConfig
};

/**
 * Hook para buscar conteúdo de uma seção específica
 * @param {string} section - Nome da seção ('header', 'hero', 'about', etc.)
 */
export const useContent = (section) => {
    // Estado para armazenar o conteúdo
    const [content, setContent] = useState(null);

    // Estado para indicar se está carregando
    const [loading, setLoading] = useState(true);

    // Estado para armazenar erros
    const [error, setError] = useState(null);

    // useEffect executa quando o componente é montado ou quando 'section' muda
    useEffect(() => {
        // Função para carregar o conteúdo
        const loadContent = async () => {
            try {
                setLoading(true);

                // Busca a função correta para a seção
                const fetcher = contentFetchers[section];

                if (!fetcher) {
                    throw new Error(`Seção '${section}' não encontrada`);
                }

                // Busca o conteúdo da API
                const data = await fetcher();
                setContent(data);
                setError(null);
            } catch (err) {
                console.error(`Erro ao carregar conteúdo da seção ${section}:`, err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadContent();
    }, [section]); // Recarrega se a seção mudar

    // Retorna o conteúdo, estado de loading e erro
    return { content, loading, error };
};
