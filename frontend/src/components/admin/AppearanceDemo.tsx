import React from 'react';
import { useAppearance } from '../../context/AppearanceContext';
import { FaPalette, FaFont, FaImage, FaBrush } from 'react-icons/fa';

const AppearanceDemo: React.FC = () => {
    const { settings } = useAppearance();

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FaPalette
                    className="mr-2"
                    style={{ color: settings.primaryColor }}
                />
                Live Appearance Preview
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Couleurs */}
                <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                        <FaBrush
                            className="mr-2"
                            style={{ color: settings.primaryColor }}
                        />
                        Colors
                    </h4>
                    <div className="space-y-3">
                        <div
                            className="p-3 rounded-lg text-white text-center"
                            style={{ backgroundColor: settings.primaryColor }}
                        >
                            Primary Color
                        </div>
                        <div className="p-3 border rounded-lg text-center">
                            <span style={{ color: settings.primaryColor }}>
                                Primary Text Color
                            </span>
                        </div>
                    </div>
                </div>

                {/* Typographie */}
                <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                        <FaFont
                            className="mr-2"
                            style={{ color: settings.primaryColor }}
                        />
                        Typography
                    </h4>
                    <div className="space-y-3">
                        <div
                            className="p-3 border rounded-lg"
                            style={{
                                fontSize:
                                    settings.fontSize === 'small'
                                        ? '14px'
                                        : settings.fontSize === 'large'
                                          ? '18px'
                                          : '16px',
                            }}
                        >
                            Font Size: {settings.fontSize}
                        </div>
                        <div
                            className="p-3 border"
                            style={{
                                borderRadius:
                                    settings.borderRadius === 'none'
                                        ? '0px'
                                        : settings.borderRadius === 'small'
                                          ? '4px'
                                          : settings.borderRadius === 'large'
                                            ? '12px'
                                            : '8px',
                            }}
                        >
                            Border Radius: {settings.borderRadius}
                        </div>
                    </div>
                </div>

                {/* Layout */}
                <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                        <FaImage
                            className="mr-2"
                            style={{ color: settings.primaryColor }}
                        />
                        Layout Options
                    </h4>
                    <div className="space-y-3">
                        <div className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between">
                                <span>Compact Mode:</span>
                                <span
                                    className={`px-2 py-1 rounded text-xs ${settings.compactMode ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
                                >
                                    {settings.compactMode
                                        ? 'Enabled'
                                        : 'Disabled'}
                                </span>
                            </div>
                        </div>
                        <div className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between">
                                <span>Animations:</span>
                                <span
                                    className={`px-2 py-1 rounded text-xs ${settings.showAnimations ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
                                >
                                    {settings.showAnimations
                                        ? 'Enabled'
                                        : 'Disabled'}
                                </span>
                            </div>
                        </div>
                        <div className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between">
                                <span>Sidebar Collapsed:</span>
                                <span
                                    className={`px-2 py-1 rounded text-xs ${settings.sidebarCollapsed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
                                >
                                    {settings.sidebarCollapsed ? 'Yes' : 'No'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Boutons */}
                <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                        <FaPalette
                            className="mr-2"
                            style={{ color: settings.primaryColor }}
                        />
                        Buttons
                    </h4>
                    <div className="space-y-3">
                        <button
                            className="px-4 py-2 rounded-lg text-white transition-colors"
                            style={{ backgroundColor: settings.primaryColor }}
                        >
                            Primary Button
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            Secondary Button
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">
                    Current Settings Summary
                </h5>
                <div className="text-sm text-gray-600 space-y-1">
                    <div>
                        Primary Color:{' '}
                        <span style={{ color: settings.primaryColor }}>
                            {settings.primaryColor}
                        </span>
                    </div>
                    <div>Font Size: {settings.fontSize}</div>
                    <div>Border Radius: {settings.borderRadius}</div>
                    <div>Theme: {settings.theme}</div>
                    <div>
                        Compact Mode: {settings.compactMode ? 'Yes' : 'No'}
                    </div>
                    <div>
                        Show Animations:{' '}
                        {settings.showAnimations ? 'Yes' : 'No'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppearanceDemo;
