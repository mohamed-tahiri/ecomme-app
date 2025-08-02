import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react';

interface SEOSettings {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    twitterCard: string;
    canonicalUrl: string;
    robots: string;
    structuredData: string;
}

interface SEOSettingsContextType {
    settings: SEOSettings;
    updateSetting: (key: keyof SEOSettings, value: string) => void;
    applySEOSettings: () => void;
    generateMetaTags: () => string;
}

const defaultSEOSettings: SEOSettings = {
    metaTitle: 'Best Marketplace in Morocco',
    metaDescription:
        'Discover the best marketplace in Morocco with thousands of products from trusted sellers.',
    keywords: 'marketplace, ecommerce, morocco, online shopping',
    ogTitle: 'Best Marketplace in Morocco',
    ogDescription:
        'Discover the best marketplace in Morocco with thousands of products from trusted sellers.',
    ogImage: '/images/og-image.jpg',
    twitterCard: 'summary_large_image',
    canonicalUrl: 'https://yourdomain.com',
    robots: 'index, follow',
    structuredData: '',
};

const SEOSettingsContext = createContext<SEOSettingsContextType | undefined>(
    undefined
);

export const SEOSettingsProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [settings, setSettings] = useState<SEOSettings>(() => {
        const saved = localStorage.getItem('seoSettings');
        return saved ? JSON.parse(saved) : defaultSEOSettings;
    });

    const updateSetting = (key: keyof SEOSettings, value: string) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);
        localStorage.setItem('seoSettings', JSON.stringify(newSettings));
        applySEOSettings();
    };

    const applySEOSettings = () => {
        // Mettre à jour le titre de la page
        document.title = settings.metaTitle;

        // Mettre à jour les meta tags
        updateMetaTag('description', settings.metaDescription);
        updateMetaTag('keywords', settings.keywords);
        updateMetaTag('robots', settings.robots);

        // Mettre à jour les Open Graph tags
        updateMetaTag('og:title', settings.ogTitle);
        updateMetaTag('og:description', settings.ogDescription);
        updateMetaTag('og:image', settings.ogImage);
        updateMetaTag('og:type', 'website');

        // Mettre à jour les Twitter Card tags
        updateMetaTag('twitter:card', settings.twitterCard);
        updateMetaTag('twitter:title', settings.ogTitle);
        updateMetaTag('twitter:description', settings.ogDescription);
        updateMetaTag('twitter:image', settings.ogImage);

        // Mettre à jour le canonical URL
        updateCanonicalUrl(settings.canonicalUrl);

        // Appliquer les structured data
        if (settings.structuredData) {
            applyStructuredData(settings.structuredData);
        }
    };

    const updateMetaTag = (name: string, content: string) => {
        let meta = document.querySelector(
            `meta[name="${name}"]`
        ) as HTMLMetaElement;
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = name;
            document.head.appendChild(meta);
        }
        meta.content = content;
    };

    const updateCanonicalUrl = (url: string) => {
        let canonical = document.querySelector(
            'link[rel="canonical"]'
        ) as HTMLLinkElement;
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            document.head.appendChild(canonical);
        }
        canonical.href = url;
    };

    const applyStructuredData = (structuredData: string) => {
        // Supprimer l'ancien structured data
        const existingScript = document.querySelector(
            'script[type="application/ld+json"]'
        );
        if (existingScript) {
            existingScript.remove();
        }

        // Ajouter le nouveau structured data
        if (structuredData) {
            try {
                const script = document.createElement('script');
                script.type = 'application/ld+json';
                script.textContent = structuredData;
                document.head.appendChild(script);
            } catch (error) {
                console.error('Error applying structured data:', error);
            }
        }
    };

    const generateMetaTags = () => {
        return `
            <title>${settings.metaTitle}</title>
            <meta name="description" content="${settings.metaDescription}">
            <meta name="keywords" content="${settings.keywords}">
            <meta name="robots" content="${settings.robots}">
            
            <!-- Open Graph -->
            <meta property="og:title" content="${settings.ogTitle}">
            <meta property="og:description" content="${settings.ogDescription}">
            <meta property="og:image" content="${settings.ogImage}">
            <meta property="og:type" content="website">
            
            <!-- Twitter Card -->
            <meta name="twitter:card" content="${settings.twitterCard}">
            <meta name="twitter:title" content="${settings.ogTitle}">
            <meta name="twitter:description" content="${settings.ogDescription}">
            <meta name="twitter:image" content="${settings.ogImage}">
            
            <!-- Canonical -->
            <link rel="canonical" href="${settings.canonicalUrl}">
        `;
    };

    useEffect(() => {
        applySEOSettings();
    }, []);

    return (
        <SEOSettingsContext.Provider
            value={{
                settings,
                updateSetting,
                applySEOSettings,
                generateMetaTags,
            }}
        >
            {children}
        </SEOSettingsContext.Provider>
    );
};

export const useSEOSettings = () => {
    const context = useContext(SEOSettingsContext);
    if (context === undefined) {
        throw new Error(
            'useSEOSettings must be used within a SEOSettingsProvider'
        );
    }
    return context;
};
