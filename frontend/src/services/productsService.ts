import api from './api';
import { Product } from '../types/product';

interface ProductFilters {
    name?: string;
    price?: string; // Exemple: "100,200"
    page?: number;
    limit?: number;
}

const getProducts = async (
    filters: ProductFilters = {}
): Promise<{ data: Product[]; totalCount: number }> => {
    try {
        const response = await api.get('/products', { params: filters });
        return {
            data: response.data.data,
            totalCount: response.data.pagination.totalCount,
        };
    } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
        throw error;
    }
};

const getProductBySlug = async (slug: string): Promise<Product> => {
    try {
        const response = await api.get(`/products/slug/${slug}`);
        return response.data;
    } catch (error) {
        console.error(
            `Erreur lors de la récupération du produit (${slug}) :`,
            error
        );
        throw error;
    }
};

const getProductsBySlugCategory = async (
    slug: string,
    filters: ProductFilters = {}
): Promise<{ data: Product[]; totalCount: number }> => {
    try {
        const response = await api.get(`/products/category/${slug}`, {
            params: filters,
        });
        return {
            data: response.data.data,
            totalCount: response.data.pagination.totalCount,
        };
    } catch (error) {
        console.error(
            `Erreur lors de la récupération des produits pour la catégorie (${slug}) :`,
            error
        );
        throw error;
    }
};

export default {
    getProducts,
    getProductBySlug,
    getProductsBySlugCategory,
};
