import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../services/orderService';
import { OrderGetById } from '../types/order';
import { motion } from 'framer-motion';
import Cart from '../components/cart/Cart';
import ProduitsSimilaires from '../components/produitssimilaires/ProduitsSimilaires';
import { useCart } from '../context/CartContext';

const OrderConfirmationPage: React.FC = () => {
    const { cart, clearCart } = useCart();
    const { orderNumber } = useParams<{ orderNumber: string }>();
    const [orderData, setOrderData] = useState<OrderGetById | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const subtotal = cart.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );
    const livraison = subtotal >= 500 ? 0 : 30;
    const total = subtotal + livraison;

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true);
                setError(null);

                if (!orderNumber)
                    throw new Error('Numéro de commande manquant.');

                const data = await getOrderById(orderNumber);
                setOrderData(data);

                setTimeout(() => {
                    clearCart();
                }, 5000);
            } catch (err: any) {
                setError(
                    err.message ||
                        'Échec de la récupération des détails de la commande.'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderNumber]);

    if (loading) {
        return (
            <motion.div
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
            </motion.div>
        );
    }

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }

    if (!orderData) {
        return <p className="text-center">Commande introuvable.</p>;
    }

    const { order, items } = orderData;

    return (
        <>
            <div className="card m-[1.875rem] md:m-0">
                <div className="mb-10 md:mx-[5rem] lg:mx-[10rem]">
                    <motion.div
                        initial={{ scale: 0, rotate: -45, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 15,
                        }}
                        className="text-5xl mb-2"
                    >
                        🎉
                    </motion.div>
                    <h2 className="card-page-heading">
                        Merci pour votre commande !
                    </h2>
                    <p className="text-[.9rem]">
                        Votre commande {order.reference} sera traitée sous 24
                        heures les jours ouvrés. Vous recevrez un e-mail une
                        fois qu'elle aura été expédiée.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-4 md:mx-[5rem] lg:mx-[10rem]">
                    <div className="space-y-3">
                        <div className="flex justify-between items-center border-b border-[var(--border-color)] pb-3">
                            <h2 className="font-semibold">
                                Numéro de commande
                            </h2>
                            <h2>{order.reference}</h2>
                        </div>
                        <div className="flex justify-between items-center border-b border-[var(--border-color)] pb-3">
                            <h2 className="font-semibold">Date</h2>
                            <h2>
                                {format(
                                    new Date(order.createdAt),
                                    'dd/MM/yyyy HH:mm'
                                )}
                            </h2>
                        </div>
                        <div className="flex justify-between items-center border-b border-[var(--border-color)] pb-3">
                            <h2 className="font-semibold">
                                Méthode de paiement
                            </h2>
                            <h2>
                                {order.paymentCartId
                                    ? 'Carte Visa'
                                    : 'Paiement à la livraison'}
                            </h2>
                        </div>
                        <div className="flex justify-between items-center border-b border-[var(--border-color)] pb-3">
                            <h2 className="font-semibold">Nom</h2>
                            <h2>{order.user?.name}</h2>
                        </div>
                        <div className="flex justify-between items-center border-b border-[var(--border-color)] pb-3">
                            <h2 className="font-semibold">Adresse</h2>
                            <h2>
                                {order.address.street} - {order.address.zipCode}
                                , {order.address.city}, {order.address.country}
                            </h2>
                        </div>
                        <div className="flex justify-between items-center border-b border-[var(--border-color)] pb-3">
                            <h2 className="font-semibold">Téléphone</h2>
                            <h2>+(XXX) XXX XXXX</h2>
                        </div>
                        <div className="flex justify-between items-center pb-3">
                            <h2 className="font-semibold">E-mail</h2>
                            <h2>{order.user?.email}</h2>
                        </div>
                    </div>
                    <div className="card">
                        <h2 className="card-page-heading mb-4">
                            Résumé de la commande
                        </h2>
                        <Cart items={items} isReadOnly dontShow />
                        <div className="space-y-3">
                            <div className="flex justify-between items-center pb-3">
                                <h2 className="font-semibold">Prix total</h2>
                                <h2>{subtotal} dhs</h2>
                            </div>
                            <div className="flex justify-between items-center border-b border-[var(--border-color)] pb-3">
                                <h2 className="font-semibold">Livraison</h2>
                                <h2>{livraison} dhs</h2>
                            </div>
                            <div className="flex justify-between items-center pt-8">
                                <h2 className="text-[var(--primary-button-background)] font-semibold">
                                    Total
                                </h2>
                                <h2>{total} dhs</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ProduitsSimilaires />
        </>
    );
};

export default OrderConfirmationPage;
