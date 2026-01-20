/**
 * SERVIÇO DE API ADMIN
 * 
 * Gerencia todas as chamadas à API admin protegidas por JWT
 */

import axios from 'axios';

// Configuração do axios para admin
const adminApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para adicionar token em todas as requisições
adminApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('admin_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para tratar erros de autenticação
adminApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token inválido ou expirado
            localStorage.removeItem('admin_token');
            localStorage.removeItem('admin_user');
            window.location.href = '/p_admin/login';
        }
        return Promise.reject(error);
    }
);

// ============================================
// AUTENTICAÇÃO
// ============================================

export const login = async (email, password) => {
    const response = await adminApi.post('/auth/login', { email, password });
    return response.data;
};

export const logout = async () => {
    try {
        await adminApi.post('/auth/logout');
    } finally {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
    }
};

export const getMe = async () => {
    const response = await adminApi.get('/auth/me');
    return response.data;
};

// ============================================
// RECUPERAÇÃO DE SENHA
// ============================================

export const sendPasswordResetLink = async (email) => {
    const response = await adminApi.post('/auth/password/email', { email });
    return response.data;
};

export const resetPassword = async (token, email, password, password_confirmation) => {
    const response = await adminApi.post('/auth/password/reset', {
        token,
        email,
        password,
        password_confirmation
    });
    return response.data;
};

// ============================================
// THEME
// ============================================

export const getTheme = async () => {
    const response = await adminApi.get('/admin/theme');
    return response.data.data;
};

export const updateTheme = async (data) => {
    const response = await adminApi.put('/admin/theme', data);
    return response.data;
};

// ============================================
// HERO
// ============================================

export const getHero = async () => {
    const response = await adminApi.get('/admin/hero');
    return response.data.data;
};

export const updateHero = async (data) => {
    const response = await adminApi.put('/admin/hero', data);
    return response.data;
};

// ============================================
// ABOUT
// ============================================

export const getAbout = async () => {
    const response = await adminApi.get('/admin/about');
    return response.data.data;
};

export const updateAbout = async (data) => {
    const response = await adminApi.put('/admin/about', data);
    return response.data;
};

// ============================================
// SERVICES
// ============================================

export const getServices = async () => {
    const response = await adminApi.get('/admin/services');
    return response.data.data;
};

export const getService = async (id) => {
    const response = await adminApi.get(`/admin/services/${id}`);
    return response.data.data;
};

export const createService = async (data) => {
    const response = await adminApi.post('/admin/services', data);
    return response.data;
};

export const updateService = async (id, data) => {
    const response = await adminApi.put(`/admin/services/${id}`, data);
    return response.data;
};

export const deleteService = async (id) => {
    const response = await adminApi.delete(`/admin/services/${id}`);
    return response.data;
};

// ============================================
// TEAM
// ============================================

export const getTeamMembers = async () => {
    const response = await adminApi.get('/admin/team');
    return response.data.data;
};

export const getTeamMember = async (id) => {
    const response = await adminApi.get(`/admin/team/${id}`);
    return response.data.data;
};

export const createTeamMember = async (data) => {
    const response = await adminApi.post('/admin/team', data);
    return response.data;
};

export const updateTeamMember = async (id, data) => {
    const response = await adminApi.put(`/admin/team/${id}`, data);
    return response.data;
};

export const deleteTeamMember = async (id) => {
    const response = await adminApi.delete(`/admin/team/${id}`);
    return response.data;
};

// ============================================
// TESTIMONIALS
// ============================================

export const getTestimonials = async () => {
    const response = await adminApi.get('/admin/testimonials');
    return response.data.data;
};

export const getTestimonial = async (id) => {
    const response = await adminApi.get(`/admin/testimonials/${id}`);
    return response.data.data;
};

export const createTestimonial = async (data) => {
    const response = await adminApi.post('/admin/testimonials', data);
    return response.data;
};

export const updateTestimonial = async (id, data) => {
    const response = await adminApi.put(`/admin/testimonials/${id}`, data);
    return response.data;
};

export const deleteTestimonial = async (id) => {
    const response = await adminApi.delete(`/admin/testimonials/${id}`);
    return response.data;
};

// ============================================
// FOOTER
// ============================================

export const getFooter = async () => {
    const response = await adminApi.get('/admin/footer');
    return response.data.data;
};

export const updateFooter = async (data) => {
    const response = await adminApi.put('/admin/footer', data);
    return response.data;
};

// ============================================
// CONTACT MESSAGES
// ============================================

export const getContactMessages = async () => {
    const response = await adminApi.get('/admin/contact-messages');
    return response.data.data;
};

export const getContactMessage = async (id) => {
    const response = await adminApi.get(`/admin/contact-messages/${id}`);
    return response.data.data;
};

export const deleteMessage = async (id) => {
    const response = await adminApi.delete(`/admin/contact-messages/${id}`);
    return response.data;
};

export const markMessageAsRead = async (id) => {
    const response = await adminApi.put(`/admin/contact-messages/${id}/mark-read`);
    return response.data;
};

export const getUnreadMessagesCount = async () => {
    const response = await adminApi.get('/admin/contact-messages/count-unread');
    return response.data.data;
};

export const getMessagesStats = async () => {
    const response = await adminApi.get('/admin/contact-messages/stats');
    return response.data.data;
};

// ============================================
// DASHBOARD
// ============================================

export const getDashboardStats = async () => {
    const response = await adminApi.get('/admin/dashboard/stats');
    return response.data;
};

// ============================================
// PROFILE MANAGEMENT
// ============================================

export const getProfile = async () => {
    const response = await adminApi.get('/admin/profile');
    return response.data.data;
};

export const updateProfile = async (data) => {
    const response = await adminApi.put('/admin/profile', data);
    return response.data;
};

export const uploadProfilePhoto = async (file) => {
    const formData = new FormData();
    formData.append('photo', file);

    const response = await adminApi.post('/admin/profile/upload-photo', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const verifyAndUpdateProfile = async (data) => {
    const response = await adminApi.post('/admin/profile/verify-update', data);
    return response.data;
};

export default adminApi;


