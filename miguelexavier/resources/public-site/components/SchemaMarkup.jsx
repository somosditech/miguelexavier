/**
 * COMPONENTE: SchemaMarkup
 * 
 * Componente para adicionar Schema.org structured data.
 * Melhora SEO e permite rich snippets nos resultados de busca.
 */

import { Helmet } from 'react-helmet-async';

function SchemaMarkup() {
    // Schema para LegalService (Escritório de Advocacia)
    const legalServiceSchema = {
        "@context": "https://schema.org",
        "@type": "LegalService",
        "name": "Miguel & Xavier Advocacia",
        "description": "Escritório de advocacia com mais de 20 anos de experiência em diversas áreas do direito.",
        "url": "https://miguelexavier.vercel.app",
        "logo": "https://miguelexavier.vercel.app/logo.png",
        "image": "https://miguelexavier.vercel.app/og-image.jpg",
        "telephone": "+55-11-3000-0000",
        "email": "contato@miguelexavier.adv.br",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Av. Paulista, 1000 - 10º andar",
            "addressLocality": "São Paulo",
            "addressRegion": "SP",
            "postalCode": "01310-100",
            "addressCountry": "BR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "-23.5505",
            "longitude": "-46.6333"
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
        },
        "priceRange": "$$",
        "areaServed": {
            "@type": "State",
            "name": "São Paulo"
        },
        "serviceType": [
            "Direito Empresarial",
            "Direito de Família",
            "Direito Trabalhista",
            "Direito Imobiliário",
            "Direito Civil",
            "Direito Penal"
        ]
    };

    // Schema para Organization
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Miguel & Xavier Advocacia",
        "url": "https://miguelexavier.vercel.app",
        "logo": "https://miguelexavier.vercel.app/logo.png",
        "sameAs": [
            "https://www.linkedin.com/company/miguelxavier",
            "https://www.instagram.com/miguelxavier",
            "https://www.facebook.com/miguelxavier"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+55-11-3000-0000",
            "contactType": "customer service",
            "email": "contato@miguelexavier.adv.br",
            "areaServed": "BR",
            "availableLanguage": ["Portuguese"]
        }
    };

    // Schema para Attorneys (Advogados)
    const attorneysSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": [
            {
                "@type": "Attorney",
                "name": "Dr. David Miguel",
                "jobTitle": "Sócio Fundador",
                "worksFor": {
                    "@type": "LegalService",
                    "name": "Miguel & Xavier Advocacia"
                },
                "knowsAbout": ["Direito Empresarial", "Direito Civil"],
                "alumniOf": "Faculdade de Direito",
                "email": "miguel@miguelexavier.adv.br"
            },
            {
                "@type": "Attorney",
                "name": "Dra. Ariane Xavier",
                "jobTitle": "Sócia Fundadora",
                "worksFor": {
                    "@type": "LegalService",
                    "name": "Miguel & Xavier Advocacia"
                },
                "knowsAbout": ["Direito de Família", "Sucessões"],
                "alumniOf": "Faculdade de Direito",
                "email": "ariane@miguelexavier.adv.br"
            }
        ]
    };

    return (
        <Helmet>
            {/* LegalService Schema */}
            <script type="application/ld+json">
                {JSON.stringify(legalServiceSchema)}
            </script>

            {/* Organization Schema */}
            <script type="application/ld+json">
                {JSON.stringify(organizationSchema)}
            </script>

            {/* Attorneys Schema */}
            <script type="application/ld+json">
                {JSON.stringify(attorneysSchema)}
            </script>
        </Helmet>
    );
}

export default SchemaMarkup;
