import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Product } from '../types/product';
import api from '../services/productsService';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { ProductImage } from '../types/productImage';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import RecentlyViewedProducts from '../components/recentlyviewed/RecentlyViewedProducts';
import Livraison from '../components/products/Livraison';
import ReviewScore from '../components/avisproducts/ReviewScore';
import ReviewDetails from '../components/avisproducts/ReviewDetails';

const ProductDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const { recentlyViewed, addRecentlyViewed } = useRecentlyViewed();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [images, setImages] = useState<ProductImage[]>([]);
    const [selectedImage, setSelectedImage] = useState<ProductImage | null>(
        null
    ); // Default to primary image
    const { addToCart } = useCart();

    const increaseQuantity = () => {
        if (product && quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const fetchProduct = async () => {
        try {
            if (slug) {
                const productData = await api.getProductBySlug(slug);
                addRecentlyViewed(productData);
                setProduct(productData);
                console.log(productData);
            }
        } catch (error) {
            console.error('Erreur lors du chargement du produit:', error);
            setError('Impossible de charger le produit. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    const fetchProductImages = async (productId: string) => {
        try {
            const productImages = await api.getImagesByProduct(productId);
            setImages(productImages);
            if (productImages.length > 0) {
                setSelectedImage(
                    productImages.find((image) => image.isPrimary) ||
                        productImages[0]
                );
            }
        } catch (error) {
            console.error(
                'Erreur lors du chargement des images du produit:',
                error
            );
        }
    };

    const handleImageSelect = (image: any) => {
        setSelectedImage(image); // Update the selected image when clicked
    };

    useEffect(() => {
        if (slug) {
            fetchProduct();
        }
    }, [slug]);

    useEffect(() => {
        if (product) {
            fetchProductImages(product.id);
        }
    }, [product]);

    if (loading) return <p className="text-center text-lg">Chargement...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;
    if (!product)
        return <p className="text-center text-gray-600">Produit non trouvé.</p>;

    return (
        <>
            <div className="md:grid md:grid-cols-12 md:gap-6 p-[1.875rem] md:px-0">
                {/* Colonne gauche : images + livraison */}
                <div className="col-span-8 space-y-6">
                    <div className="card grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-x-4">
                        <div className="flex flex-col space-y-4">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleImageSelect(image)}
                                    className="cursor-pointer"
                                >
                                    <img
                                        src={image.imageUrl}
                                        alt={image.altText}
                                        className={`w-full h-16 object-contain rounded transition-all duration-300 ${
                                            selectedImage === image
                                                ? 'border-2 border-[var(--secondary-button-background)]'
                                                : ''
                                        }`}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="col-span-3 sm:col-span-4 md:col-span-5 lg:col-span-7">
                            <div>
                                <img
                                    src={
                                        selectedImage?.imageUrl ||
                                        'https://via.placeholder.com/300'
                                    }
                                    alt="Primary"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    <Livraison />
                </div>

                {/* Colonne droite : sticky card */}
                <div className="col-span-4">
                    <div className="sticky top-36">
                        <div className="card">
                            <div className="pb-4 border-b border-gray-300">
                                <h1 className="product-detail-header-text mb-2">
                                    {product.name}
                                </h1>
                                <div className="text-[.8rem] flex space-x-3">
                                    {product?.store && (
                                        <div className="flex items-center border-r border-gray-300 pr-4">
                                            <h2>
                                                <span className="uppercase">
                                                    Boutique :{' '}
                                                </span>
                                                <Link
                                                    to={`/boutique/${product.store.slug}`}
                                                    className="font-semibold text-[var(--primary-button-background)]"
                                                >
                                                    {product.store.name}
                                                </Link>
                                            </h2>
                                        </div>
                                    )}
                                    <h2>
                                        <span className="uppercase">
                                            Vendeur :{' '}
                                        </span>
                                        <span className="font-semibold text-[var(--primary-button-background)]">
                                            {product?.vendor?.name} |{' '}
                                            {product?.vendor?.email}
                                        </span>
                                    </h2>
                                </div>
                            </div>
                            <h1 className="table-card-body-header py-4 border-b border-gray-300">
                                {product.description}
                            </h1>

                            <div className="mt-4 space-y-4">
                                <div className="flex-center space-x-2">
                                    <h3 className="product-detail-header-element mr-6">
                                        Prix
                                    </h3>
                                    <p className="product-detail-price">
                                        {product.price} dhs
                                    </p>
                                </div>
                                <ReviewScore productid={product.id} />

                                <div className="flex-center space-x-2">
                                    <h3 className="product-detail-header-element mr-6">
                                        Quantité
                                    </h3>
                                    <div className="flex items-center border border-gray-300 rounded w-auto">
                                        <button
                                            onClick={decreaseQuantity}
                                            disabled={quantity <= 1}
                                            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                                        >
                                            -
                                        </button>
                                        <span className="px-4">{quantity}</span>
                                        <button
                                            onClick={increaseQuantity}
                                            disabled={quantity >= product.stock}
                                            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

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

                            <button
                                onClick={() => addToCart(product, quantity)}
                                className="bg-[var(--primary-button-background)] cursor-pointer text-white py-2 px-4 rounded flex-center mt-4"
                            >
                                <FaShoppingCart className="mr-2" /> Ajouter au
                                panier
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <ReviewDetails productid={product.id} />
                <RecentlyViewedProducts products={recentlyViewed} />
            </div>
        </>
    );
};

export default ProductDetailPage;
