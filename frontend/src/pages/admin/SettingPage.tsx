import { useState } from 'react';
import {
    FaSave,
    FaEye,
    FaEyeSlash,
    FaCog,
    FaShieldAlt,
    FaPalette,
    FaGlobe,
    FaDownload,
    FaFont,
    FaImage,
    FaBrush,
    FaSearch,
    FaTwitter,
    FaFacebook,
    FaCode,
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useAppearance } from '../../context/AppearanceContext';
import { useSEOSettings } from '../../context/SEOSettingsContext';
import AppearanceDemo from '../../components/admin/AppearanceDemo';
import SEOPreview from '../../components/admin/SEOPreview';
import SEOExport from '../../components/admin/SEOExport';

const SettingsPage = () => {
    const { logout } = useAuth();
    const { settings: appearanceSettings, updateSetting } = useAppearance();
    const { settings: seoSettings, updateSetting: updateSEOSetting } =
        useSEOSettings();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'true';
    });
    const [maintenance, setMaintenance] = useState(() => {
        return localStorage.getItem('maintenance') === 'on';
    });

    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Sauvegarder les paramètres d'apparence
        localStorage.setItem('darkMode', darkMode.toString());
        updateSetting('theme', darkMode ? 'dark' : 'light');

        // Simuler une requête API
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    };

    const colorOptions = [
        { name: 'Blue', value: '#3B82F6', class: 'bg-blue-500' },
        { name: 'Green', value: '#10B981', class: 'bg-green-500' },
        { name: 'Orange', value: '#F59E0B', class: 'bg-orange-500' },
        { name: 'Red', value: '#EF4444', class: 'bg-red-500' },
        { name: 'Purple', value: '#8B5CF6', class: 'bg-purple-500' },
        { name: 'Teal', value: '#14B8A6', class: 'bg-teal-500' },
        { name: 'Pink', value: '#EC4899', class: 'bg-pink-500' },
        { name: 'Indigo', value: '#6366F1', class: 'bg-indigo-500' },
    ];

    const fontSizeOptions = [
        { name: 'Small', value: 'small', class: 'text-sm' },
        { name: 'Medium', value: 'medium', class: 'text-base' },
        { name: 'Large', value: 'large', class: 'text-lg' },
    ];

    const borderRadiusOptions = [
        { name: 'None', value: 'none', class: 'rounded-none' },
        { name: 'Small', value: 'small', class: 'rounded' },
        { name: 'Medium', value: 'medium', class: 'rounded-lg' },
        { name: 'Large', value: 'large', class: 'rounded-xl' },
    ];

    const twitterCardOptions = [
        { value: 'summary', label: 'Summary' },
        { value: 'summary_large_image', label: 'Summary Large Image' },
        { value: 'app', label: 'App' },
        { value: 'player', label: 'Player' },
    ];

    const robotsOptions = [
        { value: 'index, follow', label: 'Index, Follow' },
        { value: 'noindex, follow', label: 'No Index, Follow' },
        { value: 'index, nofollow', label: 'Index, No Follow' },
        { value: 'noindex, nofollow', label: 'No Index, No Follow' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Settings
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Manage your application configuration and preferences
                    </p>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2">
                    <FaDownload />
                    <span>Export Settings</span>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* General Settings */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center space-x-3 mb-6">
                        <FaGlobe className="text-blue-500 text-xl" />
                        <h2 className="text-xl font-semibold text-gray-900">
                            General Settings
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Site Title
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                defaultValue="My Admin Panel"
                                placeholder="Enter site title..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Admin Email
                            </label>
                            <input
                                type="email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                defaultValue="admin@example.com"
                                placeholder="Enter admin email..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Maintenance Mode
                            </label>
                            <select
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                value={maintenance ? 'on' : 'off'}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setMaintenance(value === 'on');
                                    localStorage.setItem('maintenance', value);
                                }}
                            >
                                <option value="off">Off</option>
                                <option value="on">On</option>
                            </select>
                            <p className="text-xs text-gray-500 mt-1">
                                When enabled, only admins can access the site
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Default Currency
                            </label>
                            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors">
                                <option value="MAD">MAD (د.م)</option>
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                                <option value="GBP">GBP (£)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* SEO Settings */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center space-x-3 mb-6">
                        <FaSearch className="text-green-500 text-xl" />
                        <h2 className="text-xl font-semibold text-gray-900">
                            SEO Settings
                        </h2>
                    </div>

                    <div className="space-y-6">
                        {/* Basic SEO */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                <FaSearch className="mr-2 text-green-500" />
                                Basic SEO
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Meta Title
                                    </label>
                                    <input
                                        type="text"
                                        value={seoSettings.metaTitle}
                                        onChange={(e) =>
                                            updateSEOSetting(
                                                'metaTitle',
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        placeholder="e.g. Best Marketplace in Morocco"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        {seoSettings.metaTitle.length}/60
                                        characters
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Keywords
                                    </label>
                                    <input
                                        type="text"
                                        value={seoSettings.keywords}
                                        onChange={(e) =>
                                            updateSEOSetting(
                                                'keywords',
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        placeholder="e.g. marketplace, ecommerce, morocco"
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Meta Description
                                </label>
                                <textarea
                                    value={seoSettings.metaDescription}
                                    onChange={(e) =>
                                        updateSEOSetting(
                                            'metaDescription',
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    placeholder="Describe your website for search engines"
                                    rows={3}
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    {seoSettings.metaDescription.length}/160
                                    characters
                                </p>
                            </div>

                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Canonical URL
                                </label>
                                <input
                                    type="url"
                                    value={seoSettings.canonicalUrl}
                                    onChange={(e) =>
                                        updateSEOSetting(
                                            'canonicalUrl',
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    placeholder="https://yourdomain.com"
                                />
                            </div>

                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Robots
                                </label>
                                <select
                                    value={seoSettings.robots}
                                    onChange={(e) =>
                                        updateSEOSetting(
                                            'robots',
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                >
                                    {robotsOptions.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                <FaFacebook className="mr-2 text-blue-500" />
                                Social Media
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Open Graph Title
                                    </label>
                                    <input
                                        type="text"
                                        value={seoSettings.ogTitle}
                                        onChange={(e) =>
                                            updateSEOSetting(
                                                'ogTitle',
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        placeholder="Title for Facebook, LinkedIn, etc."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Open Graph Image
                                    </label>
                                    <input
                                        type="url"
                                        value={seoSettings.ogImage}
                                        onChange={(e) =>
                                            updateSEOSetting(
                                                'ogImage',
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        placeholder="https://yourdomain.com/og-image.jpg"
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Open Graph Description
                                </label>
                                <textarea
                                    value={seoSettings.ogDescription}
                                    onChange={(e) =>
                                        updateSEOSetting(
                                            'ogDescription',
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    placeholder="Description for social media sharing"
                                    rows={2}
                                />
                            </div>

                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Twitter Card Type
                                </label>
                                <select
                                    value={seoSettings.twitterCard}
                                    onChange={(e) =>
                                        updateSEOSetting(
                                            'twitterCard',
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                >
                                    {twitterCardOptions.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Structured Data */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                <FaCode className="mr-2 text-purple-500" />
                                Structured Data
                            </h3>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    JSON-LD Schema
                                </label>
                                <textarea
                                    value={seoSettings.structuredData}
                                    onChange={(e) =>
                                        updateSEOSetting(
                                            'structuredData',
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-mono text-sm"
                                    placeholder='{"@context": "https://schema.org", "@type": "Organization", "name": "Your Company"}'
                                    rows={8}
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Add structured data in JSON-LD format for
                                    better search engine understanding
                                </p>
                            </div>
                        </div>

                        {/* SEO Preview */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                <FaSearch className="mr-2 text-green-500" />
                                SEO Preview
                            </h3>
                            <SEOPreview />
                        </div>

                        {/* SEO Export */}
                        <div>
                            <SEOExport />
                        </div>
                    </div>
                </div>

                {/* Appearance Settings */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center space-x-3 mb-6">
                        <FaPalette className="text-purple-500 text-xl" />
                        <h2 className="text-xl font-semibold text-gray-900">
                            Appearance
                        </h2>
                    </div>

                    <div className="space-y-6">
                        {/* Theme Mode */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                <FaBrush className="mr-2 text-purple-500" />
                                Theme Mode
                            </h3>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <span className="text-sm font-medium text-gray-700">
                                        Dark Mode
                                    </span>
                                    <p className="text-xs text-gray-500">
                                        Switch between light and dark themes
                                    </p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={darkMode}
                                        onChange={() => setDarkMode(!darkMode)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-blue-600 transition-all"></div>
                                    <span className="ml-3 text-sm text-gray-500">
                                        {darkMode ? 'Enabled' : 'Disabled'}
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Primary Color */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                <FaPalette className="mr-2 text-purple-500" />
                                Primary Color
                            </h3>
                            <div className="grid grid-cols-4 gap-3">
                                {colorOptions.map((color) => (
                                    <button
                                        key={color.value}
                                        type="button"
                                        onClick={() =>
                                            updateSetting(
                                                'primaryColor',
                                                color.value
                                            )
                                        }
                                        className={`relative p-4 rounded-lg border-2 transition-all ${
                                            appearanceSettings.primaryColor ===
                                            color.value
                                                ? 'border-blue-500 ring-2 ring-blue-200'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <div
                                            className={`w-full h-8 rounded ${color.class}`}
                                        ></div>
                                        <span className="block text-xs text-gray-600 mt-2 text-center">
                                            {color.name}
                                        </span>
                                        {appearanceSettings.primaryColor ===
                                            color.value && (
                                            <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                                <svg
                                                    className="w-2 h-2 text-white"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Typography */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                <FaFont className="mr-2 text-purple-500" />
                                Typography
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Font Size
                                    </label>
                                    <select
                                        value={appearanceSettings.fontSize}
                                        onChange={(e) =>
                                            updateSetting(
                                                'fontSize',
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    >
                                        {fontSizeOptions.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Border Radius
                                    </label>
                                    <select
                                        value={appearanceSettings.borderRadius}
                                        onChange={(e) =>
                                            updateSetting(
                                                'borderRadius',
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    >
                                        {borderRadiusOptions.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Layout Options */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                <FaImage className="mr-2 text-purple-500" />
                                Layout Options
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <span className="text-sm font-medium text-gray-700">
                                            Compact Mode
                                        </span>
                                        <p className="text-xs text-gray-500">
                                            Reduce spacing for more content
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={
                                                appearanceSettings.compactMode
                                            }
                                            onChange={() =>
                                                updateSetting(
                                                    'compactMode',
                                                    !appearanceSettings.compactMode
                                                )
                                            }
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-blue-600 transition-all"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <span className="text-sm font-medium text-gray-700">
                                            Show Animations
                                        </span>
                                        <p className="text-xs text-gray-500">
                                            Enable smooth transitions and
                                            animations
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={
                                                appearanceSettings.showAnimations
                                            }
                                            onChange={() =>
                                                updateSetting(
                                                    'showAnimations',
                                                    !appearanceSettings.showAnimations
                                                )
                                            }
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-blue-600 transition-all"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <span className="text-sm font-medium text-gray-700">
                                            Collapsed Sidebar
                                        </span>
                                        <p className="text-xs text-gray-500">
                                            Start with sidebar collapsed
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={
                                                appearanceSettings.sidebarCollapsed
                                            }
                                            onChange={() =>
                                                updateSetting(
                                                    'sidebarCollapsed',
                                                    !appearanceSettings.sidebarCollapsed
                                                )
                                            }
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-blue-600 transition-all"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Preview */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                <FaImage className="mr-2 text-purple-500" />
                                Live Preview
                            </h3>
                            <AppearanceDemo />
                        </div>
                    </div>
                </div>

                {/* Security Settings */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center space-x-3 mb-6">
                        <FaShieldAlt className="text-red-500 text-xl" />
                        <h2 className="text-xl font-semibold text-gray-900">
                            Security
                        </h2>
                    </div>

                    <div className="space-y-4">
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Admin Password
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors pr-10"
                                defaultValue="admin123"
                                placeholder="Enter new password..."
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 transition-colors"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-sm font-medium text-gray-700">
                                    Two-Factor Authentication
                                </span>
                                <p className="text-xs text-gray-500">
                                    Add an extra layer of security
                                </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-blue-600 transition-all"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-sm font-medium text-gray-700">
                                    Session Timeout
                                </span>
                                <p className="text-xs text-gray-500">
                                    Automatically log out after inactivity
                                </p>
                            </div>
                            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                <option value="30">30 minutes</option>
                                <option value="60">1 hour</option>
                                <option value="120">2 hours</option>
                                <option value="0">Never</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Notification Settings */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center space-x-3 mb-6">
                        <FaCog className="text-yellow-500 text-xl" />
                        <h2 className="text-xl font-semibold text-gray-900">
                            Notifications
                        </h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-sm font-medium text-gray-700">
                                    Email Notifications
                                </span>
                                <p className="text-xs text-gray-500">
                                    Receive notifications via email
                                </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-blue-600 transition-all"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-sm font-medium text-gray-700">
                                    Order Alerts
                                </span>
                                <p className="text-xs text-gray-500">
                                    Get notified for new orders
                                </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-blue-600 transition-all"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-sm font-medium text-gray-700">
                                    Low Stock Alerts
                                </span>
                                <p className="text-xs text-gray-500">
                                    Get notified when products are low in stock
                                </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-blue-600 transition-all"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-6">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                    >
                        <FaShieldAlt />
                        <span>Logout</span>
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 ${
                            loading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                    >
                        <FaSave />
                        <span>{loading ? 'Saving...' : 'Save Settings'}</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SettingsPage;
