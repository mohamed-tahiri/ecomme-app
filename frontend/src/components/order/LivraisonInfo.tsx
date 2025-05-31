// src/components/order/LivraisonInfo.tsx
import React, { useEffect, useState } from 'react';
import {
    createAdresse,
    getAdressesByUser,
    updateAdresse,
} from '../../services/addressService';
import { useAuth } from '../../context/AuthContext';
import { Address } from '../../types/address';

const initialForm = {
    street: '',
    city: '',
    country: 'Maroc',
    zipCode: '',
    userId: '',
};

const LivraisonInfo: React.FC = () => {
    const { auth } = useAuth();
    const userId = auth?.user.id ?? '';

    const [formData, setFormData] = useState({ ...initialForm, userId });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [adresses, setAdresses] = useState<Address[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [mode, setMode] = useState<'select' | 'edit' | 'create'>('select');

    useEffect(() => {
        if (userId) {
            fetchAddresses();
        }
    }, [userId]);

    const fetchAddresses = async () => {
        try {
            const data = await getAdressesByUser(userId);
            setAdresses(data);
        } catch (error) {
            console.error('Erreur lors du chargement des adresses:', error);
        }
    };

    const handleSelect = (id: string) => {
        const selected = adresses.find((a) => a.id === id);
        if (selected) {
            setSelectedId(id);
            setFormData({
                street: selected.street,
                city: selected.city,
                country: selected.country,
                zipCode: selected.zipCode,
                userId,
            });
            setMode('edit');
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: { [key: string]: string } = {};
        Object.entries(formData).forEach(([key, value]) => {
            if (!value.trim()) newErrors[key] = 'Ce champ est requis';
        });

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        try {
            if (mode === 'edit' && selectedId) {
                await updateAdresse(selectedId, formData);
            } else {
                await createAdresse(formData);
            }

            await fetchAddresses();
            setFormData({ ...initialForm, userId });
            setSelectedId(null);
            setMode('select');
        } catch (error) {
            console.error('Erreur lors de la sauvegarde de l’adresse', error);
        }
    };

    return (
        <div className="bg-white border border-[#e1e3e4] rounded p-6 space-y-6">
            <h3 className="estimation-heading">Adresse de livraison</h3>

            {mode === 'select' && (
                <>
                    {adresses.length > 0 ? (
                        <div className="space-y-4">
                            {adresses.map((a) => (
                                <div
                                    key={a.id}
                                    className={`border p-4 cursor-pointer ${
                                        selectedId === a.id
                                            ? 'border-blue-500'
                                            : 'border-gray-300'
                                    }`}
                                    onClick={() => handleSelect(a.id)}
                                >
                                    <p className="font-medium">{a.street}</p>
                                    <p>
                                        {a.city}, {a.zipCode}
                                    </p>
                                    <p>{a.country}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Aucune adresse trouvée.</p>
                    )}
                    <button
                        className="mt-4 text-blue-600 underline cursor-pointer"
                        onClick={() => {
                            setFormData({ ...initialForm, userId });
                            setMode('create');
                            setSelectedId(null);
                        }}
                    >
                        + Ajouter une nouvelle adresse
                    </button>
                </>
            )}

            {(mode === 'create' || mode === 'edit') && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Rue
                            </label>
                            <input
                                type="text"
                                name="street"
                                placeholder="John Wick Street"
                                value={formData.street}
                                onChange={handleChange}
                                className="input w-full border p-2"
                            />
                            {errors.street && (
                                <p className="text-red-500 text-sm">
                                    {errors.street}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Ville
                            </label>
                            <input
                                type="text"
                                name="city"
                                placeholder="Casablanca"
                                value={formData.city}
                                onChange={handleChange}
                                className="input w-full border p-2"
                            />
                            {errors.city && (
                                <p className="text-red-500 text-sm">
                                    {errors.city}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Code postal
                            </label>
                            <input
                                type="text"
                                name="zipCode"
                                placeholder="10000"
                                value={formData.zipCode}
                                onChange={handleChange}
                                className="input w-full border p-2"
                            />
                            {errors.zipCode && (
                                <p className="text-red-500 text-sm">
                                    {errors.zipCode}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Pays
                            </label>
                            <select
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className="input w-full border p-2"
                            >
                                <option value="Maroc">Maroc</option>
                                <option value="France">France</option>
                                <option value="Espagne">Espagne</option>
                            </select>
                            {errors.country && (
                                <p className="text-red-500 text-sm">
                                    {errors.country}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={() => {
                                setFormData({ ...initialForm, userId });
                                setMode('select');
                                setSelectedId(null);
                            }}
                            className="px-4 py-2 border border-gray-400"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white"
                        >
                            {mode === 'edit' ? 'Modifier' : 'Ajouter'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default LivraisonInfo;
