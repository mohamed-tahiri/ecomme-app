// CategoryDetail.tsx

import React, { useState } from 'react';
import ProductFilter from '../filter/ProductFilter';

interface CategoryDetailProps {
    category: Category | undefined;
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    minPrice: string;
    setMinPrice: (value: string) => void;
    maxPrice: string;
    setMaxPrice: (value: string) => void;
    sortBy: string;
    setSortBy: (value: string) => void;
    availableOnly: boolean;
    setAvailableOnly: (value: boolean) => void;
    minRating: number;
    setMinRating: (value: number) => void;
    onReset: () => void;
}

const CategoryDetail: React.FC<CategoryDetailProps> = ({
    category,
    searchTerm,
    setSearchTerm,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    sortBy,
    setSortBy,
    availableOnly,
    setAvailableOnly,
    minRating,
    setMinRating,
    onReset,
}) => {
    const [filterOpen, setFilterOpen] = useState(false);

    if (!category) {
        return <p>Catégorie non disponible.</p>;
    }

    return (
        <>
            <div className="border-b border-[var(--border-color)] mb-4 pb-4">
                <h2 className="card-text-heading">{category.name}</h2>
                <p>{category.descripiton}</p>
            </div>

            <div className="block md:hidden border-b border-[var(--border-color)] mb-4 pb-4">
                <div
                    className="cursor-pointer flex items-center space-x-2"
                    onClick={() => setFilterOpen(true)}
                >
                    <div className="w-6 h-6">
                        <svg
                            focusable="false"
                            className="icon icon--filter"
                            viewBox="0 0 19 20"
                            role="presentation"
                        >
                            <path
                                d="M17.0288086 4.01391602L11 9v7.0072021l-4 2.008545V9L1.01306152 4.01391602V1H17.0288086z"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="square"
                            ></path>
                        </svg>
                    </div>
                    <h2>Filtrer</h2>
                </div>
            </div>

            {filterOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={() => setFilterOpen(false)}
                    ></div>

                    <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50 p-4 overflow-auto">
                        <button
                            onClick={() => setFilterOpen(false)}
                            className="cursor-pointer mb-4 text-red-600 font-bold"
                        >
                            Fermer ✕
                        </button>

                        <ProductFilter
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            minPrice={minPrice}
                            setMinPrice={setMinPrice}
                            maxPrice={maxPrice}
                            setMaxPrice={setMaxPrice}
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            availableOnly={availableOnly}
                            setAvailableOnly={setAvailableOnly}
                            minRating={minRating}
                            setMinRating={setMinRating}
                            onReset={onReset}
                        />
                    </div>
                </>
            )}
        </>
    );
};

export default CategoryDetail;
