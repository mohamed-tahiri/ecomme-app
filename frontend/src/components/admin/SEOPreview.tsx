import React from 'react';
import { useSEOSettings } from '../../context/SEOSettingsContext';
import { FaSearch, FaFacebook, FaTwitter } from 'react-icons/fa';

const SEOPreview: React.FC = () => {
    const { settings } = useSEOSettings();

    return (
        <div className="space-y-6">
            {/* Google Search Preview */}
            <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <FaSearch className="mr-2 text-green-500" />
                    Google Search Preview
                </h4>
                <div className="border border-gray-200 rounded-lg p-4 bg-white">
                    <div className="space-y-1">
                        <div className="text-blue-600 text-sm truncate">
                            {settings.canonicalUrl || 'https://yourdomain.com'}
                        </div>
                        <div className="text-xl text-blue-800 font-medium">
                            {settings.metaTitle ||
                                'Your page title will appear here'}
                        </div>
                        <div className="text-gray-600 text-sm">
                            {settings.metaDescription ||
                                'Your meta description will appear here'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Facebook Preview */}
            <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <FaFacebook className="mr-2 text-blue-500" />
                    Facebook Preview
                </h4>
                <div className="border border-gray-200 rounded-lg p-4 bg-white">
                    <div className="space-y-3">
                        {settings.ogImage && (
                            <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center">
                                <img
                                    src={settings.ogImage}
                                    alt="OG Image"
                                    className="w-full h-full object-cover rounded"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}
                        <div className="space-y-1">
                            <div className="text-blue-600 text-sm">
                                {settings.canonicalUrl || 'yourdomain.com'}
                            </div>
                            <div className="text-lg font-medium text-gray-900">
                                {settings.ogTitle ||
                                    settings.metaTitle ||
                                    'Your page title'}
                            </div>
                            <div className="text-gray-600 text-sm">
                                {settings.ogDescription ||
                                    settings.metaDescription ||
                                    'Your description'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Twitter Preview */}
            <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <FaTwitter className="mr-2 text-blue-400" />
                    Twitter Preview
                </h4>
                <div className="border border-gray-200 rounded-lg p-4 bg-white">
                    <div className="space-y-3">
                        {settings.ogImage && (
                            <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center">
                                <img
                                    src={settings.ogImage}
                                    alt="Twitter Image"
                                    className="w-full h-full object-cover rounded"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}
                        <div className="space-y-1">
                            <div className="text-gray-500 text-sm">
                                {settings.canonicalUrl || 'yourdomain.com'}
                            </div>
                            <div className="text-lg font-medium text-gray-900">
                                {settings.ogTitle ||
                                    settings.metaTitle ||
                                    'Your page title'}
                            </div>
                            <div className="text-gray-600 text-sm">
                                {settings.ogDescription ||
                                    settings.metaDescription ||
                                    'Your description'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Meta Tags Summary */}
            <div>
                <h4 className="font-medium text-gray-900 mb-3">
                    Meta Tags Summary
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="font-medium">Title Length:</span>
                            <span
                                className={
                                    settings.metaTitle.length > 60
                                        ? 'text-red-600'
                                        : 'text-green-600'
                                }
                            >
                                {settings.metaTitle.length}/60
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">
                                Description Length:
                            </span>
                            <span
                                className={
                                    settings.metaDescription.length > 160
                                        ? 'text-red-600'
                                        : 'text-green-600'
                                }
                            >
                                {settings.metaDescription.length}/160
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Keywords:</span>
                            <span className="text-gray-600">
                                {settings.keywords.split(',').length} keywords
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Robots:</span>
                            <span className="text-gray-600">
                                {settings.robots}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Twitter Card:</span>
                            <span className="text-gray-600">
                                {settings.twitterCard}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SEOPreview;
