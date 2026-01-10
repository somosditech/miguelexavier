/**
 * SERVIÇO DE API
 * 
 * Este arquivo centraliza todas as chamadas à API Laravel.
 * API Backend: http://localhost:8000/api
 */

import axios from 'axios';
import {
    mockTheme,
    mockHeader,
    mockHero,
    mockAbout,
    mockServices,
    mockTeam,
    mockTestimonials,
    mockFooter,
    mockAIChat
} from './mockData';

// ============================================
// CONFIGURAÇÃO DO AXIOS
// ============================================

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Cache para armazenar os dados do endpoint /content
let contentCache = null;

// ============================================
// FUNÇÕES DE MAPEAMENTO (snake_case → camelCase)
// ============================================

/**
 * Mapeia dados do tema da API para o formato do frontend
 */
const mapTheme = (apiTheme) => {
    if (!apiTheme) return mockTheme;

    return {
        primary: apiTheme.primary_color || mockTheme.primary,
        secondary: apiTheme.secondary_color || mockTheme.secondary,
        accent: apiTheme.accent_color || mockTheme.accent,
        background: apiTheme.background_color || mockTheme.background,
        backgroundDark: apiTheme.background_dark || mockTheme.backgroundDark,
        backgroundLight: apiTheme.background_light || mockTheme.backgroundLight,
        textPrimary: apiTheme.text_primary || mockTheme.textPrimary,
        textSecondary: apiTheme.text_secondary || mockTheme.textSecondary,
        textLight: apiTheme.text_light || mockTheme.textLight,
        // Mantém cores extras do mock
        ...mockTheme
    };
};

/**
 * Mapeia dados do hero da API para o formato do frontend
 */
const mapHero = (apiHero) => {
    if (!apiHero) return mockHero;

    return {
        title: apiHero.title || mockHero.title,
        subtitle: apiHero.subtitle || mockHero.subtitle,
        description: apiHero.description || mockHero.description,
        backgroundImage: apiHero.background_image_url || mockHero.backgroundImage,
        ctaButtons: [
            {
                text: apiHero.cta_button_text || 'Fale com um Advogado',
                href: apiHero.cta_button_href || '#contact',
                primary: true
            }
        ]
    };
};

/**
 * Mapeia dados do about da API para o formato do frontend
 */
const mapAbout = (apiAbout) => {
    if (!apiAbout) return mockAbout;

    return {
        title: apiAbout.title || mockAbout.title,
        subtitle: apiAbout.subtitle || mockAbout.subtitle,
        description: apiAbout.description || mockAbout.description,
        imageUrl: apiAbout.image_url || mockAbout.imageUrl,
        highlights: mockAbout.highlights // Mantém do mock
    };
};

/**
 * Mapeia dados dos serviços da API para o formato do frontend
 */
const mapServices = (apiServices) => {
    if (!apiServices || !Array.isArray(apiServices)) return mockServices;

    return {
        title: 'Áreas de Atuação',
        subtitle: 'Soluções Jurídicas Completas',
        services: apiServices.map(service => ({
            id: service.id,
            icon: service.icon,
            title: service.title,
            description: service.description,
            features: service.features || []
        }))
    };
};

/**
 * Mapeia dados da equipe da API para o formato do frontend
 */
const mapTeam = (apiTeam) => {
    if (!apiTeam || !Array.isArray(apiTeam)) return mockTeam;

    return {
        title: 'Nossa Equipe',
        subtitle: 'Profissionais Experientes',
        members: apiTeam.map(member => ({
            id: member.id,
            name: member.name,
            role: member.role,
            specialization: member.specialization,
            oab: member.oab,
            description: member.description,
            image: member.image_url,
            social: {
                linkedin: member.linkedin_url,
                email: member.email
            }
        }))
    };
};

/**
 * Mapeia dados dos depoimentos da API para o formato do frontend
 */
const mapTestimonials = (apiTestimonials) => {
    if (!apiTestimonials || !Array.isArray(apiTestimonials)) return mockTestimonials;

    return {
        title: 'O Que Nossos Clientes Dizem',
        subtitle: 'Depoimentos',
        testimonials: apiTestimonials.map(testimonial => ({
            id: testimonial.id,
            name: testimonial.name,
            role: testimonial.role,
            text: testimonial.text
        }))
    };
};

/**
 * Mapeia dados do footer da API para o formato do frontend
 */
const mapFooter = (apiFooter) => {
    if (!apiFooter) return mockFooter;

    return {
        about: {
            title: apiFooter.about_title || mockFooter.about.title,
            description: apiFooter.about_description || mockFooter.about.description
        },
        contact: {
            title: apiFooter.contact_title || mockFooter.contact.title,
            address: apiFooter.contact_address || mockFooter.contact.address,
            phone: apiFooter.contact_phone || mockFooter.contact.phone,
            email: apiFooter.contact_email || mockFooter.contact.email,
            hours: apiFooter.contact_hours || mockFooter.contact.hours
        },
        socialLinks: apiFooter.social_links || mockFooter.socialLinks,
        legalLinks: apiFooter.legal_links || mockFooter.legalLinks,
        copyright: apiFooter.copyright_text || mockFooter.copyright
    };
};

// ============================================
// FUNÇÃO PARA BUSCAR DADOS
// ============================================

/**
 * Função para buscar todo o conteúdo de uma vez
 */
const fetchAllContent = async () => {
    if (contentCache) {
        return contentCache;
    }

    try {
        const response = await api.get('/content');
        // Laravel retorna: { success: true, data: { hero: {}, services: [], ... } }
        // Axios já extrai response.data, então temos: { success: true, data: {...} }
        const apiData = response.data;
        const rawContent = apiData.data || apiData;

        // Mapeia todos os dados para o formato esperado pelo frontend
        contentCache = {
            theme: mapTheme(rawContent.theme),
            hero: mapHero(rawContent.hero),
            about: mapAbout(rawContent.about),
            services: mapServices(rawContent.services),
            team: mapTeam(rawContent.team),
            testimonials: mapTestimonials(rawContent.testimonials),
            footer: mapFooter(rawContent.footer)
        };

        return contentCache;
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

export const fetchTestimonials = async () => {
    try {
        const content = await fetchAllContent();
        return content?.testimonials || mockTestimonials;
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        return mockTestimonials;
    }
};

export const fetchFooter = async () => {
    try {
        const content = await fetchAllContent();
        return content?.footer || mockFooter;
    } catch (error) {
        console.error('Error fetching footer:', error);
        return mockFooter;
    }
};

export const fetchAIChat = async () => {
    try {
        return mockAIChat;
    } catch (error) {
        console.error('Error fetching AI chat:', error);
        return mockAIChat;
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
    fetchTestimonials,
    fetchFooter,
    fetchAIChat,
    submitContactForm
};
