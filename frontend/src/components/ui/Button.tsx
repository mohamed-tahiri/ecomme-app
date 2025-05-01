import React from 'react';
import classNames from 'classnames';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export const Button: React.FC<Props> = ({ children, className, ...props }) => {
    return (
        <button
            {...props}
            className={classNames(
                'px-6 py-2 rounded-md font-semibold transition cursor-pointer',
                props.disabled
                    ? 'bg-gray-300 text-gray-600'
                    : 'bg-[var(--primary-button-background)] text-white ',
                className
            )}
        >
            {children}
        </button>
    );
};
