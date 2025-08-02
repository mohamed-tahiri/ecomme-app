import React, { useState, useEffect } from 'react';
import api from '../../services/productsService';
import { Product } from '../../types/product';
import Pagination from '../../components/pagination/Pagination';
import { MdOutlineDelete, MdEdit, MdAdd } from 'react-icons/md';
import { FaSearch, FaPlus } from 'react-icons/fa';
import ConfirmModal from '../../components/modals/ConfirmModal';
import { useAppearance } from '../../context/AppearanceContext';

const AdminProductsPage: React.FC = () => {
    const { settings } = useAppearance();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');

    const [productToDelete, setProductToDelete] = useState<Product | null>(
        null
    );
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.getProducts({
                page,
                limit,
                name: search,
            });

            setProducts(response.data);
            setTotalPages(response.totalPages);
        } catch (err) {
            console.error(err);
            setError('Error loading products.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page, search]);

    const handleAskDelete = (product: Product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (!productToDelete) return;

        try {
            await api.deleteProduct(productToDelete.id);
            fetchProducts();
        } catch (error) {
            console.log('Error deleting product.');
        } finally {
            setShowDeleteModal(false);
            setProductToDelete(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Products Management
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Manage your product catalog
                    </p>
                </div>
                <button
                    className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors flex items-center space-x-2"
                    style={{ backgroundColor: settings.primaryColor }}
                >
                    <FaPlus />
                    <span>Add Product</span>
                </button>
            </div>

            {/* Search Section */}
            <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center space-x-4">
                    <div className="flex-1">
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products by name..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <div className="text-sm text-gray-500">
                        {products.length} products found
                    </div>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white shadow-sm rounded-lg border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Store
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Stock
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-4 text-center"
                                    >
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                                            <span className="ml-2 text-gray-600">
                                                Loading products...
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-4 text-center text-red-500"
                                    >
                                        {error}
                                    </td>
                                </tr>
                            ) : products.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-8 text-center"
                                    >
                                        <div className="text-gray-500">
                                            {search
                                                ? 'No products found matching your search.'
                                                : 'No products found.'}
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr
                                        key={product.id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <div
                                                        className="h-10 w-10 rounded-lg flex items-center justify-center text-white"
                                                        style={{
                                                            backgroundColor:
                                                                settings.primaryColor,
                                                        }}
                                                    >
                                                        <span className="text-sm font-medium">
                                                            {product.name
                                                                .charAt(0)
                                                                .toUpperCase()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {product.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {product.description.substring(
                                                            0,
                                                            50
                                                        )}
                                                        ...
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-medium text-gray-900">
                                                ${product.price.toFixed(2)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-gray-900">
                                                {product.Category?.name ||
                                                    'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-gray-900">
                                                {product.store?.name || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                    product.stock > 10
                                                        ? 'bg-green-100 text-green-700'
                                                        : product.stock > 0
                                                          ? 'bg-yellow-100 text-yellow-700'
                                                          : 'bg-red-100 text-red-700'
                                                }`}
                                            >
                                                {product.stock} in stock
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button
                                                    className="text-blue-600 hover:text-blue-900 transition-colors"
                                                    title="Edit Product"
                                                >
                                                    <MdEdit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleAskDelete(product)
                                                    }
                                                    className="text-red-600 hover:text-red-900 transition-colors"
                                                    title="Delete Product"
                                                >
                                                    <MdOutlineDelete className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-end mt-4">
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </div>
            )}

            {/* Confirmation Modal */}
            <ConfirmModal
                isOpen={showDeleteModal}
                title="Delete Product"
                message={`Are you sure you want to delete "${productToDelete?.name}"?`}
                onCancel={() => {
                    setShowDeleteModal(false);
                    setProductToDelete(null);
                }}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
};

export default AdminProductsPage;
