// src/components/order/Estimation.tsx
import React, { useState, useContext } from 'react';
import { useCart } from '../../context/CartContext';
import { LivraisonContext } from '../../context/LivraisonContext';
import { PaiementContext } from '../../context/PaiementContext';
import { Address } from '../../types/address';
import { PaymentCart } from '../../types/paymentCart';
import { createOrder } from '../../services/orderService'; // Import de la fonction createOrder
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '../../context/AuthContext';
interface OrderSummary {
    orderNumber: string;
    address: Address | null;
    paymentMethod: 'card' | 'cod';
    cardDetails: PaymentCart[] | null;
    total: number;
    items: any[];
}

const Estimation: React.FC = () => {
    const { cart } = useCart();
    const { selectedAddress } = useContext(LivraisonContext);
    const { paymentMethod, savedCard } = useContext(PaiementContext);
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);

    const navigate = useNavigate(); // Initialize useNavigate

    const { user } = useAuth(); // Décommentez et adaptez cette ligne

    const subtotal = cart.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );
    const livraison = subtotal >= 500 ? 0 : 30;
    const total = subtotal + livraison;

    const handleCheckout = async () => {
        setIsProcessing(true);

        try {
            if (!user?.id) {
                throw new Error('User ID is missing. Please log in.');
            }

            if (!selectedAddress) {
                throw new Error('Shipping address is required.');
            }

            console.log(cart);

            const cartItems = cart.map((item) => ({
                productId: item.product.id,
                quantity: item.quantity,
            }));

            const addressId = selectedAddress.id;
            const paymentCartId =
                savedCard && savedCard.length > 0 ? savedCard[0].id : null;

            const orderData = {
                userId: user.id,
                cartItems,
                addressId,
                paymentCartId,
                paymentMethod,
            };

            console.log(cartItems);

            const order = await createOrder(orderData);

            const orderNumber = order.id;

            const newOrderSummary: OrderSummary = {
                orderNumber: orderNumber,
                address: selectedAddress,
                paymentMethod: paymentMethod,
                cardDetails: paymentMethod === 'card' ? savedCard : null,
                total: total,
                items: cart,
            };

            setOrderSummary(newOrderSummary);

            setTimeout(() => {
                navigate(`/order-confirmation/${orderNumber}`);
            }, 3000);
        } catch (error: any) {
            console.error(
                'Error during checkout:',
                error.response?.data || error.message || error
            );
            console.log(error.message);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <>
            <div className="card space-y-4">
                <h3 className="estimation-heading">Estimation du total</h3>

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

                <div className="flex justify-center">
                    <button
                        type="button"
                        className={`flex items-center justify-center bg-[var(--primary-button-background)] cursor-pointer text-white w-full py-3 flex-center ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleCheckout}
                        disabled={isProcessing}
                    >
                        {isProcessing
                            ? 'Traitement en cours...'
                            : 'Passer à la commande'}
                    </button>
                </div>

                {/* {orderSummary && (
                    <div className="text-green-600 text-center">
                        <h3>
                            Confirmation de la commande #
                            {orderSummary.orderNumber}
                        </h3>
                        <p>
                            Adresse de livraison: {orderSummary.address?.street}
                            , {orderSummary.address?.city}
                        </p>
                        <p>Méthode de paiement: {orderSummary.paymentMethod}</p>
                        {orderSummary.paymentMethod === 'card' &&
                            orderSummary.cardDetails &&
                            orderSummary.cardDetails.map((card) => (
                                <div key={card.id}>
                                    <p>
                                        Carte: **** **** ****{' '}
                                        {card.cardNumber.slice(-4)}
                                    </p>
                                </div>
                            ))}
                        <p>Total: {orderSummary.total.toFixed(2)} dhs</p>
                    </div>
                )} */}
                <p className="text-center p-2 rounded bg-[var(--background)] text-[var(--heading-color)]">
                    🚚 Livraison partout au Maroc via Amana Express!
                </p>
            </div>
        </>
    );
};

export default Estimation;
