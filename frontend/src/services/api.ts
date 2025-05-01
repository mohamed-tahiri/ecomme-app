import axios from 'axios';
import { refreshToken } from './authService';

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

        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const refresh_token = localStorage.getItem('refresh_token');
                if (refresh_token) {
                    const data = await refreshToken(refresh_token);

                    localStorage.setItem('access_token', data.accessToken);

                    originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                console.error(
                    'Erreur de rafraîchissement du token',
                    refreshError
                );
            }
        }

        return Promise.reject(error);
    }
);

export default api;
