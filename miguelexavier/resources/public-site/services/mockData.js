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
    // Cores principais do escritório - Paleta Miguel & Xavier (REFINADA)
    primary: '#771220',      // Vermelho vinho (destaques)
    secondary: '#cfa750',    // Dourado claro
    accent: '#e6b84d',       // Dourado brilhante

    // Tons de dourado adicionais
    gold1: '#997114',
    gold2: '#cfa750',
    gold3: '#a1791d',
    gold4: '#caa24a',
    gold5: '#a88025',
    gold6: '#e6b84d',

    // Cores de fundo
    background: '#f5f1eb',      // Bege claro (fundo principal)
    backgroundDark: '#771220',  // Vermelho vinho (seções escuras)
    backgroundLight: '#faf8f5', // Creme muito claro
    backgroundCard: '#ffffff',  // Branco para cards

    // Cores de texto
    textPrimary: '#2d2416',     // Marrom escuro (texto principal)
    textSecondary: '#5a4a35',   // Marrom médio (texto secundário)
    textDark: '#1a1410',        // Marrom muito escuro
    textLight: '#ffffff',       // Branco

    // Cores de status
    success: '#38a169',      // Verde (sucesso)
    error: '#ff6b6b',        // Vermelho claro (erro)
    warning: '#e6b84d'       // Dourado (aviso)
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
        { id: 'servicos', label: 'Serviços', href: '#services' },
        { id: 'sobre', label: 'Sobre', href: '#about' },
        { id: 'equipe', label: 'Equipe', href: '#team' },
        { id: 'contato', label: 'Contato', href: '#contact' }
    ],
    ctaButton: {
        text: 'Fale com um Advogado',
        href: '#contact'
    }
};

// Seção Hero (principal)
export const mockHero = {
    title: 'Excelência Jurídica ao Seu Alcance',
    subtitle: 'Mais de 20 anos de experiência defendendo seus direitos com seriedade e dedicação',
    description: 'Escritório de advocacia especializado em soluções jurídicas personalizadas para pessoas físicas e empresas.',
    ctaButtons: [
        { text: 'Fale com um Advogado', href: '#contact', primary: true }
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
            name: 'Dr. David Miguel',
            role: 'Sócio Fundador',
            specialization: 'Direito Empresarial e Civil',
            oab: 'OAB/SP 123.456',
            description: 'Mais de 10 anos de experiência em direito empresarial, com especialização em contratos e recuperação judicial.',
            image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&q=80',
            social: {
                lattes: '#',
                email: 'miguel@miguelxavier.adv.br'
            }
        },
        {
            id: 2,
            name: 'Dra. Ariane Xavier',
            role: 'Sócia Fundadora',
            specialization: 'Direito de Família e Sucessões',
            oab: 'OAB/SP 234.567',
            description: 'Especialista em direito de família com mais de 12 anos de experiência, reconhecida pela sensibilidade e discrição.',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
            social: {
                lattes: '#',
                email: 'ariane@miguelxavier.adv.br'
            }
        }
    ]
};

// Seção Depoimentos
// export const mockTestimonials = {
//     title: 'O Que Nossos Clientes Dizem',
//     subtitle: 'Depoimentos',
//     testimonials: [
//         {
//             id: 1,
//             text: 'Excelente atendimento! O Dr. Miguel conduziu meu caso empresarial com muita competência e profissionalismo. Conseguimos um acordo muito favorável.',
//             name: 'Carlos Eduardo Silva',
//             role: 'Empresário',
//         },
//         {
//             id: 2,
//             text: 'A Dra. Ariane foi fundamental no meu processo de divórcio. Sua sensibilidade e experiência tornaram um momento difícil muito mais tranquilo. Recomendo!',
//             name: 'Marina Santos',
//             role: 'Arquiteta',
//         },
//         {
//             id: 3,
//             text: 'Profissionais extremamente competentes e atenciosos. Resolveram minha questão trabalhista de forma rápida e eficiente. Muito satisfeito com o resultado!',
//             name: 'Roberto Oliveira',
//             role: 'Engenheiro',
//         },
//         {
//             id: 4,
//             text: 'O escritório Miguel & Xavier superou minhas expectativas. A análise preliminar com IA foi muito útil e a consulta presencial foi excelente.',
//             name: 'Juliana Costa',
//             role: 'Médica',
//         }
//     ]
// };

// Áreas de interesse para o formulário de contato
export const mockAreasDeInteresse = [
    { id: 'empresarial', label: 'Direito Empresarial' },
    { id: 'familia', label: 'Direito de Família' },
    { id: 'trabalhista', label: 'Direito Trabalhista' },
    { id: 'imobiliario', label: 'Direito Imobiliário' },
    { id: 'civil', label: 'Direito Civil' },
    { id: 'penal', label: 'Direito Penal' },
    { id: 'outro', label: 'Outro assunto' }
];

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
            { platform: 'Lattes', url: '#', icon: 'lattes' },
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

// Seção WhatsApp
export const mockWhatsapp = {
    phone: '554184737511',
    message: 'Olá! Gostaria de agendar uma consulta jurídica.'
};