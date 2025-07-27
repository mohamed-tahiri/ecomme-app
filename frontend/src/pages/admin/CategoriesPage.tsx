// src/pages/admin/CategoriesPage.tsx
import React, { useState, useEffect } from 'react';
import { Category } from '../../types/category';
import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from '../../services/categoryService';

interface CategoryFormData {
    name: string;
    descripiton: string;
    parentCategoryId?: string;
}

const CategoriesPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(
        null
    );
    const [formData, setFormData] = useState<CategoryFormData>({
        name: '',
        descripiton: '',
        parentCategoryId: undefined,
    });

    // Track expanded categories
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
        new Set()
    );

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const data = await getCategories();
            console.log(data);
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleExpanded = (categoryId: string) => {
        const newExpanded = new Set(expandedCategories);
        if (newExpanded.has(categoryId)) {
            newExpanded.delete(categoryId);
        } else {
            newExpanded.add(categoryId);
        }
        setExpandedCategories(newExpanded);
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

    const handleDelete = async (categoryId: string) => {
        if (confirm('Are you sure you want to delete this category?')) {
            try {
                await deleteCategory(categoryId);
                fetchCategories();
            } catch (error) {
                console.error('Error deleting category:', error);
            }
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

    const renderCategoryItem = (category: Category, level = 0) => {
        const hasSubCategories =
            category.subCategories && category.subCategories.length > 0;
        const isExpanded = expandedCategories.has(category.id);

        return (
            <div key={category.id} className="border-b border-gray-200">
                <div
                    className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                        level > 0 ? 'ml-6' : ''
                    }`}
                >
                    <div className="flex items-center space-x-3">
                        {/* Expand/Collapse button */}
                        {hasSubCategories && (
                            <button
                                onClick={() => toggleExpanded(category.id)}
                                className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                {isExpanded ? (
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                )}
                            </button>
                        )}

                        {/* Category icon */}
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg
                                className="w-4 h-4 text-blue-600"
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

                        {/* Category info */}
                        <div className="flex-1">
                            <h3 className="font-medium text-gray-900">
                                {category.name}
                            </h3>
                            {category.descripiton && (
                                <p className="text-sm text-gray-500 mt-1">
                                    {category.descripiton}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => handleEdit(category)}
                            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(category.id)}
                            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </div>

                {/* Subcategories */}
                {hasSubCategories && isExpanded && (
                    <div className="bg-gray-50">
                        {category.subCategories.map((subCategory) =>
                            renderCategoryItem(subCategory, level + 1)
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Categories
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Manage your product categories
                    </p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                    <span>Add Category</span>
                </button>
            </div>

            {/* Categories Tree */}
            <div className="bg-white shadow-sm rounded-lg border overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="text-gray-600 mt-2">
                            Loading categories...
                        </p>
                    </div>
                ) : categories.length === 0 ? (
                    <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="w-8 h-8 text-gray-400"
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
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No categories yet
                        </h3>
                        <p className="text-gray-500">
                            Get started by creating your first category.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {categories.map((category) =>
                            renderCategoryItem(category)
                        )}
                    </div>
                )}
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
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    {editingCategory ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoriesPage;
