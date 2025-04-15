import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const RegisterCart: React.FC<{}> = () => {
    const { register: contextRegister, setActiveCart } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async () => {
        try {
            setLoading(true);
            setError('');
            setSuccess('');
            await contextRegister(name, email, password);

            setSuccess('Inscription réussie ! Vous pouvez vous connecter.');

            setTimeout(() => {
                setSuccess('');
            }, 3000);
        } catch (err: any) {
            setError('Une erreur est survenue lors de l’inscription.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col items-center">
                <h5 className="card-page-garantie-heading">
                    Création de compte
                </h5>
                <p className="mt-2 text-center px-2">
                    Entrez les informations suivantes :
                </p>
            </div>
            <div className="mb-6 space-y-3">
                <input
                    placeholder="Nom complet"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 py-3 px-2"
                />
                <input
                    placeholder="Email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 py-3 px-2"
                />
                <input
                    placeholder="Mot de passe"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 py-3 px-2"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-600 text-sm">{success}</p>}
            </div>
            <button
                disabled={loading}
                onClick={handleRegister}
                className="w-full bg-[var(--primary-button-background)] text-white py-2 rounded cursor-pointer"
            >
                {loading ? 'Inscription...' : 'Créer mon compte'}
            </button>
            <div className="text-xs text-center space-y-2">
                <p>
                    Vous avez déjà un compte ?{' '}
                    <span
                        className="text-[var(--secondary-button-background)] cursor-pointer"
                        onClick={() => setActiveCart('login')}
                    >
                        Se connecter
                    </span>
                </p>
            </div>
        </div>
    );
};

export default RegisterCart;
