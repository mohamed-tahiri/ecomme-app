/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{html,js,jsx,ts,tsx}', // Scan for these file types
    ],
    theme: {
        extend: {
            colors: {
                text: 'var(--text-color)',
                heading: 'var(--heading-color)',
                accent: 'var(--accent-color)',
                link: 'var(--link-color)',
                'link-hover': 'var(--link-color-hover)',
                background: 'var(--background)',
                'primary-button': 'var(--primary-button-background)',
                'secondary-button': 'var(--secondary-button-background)',
                header: 'var(--header-background)',
                footer: 'var(--footer-background-color)',
                success: 'var(--success-color)',
                error: 'var(--error-color)',
            },
            fontSize: {
                default: 'var(--default-text-font-size)',
                base: 'var(--base-text-font-size)',
            },
            fontFamily: {
                heading: 'var(--heading-font-family)',
                text: 'var(--text-font-family)',
            },
            fontWeight: {
                heading: 'var(--heading-font-weight)',
                text: 'var(--text-font-weight)',
                'text-bolder': 'var(--text-font-bolder-weight)',
            },
            backgroundImage: {
                blackfriday: 'var(--blackfriday-background-image)',
                sale: 'var(--sale-background-image)',
            },
            borderColor: {
                form: 'var(--form-border-color)',
            },
            backgroundColor: {
                accent: 'var(--accent-background)',
                input: 'var(--input-background)',
            },
            boxShadow: {
                accent: '0 4px 6px rgba(0, 186, 219, 0.15)', // Custom shadow example using accent color
            },
        },
    },
    plugins: [],
};
