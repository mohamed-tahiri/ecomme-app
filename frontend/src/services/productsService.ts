import api from './api';
import { Product } from '../types/product';

interface ProductFilters {
    name?: string;
    price?: string; // Exemple: "100,200"
    page?: number;
    limit?: number;
}

interface CreateProductPayload {
    name: string;
    description?: string;
    price: number;
    stock: number;
    categoryId: string;
    storeId: string | null;
    vendorId: string | null;
}

const getProducts = async (
    filters: ProductFilters = {}
): Promise<{ data: Product[]; totalCount: number; totalPages: number }> => {
    try {
        const response = await api.get('/products', { params: filters });
        return {
            data: response.data.data,
            totalCount: response.data.pagination.totalCount,
            totalPages: response.data.pagination.totalPages,
        };
    } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
        throw error;
    }
};

const getImagesByProduct = async (productId: string): Promise<any[]> => {
    try {
        const response = await api.get(`/images/${productId}`);
        return response.data;
    } catch (error) {
        console.error(
            `Erreur lors de la récupération des images pour le produit (${productId}) :`,
            error
        );
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
): Promise<{ data: Product[]; totalCount: number; totalPages: number }> => {
    try {
        const response = await api.get(`/products/category/${slug}`, {
            params: filters,
        });
        return {
            data: response.data.data,
            totalCount: response.data.pagination.totalCount,
            totalPages: response.data.pagination.totalPages,
        };
    } catch (error) {
        console.error(
            `Erreur lors de la récupération des produits pour la catégorie (${slug}) :`,
            error
        );
        throw error;
    }
};

const getProductsBySlugStore = async (
    slug: string,
    filters: ProductFilters = {}
): Promise<{ data: Product[]; totalCount: number; totalPages: number }> => {
    try {
        const response = await api.get(`/products/store/${slug}`, {
            params: filters,
        });
        return {
            data: response.data.data,
            totalCount: response.data.pagination.totalCount,
            totalPages: response.data.pagination.totalPages,
        };
    } catch (error) {
        console.error(
            `Erreur lors de la récupération des produits pour le store (${slug}) :`,
            error
        );
        throw error;
    }
};

const getProductsByVendor = async (
    vendor: string,
    filters: ProductFilters = {}
): Promise<{ data: Product[]; totalCount: number; totalPages: number }> => {
    try {
        const response = await api.get(`/products/vendor/${vendor}`, {
            params: filters,
        });
        return {
            data: response.data.data,
            totalCount: response.data.pagination.totalCount,
            totalPages: response.data.pagination.totalPages,
        };
    } catch (error) {
        console.error(
            `Erreur lors de la récupération des produits pour id vendeur (${vendor}) :`,
            error
        );
        throw error;
    }
};

const createProduct = async (
    payload: CreateProductPayload
): Promise<Product> => {
    try {
        const response = await api.post('/products', payload);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création du produit :', error);
        throw error;
    }
};

export default {
    getProducts,
    createProduct,
    getProductBySlug,
    getProductsByVendor,
    getProductsBySlugCategory,
    getProductsBySlugStore,
    getImagesByProduct,
};
