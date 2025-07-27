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
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const SettingsPage = () => {
    const { logout } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
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

        // Simuler une requête API
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    };

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
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                                <option value="GBP">GBP (£)</option>
                                <option value="MAD">MAD (د.م)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* SEO Settings */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center space-x-3 mb-6">
                        <FaGlobe className="text-green-500 text-xl" />
                        <h2 className="text-xl font-semibold text-gray-900">
                            SEO Settings
                        </h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Meta Title
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                placeholder="e.g. Best Marketplace in Morocco"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Meta Description
                            </label>
                            <textarea
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                placeholder="Describe your website for search engines"
                                rows={3}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Keywords
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                placeholder="e.g. marketplace, ecommerce, morocco"
                            />
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

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
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

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Primary Color
                            </label>
                            <div className="flex space-x-2">
                                {[
                                    '#3B82F6',
                                    '#10B981',
                                    '#F59E0B',
                                    '#EF4444',
                                    '#8B5CF6',
                                ].map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-colors"
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
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
