import api from './api';
import { Category } from '../types/category';

// Récupérer toutes les catégories
export const getCategories = async (): Promise<Category[]> => {
    try {
        const response = await api.get('categories');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

// Récupérer une catégorie par ID
export const getCategoryById = async (id: string): Promise<Category> => {
    try {
        const response = await api.get(`categories/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching category with ID ${id}:`, error);
        throw error;
    }
};

// Récupérer une catégorie par son slug
export const getCategoryBySlug = async (slug: string): Promise<Category> => {
    try {
        const response = await api.get(`categories/slug/${slug}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching category with slug ${slug}:`, error);
        throw error;
    }
};

interface CategoryFormData {
    name: string;
    descripiton: string;
    parentCategoryId?: string;
}

// Créer une nouvelle catégorie
export const createCategory = async (
    category: CategoryFormData
): Promise<Category> => {
    try {
        const response = await api.post(`categories`, category);
        return response.data;
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    }
};

// Mettre à jour une catégorie existante
export const updateCategory = async (
    id: string,
    category: CategoryFormData
): Promise<Category> => {
    try {
        const response = await api.put(`categories/${id}`, category);
        return response.data;
    } catch (error) {
        console.error(`Error updating category with ID ${id}:`, error);
        throw error;
    }
};

// Supprimer une catégorie
export const deleteCategory = async (id: string): Promise<void> => {
    try {
        await api.delete(`categories/${id}`);
    } catch (error) {
        console.error(`Error deleting category with ID ${id}:`, error);
        throw error;
    }
};
