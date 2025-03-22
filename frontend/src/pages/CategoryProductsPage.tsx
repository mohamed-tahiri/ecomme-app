import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To get the category slug from the URL
import api from '../services/productsService'; // Import the api service
import ProductList from '../components/products/ProductList';
import { Product } from '../types/product';
import { CartItem } from '../types/cart';

const CategoryProductsPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>(); // Get the category slug from the URL
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
            if (slug) {
                const response = await api.getProductsBySlugCategory(slug, {
                    page,
                    limit,
                    name: searchTerm,
                    price: priceRange,
                });

                setProducts(response.data);
            }
        } catch (err) {
            console.error(err);
            setError('Erreur lors du chargement des produits');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (slug) {
            fetchProducts();
        }
    }, [slug, page, searchTerm, priceRange]); // Fetch products whenever the slug, page, searchTerm, or priceRange changes

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
        <div className="grid grid-cols-4 gap-8">
            <div className="bg-white border border-[var(--border-color)] min-h-[auto] max-h-[90vh] overflow-y-auto rounded-[0.188rem] py-[1.25rem] px-[1.563rem]">
                <h1 className="text-[var(--heading-color)]">Filter</h1>

                {/* Search bar */}
                <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded mb-4 w-full"
                />

                {/* Price filter */}
                <input
                    type="text"
                    placeholder="Prix min,max (ex: 100,200)"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="border p-2 rounded mb-4 w-full"
                />
            </div>

            <div className="col-span-3 bg-white border border-[var(--border-color)] rounded-[0.188rem] py-[1.25rem] px-[1.563rem]">
                <h1 className="text-[var(--heading-color)]">
                    Produits de la catégorie "{slug}"
                </h1>

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
        </div>
    );
};

export default CategoryProductsPage;
