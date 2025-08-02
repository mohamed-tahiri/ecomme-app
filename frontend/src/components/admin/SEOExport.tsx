import React, { useState } from 'react';
import { useSEOSettings } from '../../context/SEOSettingsContext';
import { FaDownload, FaCode, FaFileAlt } from 'react-icons/fa';

const SEOExport: React.FC = () => {
    const { settings, generateMetaTags } = useSEOSettings();
    const [exportFormat, setExportFormat] = useState<'html' | 'json' | 'txt'>(
        'html'
    );

    const exportSEOData = () => {
        const data = {
            metaTitle: settings.metaTitle,
            metaDescription: settings.metaDescription,
            keywords: settings.keywords,
            ogTitle: settings.ogTitle,
            ogDescription: settings.ogDescription,
            ogImage: settings.ogImage,
            twitterCard: settings.twitterCard,
            canonicalUrl: settings.canonicalUrl,
            robots: settings.robots,
            structuredData: settings.structuredData,
        };

        let content = '';
        let filename = '';
        let mimeType = '';

        switch (exportFormat) {
            case 'html':
                content = generateMetaTags();
                filename = 'seo-meta-tags.html';
                mimeType = 'text/html';
                break;
            case 'json':
                content = JSON.stringify(data, null, 2);
                filename = 'seo-settings.json';
                mimeType = 'application/json';
                break;
            case 'txt':
                content = `SEO Settings Export
==================

Meta Title: ${settings.metaTitle}
Meta Description: ${settings.metaDescription}
Keywords: ${settings.keywords}
Canonical URL: ${settings.canonicalUrl}
Robots: ${settings.robots}

Open Graph:
- Title: ${settings.ogTitle}
- Description: ${settings.ogDescription}
- Image: ${settings.ogImage}

Twitter Card: ${settings.twitterCard}

Structured Data:
${settings.structuredData || 'None'}`;
                filename = 'seo-settings.txt';
                mimeType = 'text/plain';
                break;
        }

        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FaDownload className="mr-2 text-blue-500" />
                Export SEO Settings
            </h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Export Format
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        <button
                            onClick={() => setExportFormat('html')}
                            className={`p-3 border rounded-lg text-center transition-colors ${
                                exportFormat === 'html'
                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                    : 'border-gray-300 hover:border-gray-400'
                            }`}
                        >
                            <FaCode className="mx-auto mb-2 text-lg" />
                            <span className="text-sm font-medium">HTML</span>
                        </button>
                        <button
                            onClick={() => setExportFormat('json')}
                            className={`p-3 border rounded-lg text-center transition-colors ${
                                exportFormat === 'json'
                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                    : 'border-gray-300 hover:border-gray-400'
                            }`}
                        >
                            <FaCode className="mx-auto mb-2 text-lg" />
                            <span className="text-sm font-medium">JSON</span>
                        </button>
                        <button
                            onClick={() => setExportFormat('txt')}
                            className={`p-3 border rounded-lg text-center transition-colors ${
                                exportFormat === 'txt'
                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                    : 'border-gray-300 hover:border-gray-400'
                            }`}
                        >
                            <FaFileAlt className="mx-auto mb-2 text-lg" />
                            <span className="text-sm font-medium">Text</span>
                        </button>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                        Export Preview
                    </h4>
                    <div className="text-sm text-gray-600 space-y-1">
                        <div>
                            Format:{' '}
                            <span className="font-medium">
                                {exportFormat.toUpperCase()}
                            </span>
                        </div>
                        <div>
                            Meta Title:{' '}
                            <span className="font-medium">
                                {settings.metaTitle || 'Not set'}
                            </span>
                        </div>
                        <div>
                            Meta Description:{' '}
                            <span className="font-medium">
                                {settings.metaDescription
                                    ? `${settings.metaDescription.substring(0, 50)}...`
                                    : 'Not set'}
                            </span>
                        </div>
                        <div>
                            Keywords:{' '}
                            <span className="font-medium">
                                {settings.keywords || 'Not set'}
                            </span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={exportSEOData}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                >
                    <FaDownload />
                    <span>Export SEO Settings</span>
                </button>
            </div>
        </div>
    );
};

export default SEOExport;
