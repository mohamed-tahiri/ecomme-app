import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types/product';
import api from '../services/productsService';

const ProductDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (slug) {
                    const productData = await api.getProductBySlug(slug);
                    setProduct(productData);
                }
            } catch (error) {
                console.error('Erreur lors du chargement du produit:', error);
                setError(
                    'Impossible de charger le produit. Veuillez réessayer.'
                );
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchProduct();
        }
    }, [slug]);

    if (loading) return <p className="text-center text-lg">Chargement...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;
    if (!product)
        return <p className="text-center text-gray-600">Produit non trouvé.</p>;

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            {/* Image du produit */}
            <div className="flex flex-col md:flex-row">
                <img
                    src={product.imageUrl || 'https://via.placeholder.com/300'}
                    alt={product.name}
                    className="w-full md:w-1/2 h-64 object-cover rounded-lg"
                />
                <div className="md:ml-6 mt-4 md:mt-0 flex flex-col justify-between">
                    {/* Nom et description */}
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="text-gray-700 mt-2">{product.description}</p>

                    {/* Prix et disponibilité */}
                    <div className="mt-4">
                        <p className="text-2xl font-semibold text-green-600">
                            {product.price} €
                        </p>
                        {product.stock > 0 ? (
                            <p className="text-green-500 mt-1">
                                En stock ({product.stock} disponibles)
                            </p>
                        ) : (
                            <p className="text-red-500 mt-1">
                                Rupture de stock
                            </p>
                        )}
                    </div>

                    {/* Catégorie */}
                    {/* {product.category && (
                        <p className="mt-4 text-gray-500 text-sm">Catégorie : {product.category.name}</p>
                    )} */}

                    {/* Bouton d'achat (simulation) */}
                    <button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                        Ajouter au panier
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
