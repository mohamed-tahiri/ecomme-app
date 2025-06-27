import React, { useState, useEffect, useRef } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import api from '../../../../services/productsService';
import { Product } from '../../../../types/product';
import { IoClose } from 'react-icons/io5';
import ProductItem from '../../../productsitem/ProductItem';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const navigate = useNavigate();
    const searchContainerRef = useRef<HTMLDivElement>(null);

    const [searchHistory, setSearchHistory] = useState<string[]>(() => {
        const storedHistory = localStorage.getItem('searchHistory');
        return storedHistory ? JSON.parse(storedHistory) : [];
    });

    useEffect(() => {
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }, [searchHistory]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await api.getProducts({
                    page: 1,
                    limit: 3,
                    name: searchQuery,
                });
                setProducts(response.data);
                setShowResults(response.data.length > 0);
            } catch (err) {
                console.error(err);
                setError('Erreur lors du chargement des produits');
            } finally {
                setLoading(false);
            }
        };

        if (searchQuery.trim()) {
            fetchProducts();
        } else {
            setShowResults(false);
        }
    }, [searchQuery]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedQuery = searchQuery.trim();
        if (trimmedQuery) {
            setSearchHistory((prevHistory) => {
                if (prevHistory.includes(trimmedQuery)) {
                    return prevHistory;
                }
                const newHistory = [trimmedQuery, ...prevHistory].slice(0, 7);
                return newHistory;
            });
            navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
            setShowResults(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchContainerRef.current &&
                !searchContainerRef.current.contains(event.target as Node)
            ) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleHistoryClick = (historyItem: string) => {
        setSearchQuery(historyItem);
        setShowResults(false);
    };

    const handleRemoveHistoryItem = (itemToRemove: string) => {
        setSearchHistory((prevHistory) =>
            prevHistory.filter((item) => item !== itemToRemove)
        );
    };

    const handleClearHistory = () => {
        setSearchHistory([]);
    };

    return (
        <div className="relative inline-block w-full" ref={searchContainerRef}>
            <form
                onSubmit={handleSearch}
                className="flex items-center h-11 bg-white rounded overflow-hidden w-auto"
            >
                <input
                    type="text"
                    placeholder="Rechercher ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-[14px] flex-1 min-w-[100px] px-4 py-2 h-full text-black outline-none bg-transparent focus:ring-2 focus:ring-blue-400 transition-all"
                />
                <button
                    type="submit"
                    className="bg-[var(--secondary-button-background)] text-white px-4 flex items-center justify-center h-full transition-all hover:bg-opacity-80"
                >
                    <IoSearchSharp size={24} className="leading-none" />
                </button>
            </form>

            {showResults && (
                <div className="absolute top-full left-0 w-auto min-w-full bg-white border shadow mt-1 rounded z-50">
                    {/* Affichage de l'historique de recherche */}
                    {searchHistory.length > 0 && (
                        <div className="p-2 border-b border-[var(--border-color)] mb-3">
                            <div className="flex justify-between items-center">
                                <h4 className="text-sm text-[var(--heading-color)]">
                                    Historique de recherche
                                </h4>
                                <button
                                    className="text-gray-500 hover:text-red-500 text-sm cursor-pointer"
                                    onClick={handleClearHistory}
                                >
                                    Effacer l'historique
                                </button>
                            </div>
                            <ul>
                                {searchHistory.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center justify-between cursor-pointer product-desc-title py-2 rounded"
                                    >
                                        <span
                                            onClick={() =>
                                                handleHistoryClick(item)
                                            }
                                        >
                                            {item}
                                        </span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // Empêche la propagation du clic au li parent
                                                handleRemoveHistoryItem(item);
                                            }}
                                            className="text-gray-500 hover:text-red-500 cursor-pointer"
                                        >
                                            <IoClose size={16} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {loading ? (
                        <div className="p-2 text-gray-500">
                            <h3>Chargement...</h3>
                        </div>
                    ) : error ? (
                        <div className="p-2 text-red-500">
                            <h3>{error}</h3>
                        </div>
                    ) : (
                        <>
                            {products.map((product) => (
                                <div
                                    onClick={() => {
                                        setShowResults(false);
                                    }}
                                >
                                    <ProductItem
                                        key={product.id}
                                        product={product}
                                        layout="card"
                                        withoutCartSection={true}
                                        imageClassName="w-20 h-20 object-contain transition-all duration-300 cursor-pointer"
                                        containerClassName=""
                                    />
                                </div>
                            ))}
                            <div
                                className="flex justify-center py-2 cursor-pointer"
                                onClick={handleSearch}
                            >
                                <h3 className="product-search-price">
                                    Voir tous les produits
                                </h3>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
