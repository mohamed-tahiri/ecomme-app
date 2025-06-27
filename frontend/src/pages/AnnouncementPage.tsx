import { useEffect, useState } from 'react';
import { Product } from '../types/product';
import { useAuth } from '../context/AuthContext';
import api from '../services/productsService';
import NotFound from '../components/NotFound';
import Pagination from '../components/pagination/Pagination';
import ProductListAnnonce from '../components/annonce/ProductListAnnonce';

const AnnouncementPage = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(12);
    const searchTerm = '';
    const priceRange = '';
    const [totalPages, setTotalPages] = useState<number>(1);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            if (user?.id) {
                const response = await api.getProductsByVendor(user.id, {
                    page,
                    limit,
                    name: searchTerm,
                    minPrice: minPrice ? Number(minPrice) : undefined,
                    maxPrice: maxPrice ? Number(maxPrice) : undefined,
                });

                setProducts(response.data);
                setTotalPages(response.totalPages);
            }
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
        <div className="">
            <h2 className="card-text-heading border-b border-[var(--border-color)] pb-2">
                Mes annonces
            </h2>
            <div className="mt-2">
                {loading ? (
                    <p>Chargement en cours...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : products.length === 0 ? (
                    <NotFound
                        message="Aucune annonce"
                        buttonLabel="Créer votre 1ère annonce"
                        redirectTo="/account/annonces/new"
                    />
                ) : (
                    <>
                        <ProductListAnnonce products={products} />
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={setPage}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AnnouncementPage;
