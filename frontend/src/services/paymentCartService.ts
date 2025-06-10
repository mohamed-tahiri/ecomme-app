// services/paymentCart.service.ts
import { PaymentCart } from '../types/paymentCart';
import api from './api';

// Récupérer la carte de paiement d'un utilisateur
export const getPaymentCartByUser = async (
    userId: string
): Promise<PaymentCart[] | null> => {
    try {
        const response = await api.get(`payment-carts/user/${userId}`);
        return response.data;
    } catch (error: any) {
        // Si pas de carte trouvée, renvoyer null
        if (error.response && error.response.status === 404) {
            return null;
        }
        console.error(
            `Erreur récupération carte pour utilisateur ${userId} :`,
            error
        );
        throw error;
    }
};

// Créer une nouvelle carte
export const createPaymentCart = async (
    cart: Omit<PaymentCart, 'id'>
): Promise<PaymentCart> => {
    try {
        const response = await api.post('payment-carts', cart);
        return response.data;
    } catch (error) {
        console.error('Erreur création carte :', error);
        throw error;
    }
};

// Mettre à jour une carte existante (par id)
export const updatePaymentCart = async (
    id: string,
    cart: Partial<Omit<PaymentCart, 'id' | 'user'>>
): Promise<PaymentCart> => {
    try {
        const response = await api.put(`payment-carts/${id}`, cart);
        return response.data;
    } catch (error) {
        console.error(`Erreur mise à jour carte ${id} :`, error);
        throw error;
    }
};

// Supprimer une carte par id
export const deletePaymentCart = async (id: string): Promise<void> => {
    try {
        await api.delete(`payment-carts/${id}`);
    } catch (error) {
        console.error(`Erreur suppression carte ${id} :`, error);
        throw error;
    }
};
