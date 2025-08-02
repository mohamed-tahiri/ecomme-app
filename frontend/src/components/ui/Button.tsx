import React from 'react';
import { useAppearance } from '../../context/AppearanceContext';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    size = 'md',
    disabled = false,
    className = '',
}) => {
    const { settings } = useAppearance();

    const getVariantClasses = () => {
        switch (variant) {
            case 'primary':
                return 'text-white font-medium';
            case 'secondary':
                return 'text-gray-700 bg-gray-100 hover:bg-gray-200';
            case 'outline':
                return 'border border-gray-300 text-gray-700 hover:bg-gray-50';
            case 'ghost':
                return 'text-gray-600 hover:text-gray-900 hover:bg-gray-100';
            default:
                return 'text-white font-medium';
        }
    };

    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'px-3 py-1.5 text-sm';
            case 'md':
                return 'px-4 py-2';
            case 'lg':
                return 'px-6 py-3 text-lg';
            default:
                return 'px-4 py-2';
        }
    };

    const baseClasses =
        'rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    const variantClasses = getVariantClasses();
    const sizeClasses = getSizeClasses();

    const buttonStyle =
        variant === 'primary' ? { backgroundColor: settings.primaryColor } : {};

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
            style={buttonStyle}
        >
            {children}
        </button>
    );
};

export default Button;
