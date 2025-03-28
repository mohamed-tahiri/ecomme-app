import React, { useEffect, useState } from 'react';
import { Product } from '../../../types/product';
import { ProductImage } from '../../../types/productImage';
import api from '../../../services/productsService';
import { Link } from 'react-router-dom';

interface CartProductItemProps {
    product: Product;
    quantity: number;
    increaseQuantity: (product: Product) => void;
    decreaseQuantity: (product: Product) => void;
    handleRemoveItem: (slug: string) => void;
}

const CartProductItem: React.FC<CartProductItemProps> = ({
    product,
    quantity,
    increaseQuantity,
    decreaseQuantity,
    handleRemoveItem,
}) => {
    const [images, setImages] = useState<ProductImage[]>([]);
    const [selectedImage, setSelectedImage] = useState<ProductImage | null>(
        null
    );

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
        <li
            key={product.slug}
            className="flex items-center justify-between p-2 border-b border-[var(--header-border-color)]"
        >
            <div className="flex items-start justify-between mt-4 w-full">
                <div className="flex space-x-2">
                    <Link to={`/products/${product.slug}`}>
                        <img
                            src={selectedImage?.imageUrl}
                            alt={selectedImage?.altText}
                            className="w-24 h-24 object-contain transition-all duration-300 cursor-pointer"
                            onMouseEnter={() =>
                                images.length > 0 && setSelectedImage(images[1])
                            }
                            onMouseLeave={() =>
                                setSelectedImage(
                                    images.find((image) => image.isPrimary) ||
                                        images[0]
                                )
                            }
                        />
                    </Link>
                    <div>
                        <h3 className="product-desc-text">{product.name}</h3>
                        <span className="product-price">
                            {product.price.toFixed(2)} dhs
                        </span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center border border-gray-300 rounded w-auto">
                        <button
                            onClick={() => decreaseQuantity(product)}
                            disabled={quantity <= 1}
                            className="px-3 py-1 hover:bg-gray-300 disabled:opacity-50"
                        >
                            -
                        </button>
                        <span className="px-4">{quantity}</span>
                        <button
                            onClick={() => increaseQuantity(product)}
                            disabled={quantity >= product.stock}
                            className="px-3 py-1 hover:bg-gray-300 disabled:opacity-50"
                        >
                            +
                        </button>
                    </div>
                    <button
                        onClick={() => handleRemoveItem(product.slug)}
                        className="table-card-body-header hover:underline"
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </li>
    );
};

export default CartProductItem;
