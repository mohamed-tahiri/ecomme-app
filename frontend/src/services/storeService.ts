import api from './api';
import { Store } from '../types/store';

interface StoreFilters {
    page?: number;
    limit?: number;
}

interface CreateStorePayload {
    name: string;
    description?: string;
    ownerId: string;
}

const getStoresByOwner = async (
    ownerId: string,
    filters: StoreFilters = {}
): Promise<{ data: Store[]; totalCount: number; totalPages: number }> => {
    try {
        const response = await api.get(`/stores/owner/${ownerId}`, {
            params: filters,
        });
        return {
            data: response.data.data,
            totalCount: response.data.pagination.totalCount,
            totalPages: response.data.pagination.totalPages,
        };
    } catch (error) {
        console.error('Erreur lors de la récupération des stores :', error);
        throw error;
    }
};

const getStoreBySlug = async (slug: string): Promise<Store> => {
    try {
        const response = await api.get(`/stores/slug/${slug}`);
        return response.data;
    } catch (error) {
        console.error(
            `Erreur lors de la récupération du store (${slug}) :`,
            error
        );
        throw error;
    }
};

const getStoreById = async (id: string): Promise<Store> => {
    try {
        const response = await api.get(`/stores/${id}`);
        return response.data;
    } catch (error) {
        console.error(
            `Erreur lors de la récupération du store (${id}) :`,
            error
        );
        throw error;
    }
};

const createStore = async (payload: CreateStorePayload): Promise<Store> => {
    try {
        const response = await api.post('/stores', payload);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création du produit :', error);
        throw error;
    }
};

export default {
    getStoreById,
    getStoreBySlug,
    getStoresByOwner,
    createStore,
};
