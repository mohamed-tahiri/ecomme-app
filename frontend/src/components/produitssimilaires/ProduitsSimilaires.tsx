import React, { useEffect, useState } from 'react';
import { getSimilarProductsByOrder } from '../../services/orderService';
import { Product } from '../../types/product';
import { useParams } from 'react-router-dom';
import ProductItem from '../productsitem/ProductItem';

const ProduitsSimilaires: React.FC = () => {
    const { orderNumber } = useParams<{ orderNumber: string }>();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSimilarProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            if (!orderNumber) return;

            const data = await getSimilarProductsByOrder(orderNumber);

            console.log(data);

            setProducts(data);
        } catch (err: any) {
            setError(
                err.message ||
                    'Erreur lors du chargement des produits similaires.'
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSimilarProducts();
    }, [orderNumber]);

    if (loading) return null;
    if (error || products.length === 0) return null;

    return (
        <div className="md:mt-8 md:px-0 px-[1.875rem]">
            <h2 className="card-page-heading">Produits Similaires</h2>
            <div className="card flex items-center md:grid md:grid-cols-5 gap-4">
                {products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProduitsSimilaires;
