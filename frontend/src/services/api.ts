import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { AuthResponse } from '../services/authService';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Uses the environment variable
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const { auth, refreshAuthToken } = useAuth();

        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            if (auth?.refreshToken) {
                try {
                    await refreshAuthToken();

                    const token = localStorage.getItem('access_token');
                    originalRequest.headers['Authorization'] =
                        `Bearer ${token}`;
                    return api(originalRequest);
                } catch (refreshError) {
                    console.error(
                        'Erreur de rafraîchissement du token',
                        refreshError
                    );
                }
            }
        }

        return Promise.reject(error);
    }
);

export default api;
