import React, { useState, useEffect } from 'react';
import api from '../services/productsService'; // Import the api service
import ProductList from '../components/products/ProductList';
import { Product } from '../types/product';
import { CartItem } from '../types/cart';

const HomePage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(12); // Limite par page
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [priceRange, setPriceRange] = useState<string>(''); // Exemple : "100,200"

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            // Call the getProducts function from the api service
            const response = await api.getProducts({
                page,
                limit,
                name: searchTerm,
                price: priceRange,
            });

            setProducts(response.data);
        } catch (err) {
            console.error(err);
            setError('Erreur lors du chargement des produits');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page, searchTerm, priceRange]); // Fetch products whenever page, searchTerm, or priceRange changes

    const handleAddToCart = (product: Product) => {
        setCartItems((prevItems) => {
            const itemIndex = prevItems.findIndex(
                (item) => item.product.id === product.id
            );
            if (itemIndex > -1) {
                const newItems = [...prevItems];
                newItems[itemIndex].quantity += 1;
                return newItems;
            }
            return [...prevItems, { product, quantity: 1 }];
        });

        setTotal((prevTotal) => prevTotal + product.price);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Nos Produits</h1>

            {/* Barre de recherche */}
            <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 rounded mb-4 w-full"
            />

            {/* Filtre par prix */}
            <input
                type="text"
                placeholder="Prix min,max (ex: 100,200)"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="border p-2 rounded mb-4 w-full"
            />

            {/* Affichage des produits */}
            {loading ? (
                <p>Chargement en cours...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <ProductList
                    products={products}
                    onAddToCart={handleAddToCart}
                />
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                <button
                    className="px-4 py-2 bg-gray-300 rounded mr-2"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Précédent
                </button>
                <span>Page {page}</span>
                <button
                    className="px-4 py-2 bg-gray-300 rounded ml-2"
                    onClick={() => setPage((prev) => prev + 1)}
                >
                    Suivant
                </button>
            </div>
        </div>
    );
};

export default HomePage;
