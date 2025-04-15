import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

type LoginCartProps = {
    onLogin: (user: { email: string; role: string; name: string }) => void;
};

const LoginCart: React.FC<LoginCartProps> = ({ onLogin }) => {
    const { login: contextLogin, setActiveCart } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            setLoading(true);
            setError('');
            await contextLogin(email, password);

            setSuccess('Connexion réussie !');
            setTimeout(() => setSuccess(''), 3000);

            const user = JSON.parse(localStorage.getItem('user') || '{}');
            onLogin(user);
        } catch (err: any) {
            setError('Email ou mot de passe incorrect');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col items-center">
                <h5 className="card-page-garantie-heading">Connexion</h5>
                <p className="mt-2 text-center px-2">
                    Entrez votre email et votre mot de passe :
                </p>
            </div>
            <div className="mb-6 space-y-3">
                <input
                    placeholder="Votre email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 py-3 px-2"
                />
                <input
                    placeholder="Votre mot de passe"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 py-3 px-2"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}
            </div>
            <button
                disabled={loading}
                onClick={handleLogin}
                className="w-full bg-[var(--primary-button-background)] text-white py-2 rounded cursor-pointer"
            >
                {loading ? 'Connexion...' : 'Se connecter'}
            </button>
            <div className="text-xs text-center space-y-2">
                <p>
                    Nouveau client ?{' '}
                    <span
                        className="text-[var(--secondary-button-background)] cursor-pointer"
                        onClick={() => setActiveCart('register')}
                    >
                        Créez votre compte
                    </span>
                </p>
                <p>
                    Mot de passe perdu ?{' '}
                    <span
                        className="text-[var(--secondary-button-background)] cursor-pointer"
                        onClick={() => setActiveCart('forget')}
                    >
                        Récupérer mon mot de passe
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LoginCart;
