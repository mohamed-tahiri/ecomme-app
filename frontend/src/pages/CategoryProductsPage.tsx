import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/productsService'; // Import the api service
import { getCategoryBySlug } from '../services/categoryService'; // Import the api service
import ProductList from '../components/products/ProductList';
import { Product } from '../types/product';
import CategoryDetail from '../components/categories/CategoryDetail';
import Pagination from '../components/pagination/Pagination';
import NotFound from '../components/NotFound';
import ProductFilter from '../components/filter/ProductFilter';

const CategoryProductsPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>(); // Get the category slug from the URL
    const [category, setCategory] = useState<Category>();
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
                const response = await api.getProductsBySlugCategory(slug, {
                    page,
                    limit,
                    name: searchTerm,
                    price: priceRange,
                });

                const categoryResponse = await getCategoryBySlug(slug);

                setCategory(categoryResponse);
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
        <div className="grid grid-cols-4 gap-8">
            <ProductFilter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
            />

            <div className="col-span-3 card">
                <CategoryDetail category={category!} />

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

export default CategoryProductsPage;
