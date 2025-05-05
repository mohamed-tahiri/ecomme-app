import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Store } from '../types/store';
import { Product } from '../types/product';
import api from '../services/productsService';
import apiStore from '../services/storeService';

import StoreBanner from '../components/store/StoreBanner';
import StoreProductList from '../components/store/StoreProductList';
import Pagination from '../components/pagination/Pagination';
import NotFound from '../components/NotFound';
import StoreFilter from '../components/filter/StoreFilter'; // Import du StoreFilter

const BoutiquePage = () => {
    const { slug } = useParams<{ slug: string }>();
    const [store, setStore] = useState<Store>();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [limit] = useState(12);
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [shippingAvailable, setShippingAvailable] = useState(false);
    const [storeOnly, setStoreOnly] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const fetchProducts = async () => {
        if (!slug) return;

        setLoading(true);
        setError(null);

        try {
            const [productsRes, storeRes] = await Promise.all([
                api.getProductsBySlugStore(slug, {
                    page,
                    limit,
                    name: searchTerm,
                    price: priceRange,
                    // shippingAvailable,
                    // storeOnly
                }),
                apiStore.getStoreBySlug(slug),
            ]);

            setProducts(productsRes.data);
            setTotalPages(productsRes.totalPages);
            setStore(storeRes);
        } catch (err) {
            console.error(err);
            setError('Erreur lors du chargement des produits.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [slug, page, searchTerm, priceRange, shippingAvailable, storeOnly]);

    return (
        <div className="mx-10 bg-white rounded-t-xl">
            {store && <StoreBanner store={store} />}

            <div className="mx-10 px-10">
                <div className="grid grid-cols-3 gap-5">
                    <div className="col-span-2">
                        <StoreFilter
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            shippingAvailable={shippingAvailable}
                            setShippingAvailable={setShippingAvailable}
                            storeOnly={storeOnly}
                            setStoreOnly={setStoreOnly}
                            onReset={() => {
                                setSearchTerm('');
                                setPriceRange('');
                                setShippingAvailable(false);
                                setStoreOnly(false);
                            }}
                            onApply={() => {
                                fetchProducts();
                            }}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-5">
                    <div className="col-span-2">
                        {loading ? (
                            <p>Chargement en cours...</p>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : products.length === 0 ? (
                            <NotFound
                                message="Aucun produit trouvé dans cette boutique."
                                buttonLabel="Explorer les produits"
                                redirectTo="/collections"
                            />
                        ) : (
                            <StoreProductList products={products} />
                        )}

                        {totalPages > 1 && (
                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={setPage}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoutiquePage;
