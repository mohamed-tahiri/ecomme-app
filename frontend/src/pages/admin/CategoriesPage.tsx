// src/pages/admin/CategoriesPage.tsx
import React, { useState, useEffect } from 'react';
import { Category } from '../../types/category';
import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from '../../services/categoryService';
import { MdOutlineDelete, MdEdit } from 'react-icons/md';
import { FaSearch, FaPlus } from 'react-icons/fa';
import ConfirmModal from '../../components/modals/ConfirmModal';
import { useAppearance } from '../../context/AppearanceContext';

interface CategoryFormData {
    name: string;
    descripiton: string;
    parentCategoryId?: string;
}

const CategoriesPage: React.FC = () => {
    const { settings } = useAppearance();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(
        null
    );
    const [formData, setFormData] = useState<CategoryFormData>({
        name: '',
        descripiton: '',
        parentCategoryId: undefined,
    });
    const [search, setSearch] = useState('');

    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
        null
    );
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setError('Error loading categories.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingCategory) {
                await updateCategory(editingCategory.id, formData);
            } else {
                await createCategory(formData);
            }
            setShowModal(false);
            setEditingCategory(null);
            setFormData({
                name: '',
                descripiton: '',
                parentCategoryId: undefined,
            });
            fetchCategories();
        } catch (error) {
            console.error('Error saving category:', error);
        }
    };

    const handleEdit = (category: Category) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            descripiton: category.descripiton,
            parentCategoryId: category.subCategories?.length
                ? category.id
                : undefined,
        });
        setShowModal(true);
    };

    const handleAskDelete = (category: Category) => {
        setCategoryToDelete(category);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (!categoryToDelete) return;

        try {
            await deleteCategory(categoryToDelete.id);
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
        } finally {
            setShowDeleteModal(false);
            setCategoryToDelete(null);
        }
    };

    const openCreateModal = () => {
        setEditingCategory(null);
        setFormData({ name: '', descripiton: '', parentCategoryId: undefined });
        setShowModal(true);
    };

    // Get all categories for parent selection (flattened for dropdown)
    const getAllCategoriesForDropdown = (
        cats: Category[],
        level = 0
    ): Array<{ id: string; name: string; level: number }> => {
        let result: Array<{ id: string; name: string; level: number }> = [];
        cats.forEach((cat) => {
            result.push({
                id: cat.id,
                name: '─'.repeat(level) + ' ' + cat.name,
                level,
            });
            if (cat.subCategories && cat.subCategories.length > 0) {
                result = result.concat(
                    getAllCategoriesForDropdown(cat.subCategories, level + 1)
                );
            }
        });
        return result;
    };

    // Flatten categories for table display
    const flattenCategories = (
        cats: Category[],
        level = 0
    ): Array<Category & { displayLevel: number }> => {
        let result: Array<Category & { displayLevel: number }> = [];
        cats.forEach((cat) => {
            result.push({ ...cat, displayLevel: level });
            if (cat.subCategories && cat.subCategories.length > 0) {
                result = result.concat(
                    flattenCategories(cat.subCategories, level + 1)
                );
            }
        });
        return result;
    };

    const flattenedCategories = flattenCategories(categories);
    const filteredCategories = flattenedCategories.filter((category) =>
        category.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Categories Management
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Manage your product categories
                    </p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors flex items-center space-x-2"
                    style={{ backgroundColor: settings.primaryColor }}
                >
                    <FaPlus />
                    <span>Add Category</span>
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
                                placeholder="Search categories by name..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <div className="text-sm text-gray-500">
                        {filteredCategories.length} categories found
                    </div>
                </div>
            </div>

            {/* Categories Table */}
            <div className="bg-white shadow-sm rounded-lg border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Description
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Subcategories
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
                                        colSpan={4}
                                        className="px-6 py-4 text-center"
                                    >
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                                            <span className="ml-2 text-gray-600">
                                                Loading categories...
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-6 py-4 text-center text-red-500"
                                    >
                                        {error}
                                    </td>
                                </tr>
                            ) : filteredCategories.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-6 py-8 text-center"
                                    >
                                        <div className="text-gray-500">
                                            {search
                                                ? 'No categories found matching your search.'
                                                : 'No categories found.'}
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredCategories.map((category) => (
                                    <tr
                                        key={category.id}
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
                                                        <svg
                                                            className="w-5 h-5"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {'─'.repeat(
                                                            category.displayLevel
                                                        )}{' '}
                                                        {category.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        ID: {category.id}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {category.descripiton ||
                                                    'No description'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className="inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white"
                                                style={{
                                                    backgroundColor:
                                                        settings.primaryColor,
                                                }}
                                            >
                                                {category.subCategories
                                                    ?.length || 0}{' '}
                                                subcategories
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button
                                                    onClick={() =>
                                                        handleEdit(category)
                                                    }
                                                    className="text-blue-600 hover:text-blue-900 transition-colors"
                                                    title="Edit Category"
                                                >
                                                    <MdEdit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleAskDelete(
                                                            category
                                                        )
                                                    }
                                                    className="text-red-600 hover:text-red-900 transition-colors"
                                                    title="Delete Category"
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

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
                        <h2 className="text-xl font-bold mb-4">
                            {editingCategory
                                ? 'Edit Category'
                                : 'Create Category'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Parent Category
                                </label>
                                <select
                                    value={formData.parentCategoryId || ''}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            parentCategoryId:
                                                e.target.value || undefined,
                                        })
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">
                                        Main Category (No Parent)
                                    </option>
                                    {categories.length > 0 &&
                                        getAllCategoriesForDropdown(
                                            categories
                                        ).map((cat) => (
                                            <option
                                                key={cat.id}
                                                value={cat.id}
                                                disabled={
                                                    editingCategory
                                                        ? cat.id ===
                                                          editingCategory.id
                                                        : false
                                                }
                                            >
                                                {cat.name}
                                            </option>
                                        ))}
                                </select>
                                <p className="text-xs text-gray-500 mt-1">
                                    Select a parent category to create a
                                    subcategory, or leave empty for a main
                                    category.
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Description
                                </label>
                                <textarea
                                    value={formData.descripiton}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            descripiton: e.target.value,
                                        })
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    rows={3}
                                    placeholder="Enter category description..."
                                />
                            </div>
                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
                                    style={{
                                        backgroundColor: settings.primaryColor,
                                    }}
                                >
                                    {editingCategory ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            <ConfirmModal
                isOpen={showDeleteModal}
                title="Delete Category"
                message={`Are you sure you want to delete "${categoryToDelete?.name}"?`}
                onCancel={() => {
                    setShowDeleteModal(false);
                    setCategoryToDelete(null);
                }}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
};

export default CategoriesPage;
