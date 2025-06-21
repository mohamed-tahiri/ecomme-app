// DEV: MED TAHIRI

// src/services/orderService.ts
import { Order, OrderCreationPayload, OrderGetById, OrderWithItems } from '../types/order';
import { Product } from '../types/product';
import api from './api';

// Créer une nouvelle commande
export const createOrder = async (
    orderData: OrderCreationPayload
): Promise<Order> => {
    try {
        const response = await api.post('orders', orderData);
        return response.data;
    } catch (error: any) {
        //Type any pour eviter des problemes
        console.error(
            'Error creating order:',
            error.response?.data || error.message || error
        );
        throw error;
    }
};

// Récupérer les commandes d'un utilisateur
export const getUserOrders = async (userId: string): Promise<OrderWithItems[]> => {
    try {
        const response = await api.get(`orders/user/${userId}`);
        return response.data;
    } catch (error: any) {
        console.error(
            `Error fetching orders for user ${userId}:`,
            error.response?.data || error.message || error
        );
        throw error;
    }
};

// // Mettre à jour le statut de paiement d'une commande
export const updatePaymentStatus = async (
    orderId: string,
    paymentStatus: string
): Promise<Order> => {
    try {
        const response = await api.patch(`orders/${orderId}/payment-status`, {
            paymentStatus,
        });
        return response.data;
    } catch (error: any) {
        console.error(
            `Error updating payment status for order ${orderId}:`,
            error.response?.data || error.message || error
        );
        throw error;
    }
};

// Récupérer une commande par ID (peut être utile pour afficher les détails)
export const getOrderById = async (orderId: string): Promise<OrderGetById> => {
    try {
        const response = await api.get(`orders/${orderId}`);
        return response.data;
    } catch (error: any) {
        console.error(
            `Error fetching order with ID ${orderId}:`,
            error.response?.data || error.message || error
        );
        throw error;
    }
};

// Récupérer les produits similaires pour une commande
export const getSimilarProductsByOrder = async (
    orderId: string
): Promise<Product[]> => {
    try {
        const response = await api.get(`orders/${orderId}/similar-products`);
        return response.data;
    } catch (error: any) {
        console.error(
            `Erreur lors de la récupération des produits similaires pour la commande ${orderId}:`,
            error.response?.data || error.message || error
        );
        throw error;
    }
};
