import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react';

interface AppearanceSettings {
    primaryColor: string;
    fontSize: 'small' | 'medium' | 'large';
    borderRadius: 'none' | 'small' | 'medium' | 'large';
    sidebarCollapsed: boolean;
    showAnimations: boolean;
    compactMode: boolean;
    theme: 'light' | 'dark';
}

interface AppearanceContextType {
    settings: AppearanceSettings;
    updateSetting: (key: keyof AppearanceSettings, value: any) => void;
    applySettings: () => void;
}

const defaultSettings: AppearanceSettings = {
    primaryColor: '#3B82F6',
    fontSize: 'medium',
    borderRadius: 'medium',
    sidebarCollapsed: false,
    showAnimations: true,
    compactMode: false,
    theme: 'light',
};

const AppearanceContext = createContext<AppearanceContextType | undefined>(
    undefined
);

export const AppearanceProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [settings, setSettings] = useState<AppearanceSettings>(() => {
        const saved = localStorage.getItem('appearanceSettings');
        return saved ? JSON.parse(saved) : defaultSettings;
    });

    const updateSetting = (key: keyof AppearanceSettings, value: any) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);
        localStorage.setItem('appearanceSettings', JSON.stringify(newSettings));
        applySettingsToDOM(newSettings);
    };

    const applySettingsToDOM = (appearanceSettings: AppearanceSettings) => {
        const root = document.documentElement;

        // Appliquer la couleur primaire
        root.style.setProperty(
            '--primary-color',
            appearanceSettings.primaryColor
        );

        // Appliquer la taille de police
        const fontSizeMap = {
            small: '14px',
            medium: '16px',
            large: '18px',
        };
        root.style.setProperty(
            '--base-font-size',
            fontSizeMap[appearanceSettings.fontSize]
        );

        // Appliquer le border radius
        const borderRadiusMap = {
            none: '0px',
            small: '4px',
            medium: '8px',
            large: '12px',
        };
        root.style.setProperty(
            '--border-radius',
            borderRadiusMap[appearanceSettings.borderRadius]
        );

        // Appliquer le thème
        if (appearanceSettings.theme === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }

        // Appliquer le mode compact
        if (appearanceSettings.compactMode) {
            document.body.classList.add('compact-mode');
        } else {
            document.body.classList.remove('compact-mode');
        }

        // Appliquer les animations
        if (!appearanceSettings.showAnimations) {
            document.body.classList.add('no-animations');
        } else {
            document.body.classList.remove('no-animations');
        }
    };

    const applySettings = () => {
        applySettingsToDOM(settings);
    };

    useEffect(() => {
        applySettings();
    }, []);

    return (
        <AppearanceContext.Provider
            value={{ settings, updateSetting, applySettings }}
        >
            {children}
        </AppearanceContext.Provider>
    );
};

export const useAppearance = () => {
    const context = useContext(AppearanceContext);
    if (context === undefined) {
        throw new Error(
            'useAppearance must be used within an AppearanceProvider'
        );
    }
    return context;
};
