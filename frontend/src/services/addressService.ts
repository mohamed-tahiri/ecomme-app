import { Address } from '../types/address';
import api from './api';

// Récupérer toutes les adresses d'un utilisateur
export const getAdressesByUser = async (userId: string): Promise<Address[]> => {
    try {
        const response = await api.get(`addresses/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching addresses for user ${userId}:`, error);
        throw error;
    }
};

// Récupérer une adresse par ID
export const getAdresseById = async (id: string): Promise<Address> => {
    try {
        const response = await api.get(`addresses/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching address with ID ${id}:`, error);
        throw error;
    }
};

// Créer une nouvelle adresse
export const createAdresse = async (
    adresse: Omit<Address, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Address> => {
    try {
        const response = await api.post('addresses', adresse);
        return response.data;
    } catch (error) {
        console.error('Error creating address:', error);
        throw error;
    }
};

// Mettre à jour une adresse
export const updateAdresse = async (
    id: string,
    adresse: Partial<Omit<Address, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Address> => {
    try {
        const response = await api.put(`addresses/${id}`, adresse);
        return response.data;
    } catch (error) {
        console.error(`Error updating address with ID ${id}:`, error);
        throw error;
    }
};

// Supprimer une adresse
export const deleteAdresse = async (id: string): Promise<void> => {
    try {
        await api.delete(`addresses/${id}`);
    } catch (error) {
        console.error(`Error deleting address with ID ${id}:`, error);
        throw error;
    }
};
