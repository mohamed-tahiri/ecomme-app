// components/modals/ConfirmModal.tsx

import React from 'react';
import { useAppearance } from '../../context/AppearanceContext';

interface ConfirmModalProps {
    isOpen: boolean;
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onCancel: () => void;
    onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    title = 'Confirmation',
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onCancel,
    onConfirm,
}) => {
    const { settings } = useAppearance();

    const getBorderRadius = () => {
        switch (settings.borderRadius) {
            case 'none':
                return 'rounded-none';
            case 'small':
                return 'rounded';
            case 'large':
                return 'rounded-xl';
            default:
                return 'rounded-lg';
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div
                className={`bg-white p-6 shadow-lg w-full max-w-md ${getBorderRadius()}`}
            >
                <h2 className="text-xl font-semibold mb-4 text-gray-900">
                    {title}
                </h2>
                <p className="mb-6 text-gray-600">{message}</p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onCancel}
                        className={`px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 transition-colors ${getBorderRadius()}`}
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-4 py-2 text-white transition-colors ${getBorderRadius()}`}
                        style={{ backgroundColor: settings.primaryColor }}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
