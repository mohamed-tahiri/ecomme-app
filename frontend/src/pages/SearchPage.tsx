import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../types/product';
import api from '../services/productsService'; // Import the api service
import ProductList from '../components/products/ProductList';
import Pagination from '../components/pagination/Pagination';

const SearchPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q') || ''; // Récupérer le paramètre 'q' de l'URL

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(12);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await api.getProducts({
                    page,
                    limit,
                    name: searchQuery,
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

        if (searchQuery) {
            fetchProducts();
        }
    }, [searchQuery, page]);

    return (
        <div className="card">
            <div className="border-b border-[var(--border-color)] pb-4 mb-4">
                <h2 className="card-text-heading">
                    Produits pour "{searchQuery}"
                </h2>
            </div>

            {loading ? (
                <p>Chargement en cours...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : products.length > 0 ? (
                <ProductList products={products} />
            ) : (
                <p>Aucun produit trouvé.</p>
            )}

            {/* Pagination */}
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    );
};

export default SearchPage;
