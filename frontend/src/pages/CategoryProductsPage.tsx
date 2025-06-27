import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/productsService'; // ton service API pour les produits
import { getCategoryBySlug } from '../services/categoryService'; // service catégorie
import ProductList from '../components/products/ProductList';
import { Product } from '../types/product';
import CategoryDetail from '../components/categories/CategoryDetail';
import Pagination from '../components/pagination/Pagination';
import NotFound from '../components/NotFound';
import ProductFilter from '../components/filter/ProductFilter';

const CategoryProductsPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();

    // États catégorie & produits
    const [category, setCategory] = useState<Category | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Pagination
    const [page, setPage] = useState(1);
    const [limit] = useState(12);
    const [totalPages, setTotalPages] = useState(1);

    // Filtres
    const [searchTerm, setSearchTerm] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [availableOnly, setAvailableOnly] = useState(false);
    const [minRating, setMinRating] = useState(0);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            if (!slug) return;

            // Appel API avec filtres et pagination
            const response = await api.getProductsBySlugCategory(slug, {
                page,
                limit,
                name: searchTerm || undefined,
                minPrice: minPrice ? Number(minPrice) : undefined,
                maxPrice: maxPrice ? Number(maxPrice) : undefined,
                // sortBy: sortBy || undefined,
                // availableOnly: availableOnly ? true : undefined,
                // minRating: minRating > 0 ? minRating : undefined,
            });

            // Charger catégorie
            const categoryResponse = await getCategoryBySlug(slug);

            setCategory(categoryResponse);
            setProducts(response.data);
            setTotalPages(response.totalPages);
        } catch (err: any) {
            console.error(err);
            setError('Erreur lors du chargement des produits');
        } finally {
            setLoading(false);
        }
    };

    // Reload à chaque changement de filtres et page
    useEffect(() => {
        fetchProducts();
    }, [
        slug,
        page,
        searchTerm,
        minPrice,
        maxPrice,
        // , sortBy, availableOnly, minRating
    ]);

    // Réinitialiser la page si la catégorie change
    useEffect(() => {
        setPage(1);
    }, [slug]);

    // Réinitialiser filtres et page
    const handleResetFilters = () => {
        setSearchTerm('');
        setMinPrice('');
        setMaxPrice('');
        setSortBy('');
        setAvailableOnly(false);
        setMinRating(0);
        setPage(1);
    };

    return (
        <div className="md:grid md:grid-cols-4 md:gap-8 p-[1.875rem] md:px-0">
            <ProductFilter
                className="hidden md:block"
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                sortBy={sortBy}
                setSortBy={setSortBy}
                availableOnly={availableOnly}
                setAvailableOnly={setAvailableOnly}
                minRating={minRating}
                setMinRating={setMinRating}
                onReset={handleResetFilters}
            />
            <div className="col-span-3 card">
                <CategoryDetail
                    category={category!}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    minPrice={minPrice}
                    setMinPrice={setMinPrice}
                    maxPrice={maxPrice}
                    setMaxPrice={setMaxPrice}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    availableOnly={availableOnly}
                    setAvailableOnly={setAvailableOnly}
                    minRating={minRating}
                    setMinRating={setMinRating}
                    onReset={handleResetFilters}
                />
                {loading ? (
                    <p>Chargement en cours...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : products.length === 0 ? (
                    <div className="col-span-3 card">
                        <NotFound
                            message="Aucun produit trouvé dans cette catégorie"
                            buttonLabel="Explorer les produits"
                            redirectTo="/collections"
                        />
                    </div>
                ) : (
                    <>
                        <ProductList products={products} />
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

export default CategoryProductsPage;
