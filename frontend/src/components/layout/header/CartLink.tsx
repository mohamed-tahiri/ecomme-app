import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../../context/CartContext';
import { useState, useEffect, useRef } from 'react';
import { Product } from '../../../types/product';
import CartProductItem from './CartProductItem';

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
                            cart.map(({ product, quantity }) => (
                                <CartProductItem
                                    key={product.id}
                                    product={product}
                                    quantity={quantity}
                                    increaseQuantity={increaseQuantity}
                                    decreaseQuantity={decreaseQuantity}
                                    handleRemoveItem={handleRemoveItem}
                                />
                            ))
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
