/**
 * DADOS MOCKADOS (SIMULADOS) DA API
 * 
 * Este arquivo contém todos os dados que futuramente virão da API.
 * Quando a API estiver pronta, basta substituir as chamadas a este arquivo
 * pelas chamadas reais à API no arquivo src/services/api.js
 */

// ============================================
// CONFIGURAÇÃO DE TEMA (CORES)
// ============================================
// Estas cores serão aplicadas automaticamente no site
// Para mudar as cores, altere os valores hexadecimais abaixo
export const mockTheme = {
    // Cores principais do escritório
    primary: '#1a365d',      // Azul escuro (seriedade e confiança)
    secondary: '#c49b63',    // Dourado (sofisticação)
    accent: '#2c5282',       // Azul médio

    // Cores de fundo
    background: '#ffffff',   // Branco
    backgroundDark: '#0f1419', // Preto azulado

    // Cores de texto
    textPrimary: '#1a202c',  // Texto escuro
    textSecondary: '#4a5568', // Texto cinza
    textLight: '#ffffff',    // Texto branco

    // Cores de status
    success: '#38a169',      // Verde (sucesso)
    error: '#e53e3e',        // Vermelho (erro)
    warning: '#dd6b20'       // Laranja (aviso)
};

// ============================================
// CONTEÚDO DO SITE
// ============================================

// Informações do cabeçalho (Header)
export const mockHeader = {
    logo: {
        text: 'Miguel & Xavier',
        subtitle: 'Advocacia'
    },
    navigation: [
        { id: 'inicio', label: 'Início', href: '#hero' },
        { id: 'sobre', label: 'Sobre', href: '#about' },
        { id: 'servicos', label: 'Serviços', href: '#services' },
        { id: 'equipe', label: 'Equipe', href: '#team' },
        { id: 'contato', label: 'Contato', href: '#contact' }
    ],
    ctaButton: {
        text: 'Consulta Gratuita',
        href: '#contact'
    }
};

// Seção Hero (principal)
export const mockHero = {
    title: 'Excelência Jurídica ao Seu Alcance',
    subtitle: 'Mais de 20 anos de experiência defendendo seus direitos com seriedade e dedicação',
    description: 'Escritório de advocacia especializado em soluções jurídicas personalizadas para pessoas físicas e empresas.',
    ctaButtons: [
        { text: 'Fale com um Advogado', href: '#contact', primary: true },
        { text: 'Análise de Caso com IA', href: '#ai-chat', primary: false }
    ],
    // URL da imagem de fundo (futuramente virá da API)
    backgroundImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80'
};

// Seção Sobre
export const mockAbout = {
    title: 'Sobre o Escritório',
    subtitle: 'Tradição e Modernidade',
    description: 'O escritório Miguel & Xavier nasceu da união de dois profissionais com vasta experiência no mercado jurídico. Nossa missão é oferecer soluções jurídicas eficientes, éticas e personalizadas, sempre priorizando os interesses de nossos clientes.',
    highlights: [
        {
            id: 1,
            icon: 'Scale', // Ícone de balança (justiça)
            title: '+20 Anos',
            description: 'De experiência no mercado jurídico'
        },
        {
            id: 2,
            icon: 'Trophy', // Ícone de troféu
            title: '+500 Casos',
            description: 'Resolvidos com sucesso'
        },
        {
            id: 3,
            icon: 'Users', // Ícone de pessoas
            title: '100%',
            description: 'Comprometimento com o cliente'
        },
        {
            id: 4,
            icon: 'Sparkles', // Ícone de estrelas/tecnologia
            title: 'Tecnologia',
            description: 'IA para análise preliminar de casos'
        }
    ],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'
};

// Seção Serviços
export const mockServices = {
    title: 'Áreas de Atuação',
    subtitle: 'Soluções Jurídicas Completas',
    services: [
        {
            id: 1,
            icon: 'Briefcase', // Ícone de maleta/negócios
            title: 'Direito Empresarial',
            description: 'Consultoria jurídica para empresas, contratos, societário e recuperação judicial.',
            features: ['Contratos', 'Societário', 'Compliance', 'Recuperação Judicial']
        },
        {
            id: 2,
            icon: 'Heart', // Ícone de coração (família)
            title: 'Direito de Família',
            description: 'Divórcio, guarda, pensão alimentícia e inventário com sensibilidade e discrição.',
            features: ['Divórcio', 'Guarda', 'Pensão', 'Inventário']
        },
        {
            id: 3,
            icon: 'Building2', // Ícone de prédio
            title: 'Direito Trabalhista',
            description: 'Defesa de direitos trabalhistas e assessoria para empresas em questões trabalhistas.',
            features: ['Reclamações', 'Acordos', 'Assessoria', 'Homologações']
        },
        {
            id: 4,
            icon: 'Home', // Ícone de casa
            title: 'Direito Imobiliário',
            description: 'Compra, venda, locação e regularização de imóveis com segurança jurídica.',
            features: ['Contratos', 'Usucapião', 'Regularização', 'Despejo']
        },
        {
            id: 5,
            icon: 'Scale', // Ícone de balança
            title: 'Direito Civil',
            description: 'Ações de indenização, contratos, responsabilidade civil e direito do consumidor.',
            features: ['Indenizações', 'Contratos', 'Consumidor', 'Resp. Civil']
        },
        {
            id: 6,
            icon: 'Shield', // Ícone de escudo
            title: 'Direito Penal',
            description: 'Defesa criminal em todas as instâncias com estratégia e experiência.',
            features: ['Defesa Criminal', 'Habeas Corpus', 'Recursos', 'Júri']
        }
    ]
};

