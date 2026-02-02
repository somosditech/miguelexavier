/**
 * THEME PROVIDER
 * Aplica as cores do tema dinamicamente usando CSS variables
 */

import { useEffect, useState } from 'react';
import { fetchTheme } from '../services/api';

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(null);

    useEffect(() => {
        loadTheme();
    }, []);

    const loadTheme = async () => {
        try {
            const themeData = await fetchTheme();
            setTheme(themeData);
            applyTheme(themeData);
        } catch (error) {
            if (import.meta.env.DEV) {
                console.error('Error loading theme:', error);
            }
        }
    };

    const applyTheme = (themeData) => {
        if (!themeData) return;

        const root = document.documentElement;

        // Aplicar cores como CSS variables
        root.style.setProperty('--color-primary', themeData.primary || '#771220');
        root.style.setProperty('--color-secondary', themeData.secondary || '#CFA750');
        root.style.setProperty('--color-accent', themeData.accent || '#C49B63');
        root.style.setProperty('--color-background', themeData.background || '#f5f1eb');
        root.style.setProperty('--color-background-dark', themeData.backgroundDark || '#2a3342');
        root.style.setProperty('--color-background-light', themeData.backgroundLight || '#ffffff');
        root.style.setProperty('--color-text-primary', themeData.textPrimary || '#2a3342');
        root.style.setProperty('--color-text-secondary', themeData.textSecondary || '#6b7280');
        root.style.setProperty('--color-text-light', themeData.textLight || '#ffffff');
    };

    return children;
}

export default ThemeProvider;
