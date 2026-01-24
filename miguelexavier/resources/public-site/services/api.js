/**
 * SERVIÇO DE API
 * 
 * Este arquivo centraliza todas as chamadas à API Laravel.
 * API Backend: https://miguelexavier-api.onrender.com/api
 */

import axios from 'axios';
import {
    mockTheme,
    mockHeader,
    mockHero,
    mockAbout,
    mockServices,
    mockTeam,
    // mockTestimonials,
    mockFooter,
    mockWhatsapp
} from './mockData';

// ============================================
// CONFIGURAÇÃO DO AXIOS
// ============================================

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://miguelexavier-api.onrender.com/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Cache para armazenar os dados do endpoint /content
let contentCache = null;

// ============================================
// FUNÇÃO PARA BUSCAR DADOS
// ============================================

/**
 * Função para buscar todo o conteúdo de uma vez
 * A API já retorna os dados em camelCase, não precisa mapear
 */
const fetchAllContent = async () => {
    if (contentCache) {
        return contentCache;
    }

    try {
        const response = await api.get('/content');
        // Laravel retorna: { success: true, data: { theme: {}, hero: {}, services: [], ... } }
        const apiData = response.data;

        if (apiData.success && apiData.data) {
            // A API já retorna em camelCase, usa direto com fallback para mock
            contentCache = {
                theme: apiData.data.theme || mockTheme,
                hero: apiData.data.hero || mockHero,
                about: {
                    ...apiData.data.about,
                    highlights: mockAbout.highlights // Highlights ainda vem do mock
                },
                services: apiData.data.services || mockServices,
                team: apiData.data.team || mockTeam,
                testimonials: apiData.data.testimonials || mockTestimonials,
                footer: apiData.data.footer || mockFooter,
                whatsapp: apiData.data.whatsapp || mockWhatsapp
            };

            return contentCache;
        }

        return null;
    } catch (error) {
        console.error('Error fetching content:', error);
        return null;
    }
};

// ============================================
// FUNÇÕES PARA BUSCAR DADOS INDIVIDUAIS
// ============================================

export const fetchTheme = async () => {
    try {
        const content = await fetchAllContent();
        return content?.theme || mockTheme;
    } catch (error) {
        console.error('Error fetching theme:', error);
        return mockTheme;
    }
};

export const fetchHeader = async () => {
    try {
        return mockHeader; // Header ainda usa mock
    } catch (error) {
        console.error('Error fetching header:', error);
        return mockHeader;
    }
};

export const fetchHero = async () => {
    try {
        const content = await fetchAllContent();
        return content?.hero || mockHero;
    } catch (error) {
        console.error('Error fetching hero:', error);
        return mockHero;
    }
};

export const fetchAbout = async () => {
    try {
        const content = await fetchAllContent();
        return content?.about || mockAbout;
    } catch (error) {
        console.error('Error fetching about:', error);
        return mockAbout;
    }
};

export const fetchServices = async () => {
    try {
        const content = await fetchAllContent();
        return content?.services || mockServices;
    } catch (error) {
        console.error('Error fetching services:', error);
        return mockServices;
    }
};

export const fetchTeam = async () => {
    try {
        const content = await fetchAllContent();
        return content?.team || mockTeam;
    } catch (error) {
        console.error('Error fetching team:', error);
        return mockTeam;
    }
};

export const fetchWhatsapp = async () => {
    try {
        const content = await fetchAllContent();
        return content?.whatsapp || mockWhatsapp;
    } catch (error) {
        console.error('Error fetching whatsapp:', error);
        return mockWhatsapp;
    }
};

// export const fetchTestimonials = async () => {
//     try {
//         const content = await fetchAllContent();
//         return content?.testimonials || mockTestimonials;
//     } catch (error) {
//         console.error('Error fetching testimonials:', error);
//         return mockTestimonials;
//     }
// };

export const fetchFooter = async () => {
    try {
        const content = await fetchAllContent();
        return content?.footer || mockFooter;
    } catch (error) {
        console.error('Error fetching footer:', error);
        return mockFooter;
    }
};

// ============================================
// FUNÇÕES PARA ENVIAR DADOS
// ============================================

export const submitContactForm = async (formData) => {
    try {
        const response = await api.post('/contact', formData);
        return response.data;
    } catch (error) {
        console.error('Error submitting contact form:', error);
        throw error;
    }
};

// ============================================
// EXPORTAÇÃO DEFAULT
// ============================================

export default {
    fetchTheme,
    fetchHeader,
    fetchHero,
    fetchAbout,
    fetchServices,
    fetchTeam,
    // fetchTestimonials,
    fetchFooter,
    submitContactForm,
    fetchWhatsapp
};
