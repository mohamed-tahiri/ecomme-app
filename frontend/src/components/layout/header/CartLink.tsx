import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../../context/CartContext';
import { useState, useEffect, useRef } from 'react';
import { Product } from '../../../types/product';

const CartLink = () => {
    const { cart, addToCart, removeFromCart } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    const increaseQuantity = (product: Product) => {
        addToCart(product, 1);
    };

    const decreaseQuantity = (product: Product) => {
        if (product && product.stock > 1) {
            addToCart(product, -1); // Enlève 1
        }
    };

    const handleRemoveItem = (slug: string) => {
        removeFromCart(slug);
    };

    // Close the dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        // Add event listener for clicks
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative">
            {/* Bouton Panier */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative flex items-center space-x-2"
            >
                <div className="relative cursor-pointer">
                    <FiShoppingCart className="text-3xl" />

                    {/* Badge pour afficher le nombre d'articles */}
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[var(--primary-button-background)] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                            {totalItems}
                        </span>
                    )}
                </div>

                <span>Panier</span>
            </button>

            {/* Menu déroulant */}
            {isOpen && (
                <div
                    ref={dropdownRef} // Attach the ref here
                    className="absolute right-0 mt-2 w-[27rem] bg-white text-[var(--text-color)] shadow-lg rounded p-3 z-50"
                >
                    <div className="text-center">
                        <p className="p-2 rounded bg-[var(--background)] text-[var(--heading-color)]">
                            🚚 Livraison partout au Maroc via Amana Express!
                        </p>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                        {cart.length > 0 ? (
                            <ul>
                                {cart.map(({ product, quantity }) => (
                                    <li
                                        key={product.slug}
                                        className="flex items-center justify-between p-2 border-b border-[var(--header-border-color)]"
                                    >
                                        <div className="flex items-start justify-between mt-4 w-full">
                                            <div className="flex space-x-2">
                                                <img
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                    className="w-24 h-24 object-cover rounded"
                                                />
                                                <div>
                                                    <h3 className="product-desc-text">
                                                        {product.name}
                                                    </h3>
                                                    <span className="product-price">
                                                        {product.price.toFixed(
                                                            2
                                                        )}{' '}
                                                        dhs
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="flex items-center border border-gray-300 rounded w-auto">
                                                    <button
                                                        onClick={() =>
                                                            decreaseQuantity(
                                                                product
                                                            )
                                                        }
                                                        disabled={quantity <= 1}
                                                        className="px-3 py-1 hover:bg-gray-300 disabled:opacity-50"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="px-4">
                                                        {quantity}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            increaseQuantity(
                                                                product
                                                            )
                                                        }
                                                        disabled={
                                                            quantity >=
                                                            product.stock
                                                        }
                                                        className="px-3 py-1 hover:bg-gray-300 disabled:opacity-50"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        handleRemoveItem(
                                                            product.slug
                                                        )
                                                    }
                                                    className="table-card-body-header hover:underline"
                                                >
                                                    Supprimer
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="flex items-center justify-center p-5">
                                <p className="text-center text-gray-500">
                                    Votre panier est vide
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="mt-3 flex-center gap-3">
                        <Link
                            to="/cart"
                            onClick={() => setIsOpen(false)} // Close the dropdown
                            className="text-center w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-l"
                        >
                            Panier
                        </Link>
                        <Link
                            to="/checkout"
                            onClick={() => setIsOpen(false)} // Close the dropdown
                            className="text-center w-1/2 bg-[var(--primary-button-background)] hover:opacity-90 text-white py-2 rounded-r"
                        >
                            Commander
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartLink;
