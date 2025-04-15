import api from './api';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: {
        email: string;
        role: string;
        name: string;
    };
}

// Connexion utilisateur
export const login = async (
    credentials: LoginRequest
): Promise<AuthResponse> => {
    try {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        throw error;
    }
};

// Inscription utilisateur
export const register = async (
    data: RegisterRequest
): Promise<AuthResponse> => {
    try {
        const response = await api.post('/auth/register', data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l’inscription :', error);
        throw error;
    }
};

// Demande de réinitialisation du mot de passe
export const forgetPassword = async (email: string): Promise<void> => {
    try {
        await api.post('/auth/forget-password', { email });
    } catch (error) {
        console.error(
            'Erreur lors de la demande de mot de passe oublié :',
            error
        );
        throw error;
    }
};

// Rafraîchir le token
export const refreshToken = async (token: string): Promise<AuthResponse> => {
    try {
        const response = await api.post('/auth/refresh-token', {
            refresh_token: token,
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors du rafraîchissement du token :', error);
        throw error;
    }
};

export const logout = async (): Promise<void> => {
    try {
        await api.post('/auth/logout');
    } catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
        throw error;
    }
};
