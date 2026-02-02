/**
 * HOOK CUSTOMIZADO: useTheme
 * 
 * Este hook gerencia o tema (cores) do site.
 * Ele busca as cores da API e aplica no site automaticamente.
 * 
 * Como usar:
 * import { useTheme } from './hooks/useTheme';
 * 
 * function MeuComponente() {
 *   const { theme, loading } = useTheme();
 *   return <div style={{ color: theme.primary }}>Olá</div>;
 * }
 */

import { useState, useEffect } from 'react';
import { fetchTheme } from '../services/api';

export const useTheme = () => {
    // Estado para armazenar as cores do tema
    const [theme, setTheme] = useState(null);

    // Estado para indicar se está carregando
    const [loading, setLoading] = useState(true);

    // Estado para armazenar erros
    const [error, setError] = useState(null);

    // useEffect executa quando o componente é montado
    useEffect(() => {
        // Função para carregar o tema
        const loadTheme = async () => {
            try {
                setLoading(true);

                // Busca o tema da API
                const themeData = await fetchTheme();
                setTheme(themeData);

                // Aplica as cores como variáveis CSS no documento
                // Isso permite usar as cores em qualquer lugar do CSS
                if (themeData) {
                    const root = document.documentElement;
                    Object.keys(themeData).forEach(key => {
                        // Converte camelCase para kebab-case (ex: textPrimary -> text-primary)
                        const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
                        root.style.setProperty(`--color-${cssVar}`, themeData[key]);
                    });
                }

                setError(null);
            } catch (err) {
                if (import.meta.env.DEV) {
                    console.error('Erro ao carregar tema:', err);
                }
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadTheme();
    }, []); // Array vazio = executa apenas uma vez quando o componente monta

    // Retorna o tema, estado de loading e erro
    return { theme, loading, error };
};
