// src/components/filters/StoreFilter.tsx
import React, { useState } from 'react';
import Button from '../ui/Button';

interface StoreFilterProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    priceRange: string;
    setPriceRange: (value: string) => void;
    shippingAvailable: boolean;
    setShippingAvailable: (value: boolean) => void;
    storeOnly: boolean;
    setStoreOnly: (value: boolean) => void;
    onReset: () => void;
    onApply: () => void;
}

const StoreFilter: React.FC<StoreFilterProps> = ({
    searchTerm,
    setSearchTerm,
    priceRange,
    setPriceRange,
    shippingAvailable,
    setShippingAvailable,
    storeOnly,
    setStoreOnly,
    onReset,
    onApply,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false); // Gérer l'ouverture/fermeture du modal

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleOutsideClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).id === 'modal-overlay') {
            toggleModal();
        }
    };

    return (
        <div>
            <div className="mb-4 flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded w-full"
                />
                <input
                    type="text"
                    placeholder="Prix min,max (ex: 100,200)"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="border p-2 rounded w-full"
                />
                <Button onClick={toggleModal} className="px-4">
                    Filtrer
                </Button>
            </div>

            {/* Bouton "Filtrer" pour ouvrir le modal */}

            {/* Modal pour les filtres */}
            {isModalOpen && (
                <>
                    {/* Overlay sombre */}
                    <div
                        id="modal-overlay"
                        className="fixed h-full inset-0 bg-black opacity-50 z-40"
                        onClick={handleOutsideClick}
                    ></div>

                    {/* Contenu du modal */}
                    <div
                        className="fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg p-4 z-50"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Rechercher un produit..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border p-2 rounded w-full mb-4"
                            />
                            <input
                                type="text"
                                placeholder="Prix min,max (ex: 100,200)"
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                                className="border p-2 rounded w-full mb-4"
                            />
                            <label className="flex items-center mb-4">
                                <input
                                    type="checkbox"
                                    checked={shippingAvailable}
                                    onChange={(e) =>
                                        setShippingAvailable(e.target.checked)
                                    }
                                    className="mr-2"
                                />
                                Livraison disponible
                            </label>

                            <label className="flex items-center mb-4">
                                <input
                                    type="checkbox"
                                    checked={storeOnly}
                                    onChange={(e) =>
                                        setStoreOnly(e.target.checked)
                                    }
                                    className="mr-2"
                                />
                                Produits de la boutique uniquement
                            </label>

                            <div className="flex justify-between">
                                <button
                                    onClick={onReset}
                                    className="bg-gray-300 text-black px-4 py-2 rounded"
                                >
                                    Réinitialiser
                                </button>
                                <button
                                    onClick={() => {
                                        onApply();
                                        toggleModal();
                                    }}
                                    className="bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    Appliquer
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default StoreFilter;
