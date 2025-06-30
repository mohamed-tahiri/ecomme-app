import { useState } from 'react';
import { FaSave, FaEye, FaEyeSlash } from 'react-icons/fa';

const SettingsPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [maintenance, setMaintenance] = useState(() => {
        return localStorage.getItem('maintenance') === 'on';
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simuler une requête API
        setTimeout(() => {
            setLoading(false);
            alert('Settings saved successfully!');
        }, 1500);
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Settings</h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow space-y-6"
            >
                {/* General Settings */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">General</h2>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Site Title
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
                            defaultValue="My Admin Panel"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Admin Email
                        </label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
                            defaultValue="admin@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Maintenance Mode
                        </label>
                        <select
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
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
                    </div>
                </div>

                {/* SEO Settings */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">SEO</h2>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Meta Title
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
                            placeholder="e.g. Best Marketplace in Morocco"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Meta Description
                        </label>
                        <textarea
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
                            placeholder="Describe your website for search engines"
                            rows={3}
                        />
                    </div>
                </div>

                {/* Theme Settings */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Appearance</h2>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium">Dark Mode</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={darkMode}
                                onChange={() => setDarkMode(!darkMode)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 rounded-full peer peer-checked:bg-blue-600 transition-all"></div>
                            <span className="ml-3 text-sm text-gray-500">
                                {darkMode ? 'Enabled' : 'Disabled'}
                            </span>
                        </label>
                    </div>
                </div>

                {/* Security Settings */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Security</h2>
                    <div className="relative">
                        <label className="block text-sm font-medium mb-1">
                            Admin Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring pr-10"
                            defaultValue="admin123"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                {/* Save Button */}
                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center gap-2 ${
                            loading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                    >
                        <FaSave />
                        {loading ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SettingsPage;
