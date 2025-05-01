import { FaCircle, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import api from '../../services/productsService';
import { useEffect, useState } from 'react';
import { ProductImage } from '../../types/productImage';

interface ProductItemProps {
    product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    const { addToCart } = useCart();
    const isInStock = product.stock > 0;
    const [images, setImages] = useState<ProductImage[]>([]);
    const [selectedImage, setSelectedImage] = useState<ProductImage | null>(
        null
    ); // Default to primary image

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

    useEffect(() => {
        if (product) {
            fetchProductImages(product.id);
        }
    }, [product]);

    return (
        <div className="p-2">
            <Link to={`/products/${product.slug}`}>
                <img
                    src={selectedImage?.imageUrl}
                    alt={selectedImage?.altText}
                    className="w-full h-44 object-contain transition-all duration-300"
                    onMouseEnter={() =>
                        images.length > 0 && setSelectedImage(images[1])
                    }
                    onMouseLeave={() =>
                        setSelectedImage(
                            images.find((image) => image.isPrimary) || images[0]
                        )
                    }
                />
            </Link>
            <div className="bg-[#f9f9f9] p-2 rounded my-3">
                <h3 className="product-desc-title mb-3">
                    {product.name.slice(0, 20)}
                    {product.name.length > 20 ? '...' : ''}
                </h3>
                <p className="product-desc-text">
                    {product.description.slice(0, 45)}
                    {product.description.length > 45 ? '...' : ''}
                </p>
            </div>
            <div className="space-y-4 mb-4">
                <span className="product-price">{product.price} dhs</span>
                {isInStock && (
                    <span className="product-stock flex-center">
                        <FaCircle className="mr-1 h-2 w-2" /> En stock.
                    </span>
                )}
            </div>

            <button
                onClick={() => addToCart(product)}
                disabled={!isInStock}
                className={`w-full px-4 py-2 rounded flex-center justify-center cursor-pointer ${
                    isInStock
                        ? 'bg-[var(--primary-button-background)] text-white'
                        : 'bg-[#8a9297] text-white'
                }`}
            >
                <FaShoppingCart className="mr-2" />{' '}
                {isInStock ? 'Ajouter au panier' : 'Rupture'}
            </button>
        </div>
    );
};

export default ProductItem;
