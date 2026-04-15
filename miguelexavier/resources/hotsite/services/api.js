/**
 * SERVIÇO DE API — HOTSITE
 *
 * Busca a lista de links do backend via `GET /api/hotsite-links`.
 *
 * REGRAS:
 * - O link do "Site Oficial" é FIXO e hardcoded no front — nunca depende da API.
 * - Os demais links são OPCIONAIS: só aparecem se tiverem url preenchida e is_active = true.
 */

// Em dev o Vite faz proxy de /api → localhost:8000.
// Em produção o Laravel serve tudo no mesmo domínio, então /api já aponta certo.
// Aponta para o domínio principal onde o banco de dados (Laravel) reside
const API_URL = import.meta.env.VITE_API_URL || 'https://miguelexavier.adv.br/api';

// ============================================
// LINK FIXO — Site Oficial (nunca some)
// ============================================

export const FIXED_SITE_LINK = {
    id: 'site-fixo',
    label: 'Site Oficial',
    url: 'https://miguelexavier.adv.br',
    icon: 'site',
    description: 'Conheça nosso escritório e serviços',
    is_active: true,
    order: 0,
    is_fixed: true,
};

// ============================================
// METADADOS LOCAIS por label
// (icon e description não vêm da API)
// ============================================

const LINK_META = {
    'WhatsApp':  { icon: 'whatsapp', description: 'Fale diretamente com nossa equipe' },
    'Instagram': { icon: 'instagram', description: 'Acompanhe nossas publicações' },
    'Lattes':    { icon: 'lattes',    description: 'Formação acadêmica e produção científica' },
    'E-mail':    { icon: 'email',     description: 'Envie sua mensagem por e-mail' },
};

// ============================================
// FUNÇÕES DE FETCH
// ============================================

/**
 * Retorna os links opcionais vindos da API.
 * O link fixo do site NÃO é incluído aqui — é injetado pelo App.
 * Filtra: apenas links com url preenchida e is_active = true.
 */
export const fetchLinks = async () => {
    const response = await fetch(`${API_URL}/content/hotsite-links`);
    if (!response.ok) throw new Error(`Erro na API: ${response.status}`);
    const data = await response.json();
    if (!data.success || !Array.isArray(data.data)) {
        throw new Error('Formato de resposta inválido');
    }
    // Mescla metadados locais (icon, description) com dados da API
    return data.data.map(link => ({
        ...link,
        ...(LINK_META[link.label] || { icon: 'default', description: '' }),
    }));
};

export const fetchProfile = async () => {
    const response = await fetch(`${API_URL}/content/theme`);
    if (!response.ok) throw new Error(`Erro na API: ${response.status}`);
    const data = await response.json();
    if (!data.success || !data.data) {
        throw new Error('Formato de resposta inválido');
    }
    return {
        logoUrl: data.data.logoUrl || null,
        name: 'Miguel & Xavier',
        subtitle: 'Advocacia',
        tagline: 'Comprometidos com a excelência jurídica e a defesa dos seus direitos.',
    };
};

/**
 * Busca configurações do WhatsApp e retorna um link formatado para o hotsite.
 * Retorna null se não houver número cadastrado.
 */
export const fetchWhatsApp = async () => {
    const response = await fetch(`${API_URL}/content/whatsapp`);
    if (!response.ok) return null;
    const data = await response.json();
    const wa = data?.data;
    if (!wa?.phoneNumber) return null;

    // Monta URL wa.me com mensagem pré-definida (se houver)
    const encoded = wa.predefinedMessage
        ? `?text=${encodeURIComponent(wa.predefinedMessage)}`
        : '';

    return {
        id: 'whatsapp-fixo',
        label: 'WhatsApp',
        url: `https://wa.me/${wa.phoneNumber}${encoded}`,
        ...LINK_META['WhatsApp'],
        order: 1,
    };
};

