import React, { useEffect, useState } from 'react';
import { CartItem } from '../../types/cart';
import { ProductImage } from '../../types/productImage';
import api from '../../services/productsService';
import { Link } from 'react-router-dom';

interface CartProductItemProps {
    item: CartItem;
    increaseQuantity: (product: CartItem['product']) => void;
    decreaseQuantity: (product: CartItem['product']) => void;
    handleRemoveItem: (slug: string) => void;
    isReadOnly?: boolean;
    dontShow?: boolean;
}

const CartProductItem: React.FC<CartProductItemProps> = ({
    item,
    increaseQuantity,
    decreaseQuantity,
    handleRemoveItem,
    isReadOnly = false,
    dontShow = false,
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
        if (item.product) {
            fetchProductImages(item.product.id);
        }
    }, [item.product]);

    return (
        <tr className="border-b border-[#e1e3e4] last:border-0 flex items-center">
            <td className="p-8 flex items-center gap-3">
                <Link to={`/products/${item.product.slug}`}>
                    <img
                        src={selectedImage?.imageUrl}
                        alt={selectedImage?.altText}
                        className="w-20 h-20 object-contain transition-all duration-300 cursor-pointer"
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
                    <h3 className="product-desc-text">{item.product.name}</h3>
                    {dontShow ? (
                        <></>
                    ) : (
                        <>
                            <p className="product-desc">
                                {item.product.description.slice(0, 75)}
                                {item.product.description.length > 75
                                    ? '...'
                                    : ''}
                            </p>
                            <p className="product-price">
                                {item.product.price.toFixed(2)} dhs
                            </p>
                        </>
                    )}
                </div>
            </td>
            <td className="p-8 text-center">
                {isReadOnly ? (
                    <span className="px-4">{item.quantity}</span>
                ) : (
                    <>
                        <div className="flex items-center justify-center border border-gray-300 rounded w-fit mx-auto">
                            <button
                                onClick={() => decreaseQuantity(item.product)}
                                disabled={item.quantity <= 1}
                                className="px-3 py-1 hover:bg-gray-300 disabled:opacity-50"
                            >
                                -
                            </button>
                            <span className="px-4">{item.quantity}</span>
                            <button
                                onClick={() => increaseQuantity(item.product)}
                                disabled={item.quantity >= item.product.stock}
                                className="px-3 py-1 hover:bg-gray-300 disabled:opacity-50"
                            >
                                +
                            </button>
                        </div>
                        <button
                            onClick={() => handleRemoveItem(item.product.slug)}
                            className="table-card-body-header hover:underline"
                        >
                            Supprimer
                        </button>
                    </>
                )}
            </td>
            <td className="p-8 text-right font-medium">
                {(item.product.price * item.quantity).toFixed(2)} dhs
            </td>
        </tr>
    );
};

export default CartProductItem;
