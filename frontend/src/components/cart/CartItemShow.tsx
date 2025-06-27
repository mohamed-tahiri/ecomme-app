import React from 'react';
import { CartItem } from '../../types/cart';
import { Link } from 'react-router-dom';
import ProductImageDisplay from '../common/ProductImageDisplay';
import { useProductImages } from '../../hooks/useProductImages';

interface CartProductItemProps {
    item: CartItem;
    increaseQuantity: (product: CartItem['product']) => void;
    decreaseQuantity: (product: CartItem['product']) => void;
    handleRemoveItem: (slug: string) => void;
    isReadOnly?: boolean;
    dontShow?: boolean;
}

const CartItemShow: React.FC<CartProductItemProps> = ({
    item,
    increaseQuantity,
    decreaseQuantity,
    handleRemoveItem,
    isReadOnly = false,
    dontShow = false,
}) => {
    const { selectedImage, handleHover, handleLeave } = useProductImages(
        item.product.id
    );

    return (
        <tr className="border-b border-[#e1e3e4] last:border-0 items-center">
            <td className="p-8 flex items-center gap-3">
                <Link to={`/products/${item.product.slug}`}>
                    <ProductImageDisplay
                        selectedImage={selectedImage}
                        handleHover={handleHover}
                        handleLeave={handleLeave}
                        className="w-full h-28 object-contain transition-all duration-300"
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

export default CartItemShow;
