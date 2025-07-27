import React, { useState, useEffect } from 'react';
import api from '../services/productsService'; // Import the api service
import ProductList from '../components/products/ProductList';
import { Product } from '../types/product';
import Pagination from '../components/pagination/Pagination';
import NotFound from '../components/NotFound';

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(12);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [priceRange, setPriceRange] = useState<string>('');
    const [totalPages, setTotalPages] = useState<number>(1);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.getProducts({
                page,
                limit,
                name: searchTerm,
                // price: priceRange,
            });

            setProducts(response.data);
            setTotalPages(response.totalPages);
        } catch (err) {
            console.error(err);
            setError('Erreur lors du chargement des produits');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page, searchTerm, priceRange]);

    return (
        <div className="grid grid-cols-4 gap-8">
            <div className="card">
                <h1 className="card-text-heading">Filter</h1>

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
            </div>

            <div className="col-span-3 card">
                {loading ? (
                    <p>Chargement en cours...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : products.length === 0 ? (
                    <NotFound
                        message="Aucun produit trouvé dans cette catégorie"
                        buttonLabel="Explorer les produits"
                        redirectTo="/collections"
                    />
                ) : (
                    <ProductList products={products} />
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                )}
            </div>
        </div>
    );
};

export default ProductsPage;
