import { useEffect, useState } from 'react';
import { Store } from '../types/store';
import { useParams } from 'react-router-dom';
import api from '../services/productsService';
import apiStore from '../services/storeService';
import { Product } from '../types/product';
import StoreBanner from '../components/store/StoreBanner';

const BoutiquePage = () => {
    const { slug } = useParams<{ slug: string }>();
    const [store, setStore] = useState<Store>();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(12); // Limite par page
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [priceRange, setPriceRange] = useState<string>('');
    const [totalPages, setTotalPages] = useState<number>(1);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            if (slug) {
                const response = await api.getProductsBySlugStore(slug, {
                    page,
                    limit,
                    name: searchTerm,
                    price: priceRange,
                });

                const storeResponse = await apiStore.getStoreBySlug(slug);

                setStore(storeResponse);
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
        if (slug) {
            fetchProducts();
        }
    }, [slug, page, searchTerm, priceRange]);

    return (
        <div>
            {store && <StoreBanner store={store} />}
            <div></div>
        </div>
    );
};

export default BoutiquePage;