// Seção Equipe
export const mockTeam = {
    title: 'Nossa Equipe',
    subtitle: 'Profissionais Especializados',
    members: [
        {
            id: 1,
            name: 'Dr. Miguel Santos',
            role: 'Sócio Fundador',
            specialization: 'Direito Empresarial e Civil',
            oab: 'OAB/SP 123.456',
            description: 'Mais de 15 anos de experiência em direito empresarial, com especialização em contratos e recuperação judicial.',
            image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&q=80',
            social: {
                linkedin: '#',
                email: 'miguel@miguelxavier.adv.br'
            }
        },
        {
            id: 2,
            name: 'Dra. Ana Xavier',
            role: 'Sócia Fundadora',
            specialization: 'Direito de Família e Sucessões',
            oab: 'OAB/SP 234.567',
            description: 'Especialista em direito de família com mais de 12 anos de experiência, reconhecida pela sensibilidade e discrição.',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
            social: {
                linkedin: '#',
                email: 'ana@miguelxavier.adv.br'
            }
        },
        {
            id: 3,
            name: 'Dr. Carlos Mendes',
            role: 'Advogado Associado',
            specialization: 'Direito Trabalhista',
            oab: 'OAB/SP 345.678',
            description: 'Especialista em direito trabalhista com atuação tanto para empregados quanto empregadores.',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
            social: {
                linkedin: '#',
                email: 'carlos@miguelxavier.adv.br'
            }
        },
        {
            id: 4,
            name: 'Dra. Juliana Costa',
            role: 'Advogada Associada',
            specialization: 'Direito Penal',
            oab: 'OAB/SP 456.789',
            description: 'Criminalista com vasta experiência em defesas criminais e recursos em tribunais superiores.',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
            social: {
                linkedin: '#',
                email: 'juliana@miguelxavier.adv.br'
            }
        }
    ]
};

// Seção Rodapé
export const mockFooter = {
    about: {
        title: 'Miguel & Xavier',
        description: 'Escritório de advocacia comprometido com a excelência no atendimento e soluções jurídicas eficientes.'
    },
    contact: {
        title: 'Contato',
        address: 'Av. Paulista, 1000 - 10º andar\nSão Paulo - SP, 01310-100',
        phone: '(11) 3000-0000',
        email: 'contato@miguelxavier.adv.br',
        hours: 'Seg - Sex: 9h às 18h'
    },
    social: {
        title: 'Redes Sociais',
        links: [
            { platform: 'LinkedIn', url: '#', icon: 'linkedin' },
            { platform: 'Instagram', url: '#', icon: 'instagram' },
            { platform: 'Facebook', url: '#', icon: 'facebook' }
        ]
    },
    legal: {
        copyright: '© 2026 Miguel & Xavier Advocacia. Todos os direitos reservados.',
        links: [
            { text: 'Política de Privacidade', url: '#' },
            { text: 'Termos de Uso', url: '#' }
        ]
    }
};

// ============================================
// CONFIGURAÇÕES DO CHAT IA
// ============================================
export const mockAIChat = {
    title: 'Análise Preliminar com IA',
    subtitle: 'Descreva seu caso e receba uma análise inicial',
    placeholder: 'Descreva brevemente sua situação jurídica...',
    disclaimer: 'Esta é uma análise preliminar automatizada. Para uma avaliação completa, agende uma consulta com nossos advogados.',

    // Respostas simuladas da IA (futuramente será uma API real de IA)
    responses: {
        default: 'Obrigado por compartilhar sua situação. Com base nas informações fornecidas, recomendo que você agende uma consulta com nossa equipe para uma análise detalhada. Este tipo de caso geralmente requer documentação específica e uma estratégia personalizada.',
        trabalhista: 'Sua questão parece estar relacionada ao Direito Trabalhista. Nosso especialista Dr. Carlos Mendes poderá ajudá-lo. Recomendo reunir documentos como contrato de trabalho, holerites e comunicações com o empregador.',
        familia: 'Este caso parece envolver Direito de Família. A Dra. Ana Xavier é nossa especialista nesta área. Para uma consulta mais precisa, será importante trazer documentos como certidões e comprovantes relevantes.',
        empresarial: 'Questões empresariais requerem análise cuidadosa. O Dr. Miguel Santos, nosso especialista em Direito Empresarial, poderá orientá-lo melhor. Recomendo preparar contratos e documentos societários para a consulta.',
        penal: 'Casos criminais exigem atenção imediata. A Dra. Juliana Costa, nossa criminalista, está disponível para atendê-lo. É importante agendar uma consulta urgente para discutir a melhor estratégia de defesa.'
    }
};
