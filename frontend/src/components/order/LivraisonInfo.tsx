// src/components/order/LivraisonInfo.tsx
import React, { useState } from 'react';

const LivraisonInfo: React.FC = () => {
    const [formData, setFormData] = useState({
        nom: '',
        adresse: '',
        ville: '',
        codePostal: '',
        pays: 'Maroc',
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: { [key: string]: string } = {};
        Object.entries(formData).forEach(([key, value]) => {
            if (!value.trim()) {
                newErrors[key] = 'Ce champ est requis';
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log('Infos de livraison:', formData);
            // envoyer au backend ou contexte plus tard
        }
    };

    return (
        <div className="bg-white border border-[#e1e3e4] rounded p-6 space-y-4">
            <h3 className="estimation-heading">Adresse de livraison</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Nom complet
                        </label>
                        <input
                            type="text"
                            name="nom"
                            placeholder="john wick"
                            value={formData.nom}
                            onChange={handleChange}
                            className="input w-full outline-0 border border-[var(--border-color)] p-2"
                        />
                        {errors.nom && (
                            <p className="text-red-500 text-sm">{errors.nom}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Ville
                        </label>
                        <input
                            type="text"
                            name="ville"
                            placeholder="paris"
                            value={formData.ville}
                            onChange={handleChange}
                            className="input w-full outline-0 border border-[var(--border-color)] p-2"
                        />
                        {errors.ville && (
                            <p className="text-red-500 text-sm">
                                {errors.ville}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Adresse
                        </label>
                        <input
                            type="text"
                            name="adresse"
                            placeholder="ex: hsasakjd kjsahdhkj"
                            value={formData.adresse}
                            onChange={handleChange}
                            className="input w-full outline-0 border border-[var(--border-color)] p-2"
                        />
                        {errors.adresse && (
                            <p className="text-red-500 text-sm">
                                {errors.adresse}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Code postal
                        </label>
                        <input
                            type="text"
                            name="codePostal"
                            placeholder="75000"
                            value={formData.codePostal}
                            onChange={handleChange}
                            className="input w-full outline-0 border border-[var(--border-color)] p-2"
                        />
                        {errors.codePostal && (
                            <p className="text-red-500 text-sm">
                                {errors.codePostal}
                            </p>
                        )}
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium mb-1">
                            Pays
                        </label>
                        <select
                            name="pays"
                            value={formData.pays}
                            onChange={handleChange}
                            className="input w-full outline-0 border border-[var(--border-color)] p-2"
                        >
                            <option value="Maroc">Maroc</option>
                            <option value="France">France</option>
                            <option value="Espagne">Espagne</option>
                        </select>
                        {errors.pays && (
                            <p className="text-red-500 text-sm">
                                {errors.pays}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="flex items-center justify-center bg-[var(--primary-button-background)] cursor-pointer text-white px-12 py-3 flex-center"
                    >
                        Valider l’adresse
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LivraisonInfo;
