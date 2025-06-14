// src/services/reviewService.ts
import { Review, ReviewOverview } from '../types/review';
import api from './api';

// 1. Récupérer tous les avis d’un produit
export const getReviewsByProduct = async (
    productId: string
): Promise<Review[]> => {
    try {
        const response = await api.get(`/reviews/product/${productId}`);
        return response.data;
    } catch (error) {
        console.error(
            `Erreur lors de la récupération des avis pour le produit ${productId}`,
            error
        );
        throw error;
    }
};

// 7. Récupérer les 10 derniers avis + stats globales
export const getGlobalReviewOverview = async (): Promise<ReviewOverview> => {
    try {
        const response = await api.get('/reviews');
        return response.data;
    } catch (error) {
        console.error(
            'Erreur lors de la récupération des stats globales',
            error
        );
        throw error;
    }
};

// 2. Récupérer un avis par ID
export const getReviewById = async (id: string): Promise<Review> => {
    try {
        const response = await api.get(`/reviews/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la récupération de l'avis ${id}`, error);
        throw error;
    }
};

// 3. Créer un nouvel avis
export const createReview = async (
    review: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Review> => {
    try {
        const response = await api.post('/reviews', review);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création de l’avis', error);
        throw error;
    }
};

// 4. Mettre à jour un avis
export const updateReview = async (
    id: string,
    review: Partial<Omit<Review, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Review> => {
    try {
        const response = await api.put(`/reviews/${id}`, review);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la mise à jour de l’avis ${id}`, error);
        throw error;
    }
};

// 5. Supprimer un avis
export const deleteReview = async (id: string): Promise<void> => {
    try {
        await api.delete(`/reviews/${id}`);
    } catch (error) {
        console.error(`Erreur lors de la suppression de l’avis ${id}`, error);
        throw error;
    }
};

// 6. Récupérer les statistiques d’avis (moyenne + nombre d’avis)
export const getReviewStats = async (
    productId: string
): Promise<{ average: number; count: number }> => {
    try {
        const response = await api.get(`/reviews/product/${productId}/stats`);
        return response.data;
    } catch (error) {
        console.error(
            `Erreur lors de la récupération des stats pour ${productId}`,
            error
        );
        throw error;
    }
};
