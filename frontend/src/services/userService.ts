import { PaginatedUsers, User } from '../types/user';
import api from './api';

// Fetch users with pagination
export const getUsers = async (
    page = 1,
    limit = 10
): Promise<PaginatedUsers> => {
    try {
        const response = await api.get('/users', { params: { page, limit } });
        return response.data;
    } catch (error) {
        console.error(
            'Erreur lors de la récupération des utilisateurs :',
            error
        );
        throw error;
    }
};
