// src/pages/account/CreateStorePage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import api from '../services/storeService';
import { useAuth } from '../context/AuthContext';

const CreateStorePage: React.FC = () => {
    const { user } = useAuth();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!user?.id) return;

            const payload = {
                name,
                description,
                ownerId: user.id,
            };

            const res = await api.createStore(payload);

            console.log(res);

            navigate('/account/stores');
        } catch (err) {
            console.error(err);
            setError('Erreur lors de la création de la boutique.');
        }
    };

    return (
        <div className="space-y-4">
            <h1 className="product-detail-header-text text-center">
                Créer une boutique
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
                <input
                    name="name"
                    placeholder="Nom de la boutique"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input outline-0 p-2 border border-[var(--border-color)] rounded"
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="input outline-0 p-2 border border-[var(--border-color)] rounded h-24 resize-none"
                />
                {error && <p className="text-red-500">{error}</p>}
                <Button type="submit" className="btn btn-primary">
                    Créer
                </Button>
            </form>
        </div>
    );
};

export default CreateStorePage;
