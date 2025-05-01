import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthResponse, login, register, logout } from '../services/authService';

interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}

interface AuthContextType {
    auth: AuthResponse | null;
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    activeCart: 'login' | 'register' | 'forget' | 'info';
    setActiveCart: React.Dispatch<
        React.SetStateAction<'login' | 'register' | 'forget' | 'info'>
    >;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [auth, setAuth] = useState<AuthResponse | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [activeCart, setActiveCart] = useState<
        'login' | 'register' | 'forget' | 'info'
    >('login');
    const [loading, setLoading] = useState(true);

    // Initialiser l'état de l'utilisateur à partir du localStorage
    useEffect(() => {
        const user = localStorage.getItem('user');
        const accessToken = localStorage.getItem('access_token');
        if (user && accessToken) {
            setAuth({
                user: JSON.parse(user),
                accessToken,
                refreshToken: localStorage.getItem('refresh_token') || '',
            });
            setActiveCart('info');
            setUser(JSON.parse(user));
            setLoading(false);
        }
        setLoading(false);
    }, []);

    // Connexion de l'utilisateur
    const handleLogin = async (email: string, password: string) => {
        const res = await login({ email, password });
        localStorage.setItem('access_token', res.accessToken);
        localStorage.setItem('refresh_token', res.refreshToken);
        localStorage.setItem('user', JSON.stringify(res.user));
        setUser(res.user);
        setAuth(res);
        setActiveCart('info');
    };

    // inscription de l'utilisateur
    const handleRegister = async (
        name: string,
        email: string,
        password: string
    ) => {
        const res = await register({ name, email, password });
        setAuth(res);
        setActiveCart('login');
    };

    // Déconnexion de l'utilisateur
    const handleLogout = async () => {
        await logout();

        setUser(null);
        setAuth(null);
        setActiveCart('login');
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
                user,
                setUser,
                loading,
                login: handleLogin,
                register: handleRegister,
                logout: handleLogout,
                activeCart,
                setActiveCart,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Hook personnalisé pour accéder au contexte
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
