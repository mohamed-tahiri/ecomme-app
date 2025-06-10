// src/components/filters/ProductFilter.tsx
import React from 'react';
import { Button } from '../ui/Button';

interface ProductFilterProps {
    className?: string;
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    priceRange: string;
    setPriceRange: (value: string) => void;
    sortBy: string;
    setSortBy: (value: string) => void;
    availableOnly: boolean;
    setAvailableOnly: (value: boolean) => void;
    minRating: number;
    setMinRating: (value: number) => void;
    onReset: () => void;
    onApply: () => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
    className = '', // <== Valeur par défaut vide
    searchTerm,
    setSearchTerm,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    availableOnly,
    setAvailableOnly,
    minRating,
    setMinRating,
    onReset,
    onApply,
}) => {
    return (
        <div className={`card self-start ${className}`}>
            <h1 className="card-text-heading">Filtres</h1>

            <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 rounded mb-4 w-full"
            />

            <input
                type="text"
                placeholder="Prix min,max (ex: 100,200)"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="border p-2 rounded mb-4 w-full"
            />

            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border p-2 rounded mb-4 w-full"
            >
                <option value="">Trier par</option>
                <option value="price_asc">Prix croissant</option>
                <option value="price_desc">Prix décroissant</option>
                <option value="newest">Nouveautés</option>
                <option value="rating">Meilleures notes</option>
            </select>

            <label className="flex items-center mb-4">
                <input
                    type="checkbox"
                    checked={availableOnly}
                    onChange={(e) => setAvailableOnly(e.target.checked)}
                    className="mr-2"
                />
                Disponible seulement
            </label>

            <label className="mb-4 block">
                Note minimale :
                <select
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="border p-2 rounded w-full mt-1"
                >
                    <option value={0}>Toutes</option>
                    {[1, 2, 3, 4, 5].map((note) => (
                        <option key={note} value={note}>
                            {note} ★ et plus
                        </option>
                    ))}
                </select>
            </label>

            <div className="grid grid-cols-2 gap-6">
                <Button
                    disabled
                    onClick={onReset}
                    className="bg-gray-300 text-gray-600"
                >
                    Réinitialiser
                </Button>
                <Button onClick={onApply}>Appliquer</Button>
            </div>
        </div>
    );
};

export default ProductFilter;
