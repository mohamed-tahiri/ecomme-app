import React, { useEffect, useState } from 'react';
import { AnnouncementDetails } from '../../../pages/CreateAnnouncementPage';
import { getCategories } from '../../../services/categoryService';
import { Store } from '../../../types/store';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/storeService';

interface Props {
    details: AnnouncementDetails;
    onChange: (updated: AnnouncementDetails) => void;
}

export const AnnouncementDetailsStep: React.FC<Props> = ({
    details,
    onChange,
}) => {
    const { user } = useAuth();
    const [categories, setCategories] = useState<Category[]>([]);
    const [stores, setStores] = useState<Store[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(
        null
    );
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const page = 1;
    const limit = 12;

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        onChange({ ...details, [name]: value });

        if (name === 'category') {
            const category = categories.find((c) => c.id === value);
            setSelectedCategory(category || null);
            // Reset subcategory if category changes
            onChange({ ...details, category: value, subCategory: '' });
        }

        if (name === 'subCategory') {
            onChange({ ...details, subCategory: value });
        }
    };

    const fetchStores = async () => {
        setLoading(true);
        setError(null);

        try {
            if (user?.id) {
                const response = await api.getStoresByOwner(user.id, {
                    page,
                    limit,
                });

                setStores(response.data);
            }
        } catch (err) {
            console.error(err);
            setError('Erreur lors du chargement des stores');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStores();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error('Erreur lors du chargement des catégories:', error);
            setError('Erreur lors du chargement des categories');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return loading ? (
        <p>Chargement en cours...</p>
    ) : error ? (
        <p className="text-red-500">{error}</p>
    ) : (
        <div className="space-y-4 flex flex-col">
            <input
                name="title"
                placeholder="Title"
                value={details.title}
                onChange={handleChange}
                className="input outline-0 p-2 border border-[var(--border-color)] rounded"
            />
            <textarea
                name="description"
                placeholder="Description"
                value={details.description}
                onChange={handleChange}
                className="input outline-0 p-2 border border-[var(--border-color)] rounded h-24 resize-none"
            />
            <input
                name="price"
                type="number"
                placeholder="Price"
                value={details.price}
                onChange={handleChange}
                className="input outline-0 p-2 border border-[var(--border-color)] rounded"
            />
            <input
                name="stock"
                type="number"
                placeholder="Stock"
                value={details.stock}
                onChange={handleChange}
                className="input outline-0 p-2 border border-[var(--border-color)] rounded"
            />

            <select
                name="storeId"
                value={details.storeId}
                onChange={handleChange}
                className="input outline-0 p-2 border border-[var(--border-color)] rounded"
            >
                <option value="">Select a store</option>
                {stores.map((store) => (
                    <option key={store.id} value={store.id}>
                        {store.name}
                    </option>
                ))}
            </select>

            <select
                name="category"
                value={details.category}
                onChange={handleChange}
                className="input outline-0 p-2 border border-[var(--border-color)] rounded"
            >
                <option value="">Select a category</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>

            {selectedCategory && selectedCategory.subCategories.length > 0 && (
                <div className="space-y-2">
                    <label className="block font-medium">
                        Sous-catégorie :
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {selectedCategory.subCategories.map((sub) => (
                            <label
                                key={sub.id}
                                className={`flex items-center gap-2 p-2 border rounded-lg cursor-pointer transition ${
                                    details.subCategory === sub.id
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-300'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="subCategory"
                                    value={sub.id}
                                    checked={details.subCategory === sub.id}
                                    onChange={handleChange}
                                    className="accent-blue-500"
                                />
                                <span>{sub.name}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
