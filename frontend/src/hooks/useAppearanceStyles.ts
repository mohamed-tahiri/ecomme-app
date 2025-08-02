import { useAppearance } from '../context/AppearanceContext';

export const useAppearanceStyles = () => {
    const { settings } = useAppearance();

    const getPrimaryColorStyle = () => ({
        backgroundColor: settings.primaryColor,
        color: '#ffffff',
    });

    const getPrimaryColorTextStyle = () => ({
        color: settings.primaryColor,
    });

    const getBorderRadiusStyle = () => {
        const radiusMap = {
            none: '0px',
            small: '4px',
            medium: '8px',
            large: '12px',
        };
        return {
            borderRadius: radiusMap[settings.borderRadius],
        };
    };

    const getFontSizeStyle = () => {
        const sizeMap = {
            small: '14px',
            medium: '16px',
            large: '18px',
        };
        return {
            fontSize: sizeMap[settings.fontSize],
        };
    };

    const getCompactSpacing = () => {
        if (settings.compactMode) {
            return {
                padding: '0.75rem',
                margin: '0.5rem',
            };
        }
        return {};
    };

    const getAnimationClass = () => {
        return settings.showAnimations ? 'transition-all duration-200' : '';
    };

    return {
        getPrimaryColorStyle,
        getPrimaryColorTextStyle,
        getBorderRadiusStyle,
        getFontSizeStyle,
        getCompactSpacing,
        getAnimationClass,
        settings,
    };
};
