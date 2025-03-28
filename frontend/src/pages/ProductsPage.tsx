import { useEffect, useState } from 'react';
import ProductList from '../components/products/ProductList';
import { Product } from '../types/product';
import { CartItem } from '../types/cart';
import api from '../services/api';

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(10); // Nombre d'éléments par page
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [priceRange, setPriceRange] = useState<string>(''); // Exemple : "100,200"

    // Fonction pour récupérer les produits
    const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.get('/products', {
                params: {
                    page,
                    limit,
                    name: searchTerm,
                    price: priceRange,
                },
            });

            setProducts(response.data.data);
        } catch (err) {
            console.error(err);
            setError('Erreur lors du chargement des produits');
        } finally {
            setLoading(false);
        }
    };

    // Charger les produits à l'affichage et lors des changements de filtres/pagination
    useEffect(() => {
        fetchProducts();
    }, [page, searchTerm, priceRange]);

    // Fonction pour ajouter un produit au panier
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
    };

    return (
        <div className="card">
            <div className="border-b">
                <h2 className="card-text-heading">Nos Produits</h2>
            </div>
            {/* Barre de recherche */}
            <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 mb-4 w-full"
            />

            {/* Affichage des produits ou messages d'état */}
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
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Précédent
                </button>
                <span>Page {page}</span>
                <button
                    onClick={() => setPage((prev) => prev + 1)}
                    className="px-4 py-2 bg-gray-300 rounded"
                >
                    Suivant
                </button>
            </div>
        </div>
    );
};

export default ProductsPage;
