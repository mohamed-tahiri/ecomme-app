import { useState } from 'react';
import api from '../services/api';

const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', { email, password });
            setMessage('Inscription réussie ! Vous pouvez vous connecter.');
        } catch (err) {
            setMessage("Erreur lors de l'inscription.");
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Inscription</h1>
            {message && <p className="text-green-500">{message}</p>}
            <form onSubmit={handleRegister} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 border rounded w-full"
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 border rounded w-full"
                />
                <button
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded w-full"
                >
                    S'inscrire
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
