import React, { useState, useEffect, useRef } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/productsService';
import { Product } from '../../../types/product';
import SearchProductItem from './SearchProductItem';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const navigate = useNavigate();
    const searchContainerRef = useRef<HTMLDivElement>(null);

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
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
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

    return (
        <div className="relative w-[25rem]" ref={searchContainerRef}>
            <form
                onSubmit={handleSearch}
                className="flex items-center h-12 bg-white rounded overflow-hidden"
            >
                <input
                    type="text"
                    placeholder="Rechercher ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-[14px] w-full px-4 py-2 h-full text-black outline-none bg-transparent focus:ring-2 focus:ring-blue-400 transition-all"
                />
                <button
                    type="submit"
                    className="bg-[var(--secondary-button-background)] text-white px-4 flex items-center justify-center h-full transition-all hover:bg-opacity-80"
                >
                    <IoSearchSharp className="text-xl leading-none" />
                </button>
            </form>

            {showResults && (
                <div className="absolute top-full left-0 w-full bg-white border shadow mt-1 rounded z-50">
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
                                <SearchProductItem
                                    key={product.id}
                                    product={product}
                                    setShowResults={setShowResults}
                                />
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
