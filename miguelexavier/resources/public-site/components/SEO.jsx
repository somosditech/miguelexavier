/**
 * COMPONENTE: SEO
 * 
 * Componente para gerenciar meta tags e SEO.
 * Usa react-helmet-async para manipular o <head>.
 * 
 * @param {string} title - Título da página
 * @param {string} description - Descrição da página
 * @param {string} keywords - Palavras-chave
 * @param {string} image - URL da imagem para Open Graph
 * @param {string} url - URL canônica da página
 */

import { Helmet } from 'react-helmet-async';
import { useContent } from '../hooks/useContent';

function SEO({
    title = 'Miguel & Xavier Advocacia - Excelência Jurídica',
    description = 'Escritório de advocacia com mais de 20 anos de experiência. Especialistas em Direito Empresarial, Família, Trabalhista, Imobiliário, Civil e Penal.',
    keywords = 'advocacia, advogados, direito, consultoria jurídica, Miguel e Xavier, David Miguel, Ariane Xavier, processos jurídicos, direito trabalhista, direito previdenciário, direito do consumidor, direito de família, direito criminal, direito tributário, direito administrativo, direito empresarial, direito ambiental, direito imobiliário, direito internacional, direito digital, direito eleitoral, direito desportivo, direito do idoso, direito da criança e do adolescente, direito do trabalho, direito previdenciário, direito do consumidor, direito de família, direito criminal, direito tributário, direito administrativo, direito empresarial, direito ambiental, direito imobiliário, direito internacional, direito digital, direito eleitoral, direito desportivo, direito do idoso, direito da criança e do adolescente',
    image = 'https://miguelexavier.adv.br/og-image.jpg',
    url = 'https://miguelexavier.adv.br',
    type = 'website'
}) {
    const siteName = 'Miguel & Xavier Advocacia';
    const { content: hero } = useContent('hero');

    // Define a imagem para compartilhamento:
    // 1. Usa a imagem passada como prop (se houver)
    // 2. Usa a imagem de fundo do Hero
    // 3. Fallback para og-image.jpg
    const ogImage = image ||
        (hero?.backgroundImage ? hero.backgroundImage : `${url}/og-image.jpg`);

    return (
        <Helmet>
            {/* Meta Tags Básicas */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Canonical URL */}
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:locale" content="pt_BR" />

            {/* Outras Meta Tags */}
            <meta name="robots" content="index, follow" />
            <meta name="language" content="Portuguese" />
            <meta name="author" content="Miguel & Xavier Advocacia" />

            {/* Geo Tags */}
            <meta name="geo.region" content="BR-SP" />
            <meta name="geo.placename" content="São Paulo" />

            {/* Mobile */}
            <meta name="theme-color" content="#771220" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        </Helmet>
    );
}

export default SEO;