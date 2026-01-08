/**
 * SERVIÇO DE API
 * 
 * Este arquivo centraliza todas as chamadas à API.
 * Por enquanto, retorna dados mockados (simulados).
 * Quando a API estiver pronta, basta substituir as funções abaixo
 * por chamadas reais usando axios.
 */

import axios from 'axios';
import {
    mockTheme,
    mockHeader,
    mockHero,
    mockAbout,
    mockServices,
    mockTeam,
    mockFooter,
    mockAIChat
} from './mockData';

// ============================================
// CONFIGURAÇÃO DO AXIOS
// ============================================
// Quando a API estiver pronta, descomente e configure a URL base
/*
const api = axios.create({
  baseURL: 'https://sua-api.com/api', // URL da sua API
  timeout: 10000, // Timeout de 10 segundos
  headers: {
    'Content-Type': 'application/json'
  }
});
*/

// ============================================
// FUNÇÕES PARA BUSCAR DADOS
// ============================================

/**
 * Busca as configurações de tema (cores)
 * Futuramente: GET /api/theme
 */
export const fetchTheme = async () => {
    try {
        // VERSÃO MOCKADA (atual)
        return new Promise((resolve) => {
            setTimeout(() => resolve(mockTheme), 500); // Simula delay de rede
        });

        // VERSÃO REAL (quando a API estiver pronta, descomente abaixo)
        // const response = await api.get('/theme');
        // return response.data;
    } catch (error) {
        console.error('Erro ao buscar tema:', error);
        return mockTheme; // Retorna dados mockados em caso de erro
    }
};

/**
 * Busca o conteúdo do cabeçalho
 * Futuramente: GET /api/content/header
 */
export const fetchHeader = async () => {
    try {
        return new Promise((resolve) => {
            setTimeout(() => resolve(mockHeader), 500);
        });

        // VERSÃO REAL:
        // const response = await api.get('/content/header');
        // return response.data;
    } catch (error) {
        console.error('Erro ao buscar header:', error);
        return mockHeader;
    }
};

/**
 * Busca o conteúdo da seção Hero
 * Futuramente: GET /api/content/hero
 */
export const fetchHero = async () => {
    try {
        return new Promise((resolve) => {
            setTimeout(() => resolve(mockHero), 500);
        });

        // VERSÃO REAL:
        // const response = await api.get('/content/hero');
        // return response.data;
    } catch (error) {
        console.error('Erro ao buscar hero:', error);
        return mockHero;
    }
};

/**
 * Busca o conteúdo da seção Sobre
 * Futuramente: GET /api/content/about
 */
export const fetchAbout = async () => {
    try {
        return new Promise((resolve) => {
            setTimeout(() => resolve(mockAbout), 500);
        });

        // VERSÃO REAL:
        // const response = await api.get('/content/about');
        // return response.data;
    } catch (error) {
        console.error('Erro ao buscar about:', error);
        return mockAbout;
    }
};

/**
 * Busca o conteúdo da seção Serviços
 * Futuramente: GET /api/content/services
 */
export const fetchServices = async () => {
    try {
        return new Promise((resolve) => {
            setTimeout(() => resolve(mockServices), 500);
        });

        // VERSÃO REAL:
        // const response = await api.get('/content/services');
        // return response.data;
    } catch (error) {
        console.error('Erro ao buscar services:', error);
        return mockServices;
    }
};

/**
 * Busca o conteúdo da seção Equipe
 * Futuramente: GET /api/content/team
 */
export const fetchTeam = async () => {
    try {
        return new Promise((resolve) => {
            setTimeout(() => resolve(mockTeam), 500);
        });

        // VERSÃO REAL:
        // const response = await api.get('/content/team');
        // return response.data;
    } catch (error) {
        console.error('Erro ao buscar team:', error);
        return mockTeam;
    }
};

/**
 * Busca o conteúdo do rodapé
 * Futuramente: GET /api/content/footer
 */
export const fetchFooter = async () => {
    try {
        return new Promise((resolve) => {
            setTimeout(() => resolve(mockFooter), 500);
        });

        // VERSÃO REAL:
        // const response = await api.get('/content/footer');
        // return response.data;
    } catch (error) {
        console.error('Erro ao buscar footer:', error);
        return mockFooter;
    }
};

/**
 * Busca configurações do chat IA
 * Futuramente: GET /api/ai/config
 */
export const fetchAIChatConfig = async () => {
    try {
        return new Promise((resolve) => {
            setTimeout(() => resolve(mockAIChat), 500);
        });

        // VERSÃO REAL:
        // const response = await api.get('/ai/config');
        // return response.data;
    } catch (error) {
        console.error('Erro ao buscar AI config:', error);
        return mockAIChat;
    }
};

// ============================================
// FUNÇÕES PARA ENVIAR DADOS
// ============================================

/**
 * Envia o formulário de contato
 * Futuramente: POST /api/contact
 * 
 * @param {Object} formData - Dados do formulário
 * @param {string} formData.name - Nome do cliente
 * @param {string} formData.email - Email do cliente
 * @param {string} formData.phone - Telefone do cliente
 * @param {string} formData.subject - Assunto
 * @param {string} formData.message - Mensagem
 */
export const sendContactForm = async (formData) => {
    try {
        // VERSÃO MOCKADA (atual)
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Formulário enviado:', formData);
                resolve({ success: true, message: 'Mensagem enviada com sucesso!' });
            }, 1000);
        });

        // VERSÃO REAL:
        // const response = await api.post('/contact', formData);
        // return response.data;
    } catch (error) {
        console.error('Erro ao enviar formulário:', error);
        throw new Error('Erro ao enviar mensagem. Tente novamente.');
    }
};

/**
 * Envia mensagem para o chat IA
 * Futuramente: POST /api/ai/analyze
 * 
 * @param {string} message - Mensagem do usuário descrevendo o caso
 */
export const sendAIMessage = async (message) => {
    try {
        // VERSÃO MOCKADA (atual) - Simula resposta da IA
        return new Promise((resolve) => {
            setTimeout(() => {
                // Lógica simples para simular diferentes respostas
                let response = mockAIChat.responses.default;

                const messageLower = message.toLowerCase();
                if (messageLower.includes('trabalh') || messageLower.includes('demiti') || messageLower.includes('rescis')) {
                    response = mockAIChat.responses.trabalhista;
                } else if (messageLower.includes('divórcio') || messageLower.includes('pensão') || messageLower.includes('guarda')) {
                    response = mockAIChat.responses.familia;
                } else if (messageLower.includes('empresa') || messageLower.includes('contrato') || messageLower.includes('societário')) {
                    response = mockAIChat.responses.empresarial;
                } else if (messageLower.includes('criminal') || messageLower.includes('penal') || messageLower.includes('processo')) {
                    response = mockAIChat.responses.penal;
                }

                resolve({ response, timestamp: new Date().toISOString() });
            }, 1500); // Simula processamento da IA
        });

        // VERSÃO REAL:
        // const response = await api.post('/ai/analyze', { message });
        // return response.data;
    } catch (error) {
        console.error('Erro ao enviar mensagem para IA:', error);
        throw new Error('Erro ao processar sua mensagem. Tente novamente.');
    }
};
