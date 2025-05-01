// src/components/cart/Estimation.tsx
import React from 'react';
import { useCart } from '../../context/CartContext';

interface EstimationProps {
    showTitle?: boolean;
    isReadOnly?: boolean;
}

const Estimation: React.FC<EstimationProps> = ({
    showTitle = true,
    isReadOnly = false,
}) => {
    const { cart } = useCart();

    const subtotal = cart.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );
    const livraison = subtotal >= 500 ? 0 : 30; // Livraison gratuite si +500 dhs
    const total = subtotal + livraison;

    return (
        <div className="bg-white border border-[#e1e3e4] rounded p-6 space-y-4">
            {showTitle && (
                <h3 className="estimation-heading">Estimation du total</h3>
            )}

            <div className="flex justify-between text-sm">
                <span>Sous-total</span>
                <span>{subtotal.toFixed(2)} dhs</span>
            </div>

            <div className="flex justify-between text-sm">
                <span>Livraison</span>
                <span>
                    {livraison === 0
                        ? 'Gratuite'
                        : `${livraison.toFixed(2)} dhs`}
                </span>
            </div>

            <hr />

            <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{total.toFixed(2)} dhs</span>
            </div>

            <div className="flex justify-center">
                <button
                    type="submit"
                    className="flex items-center justify-center bg-[var(--primary-button-background)] cursor-pointer text-white px-12 py-3 flex-center"
                >
                    Passer à la commande
                </button>
            </div>
        </div>
    );
};

export default Estimation;
