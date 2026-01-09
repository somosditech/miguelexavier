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

function SEO({
    title = 'Miguel & Xavier Advocacia - Excelência Jurídica',
    description = 'Escritório de advocacia com mais de 20 anos de experiência. Especialistas em Direito Empresarial, Família, Trabalhista, Imobiliário, Civil e Penal.',
    keywords = 'advocacia, advogado, direito empresarial, direito de família, direito trabalhista, escritório de advocacia, advogado sp, consultoria jurídica',
    image = 'https://miguelexavier.vercel.app/og-image.jpg',
    url = 'https://miguelexavier.vercel.app',
    type = 'website'
}) {
    const siteName = 'Miguel & Xavier Advocacia';
    const twitterHandle = '@miguelxavier'; // Atualizar com handle real

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
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:locale" content="pt_BR" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:site" content={twitterHandle} />
            <meta name="twitter:creator" content={twitterHandle} />

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
