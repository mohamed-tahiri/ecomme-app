import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { OrderWithItems } from '../types/order';
import { getUserOrders } from '../services/orderService';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import Cart from '../components/cart/Cart';

const OrderListPage = () => {
    const [orders, setOrders] = useState<OrderWithItems[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    const fetchOrderByUser = async () => {
        try {
            setLoading(true);
            setError(null);

            if (!user?.id) throw new Error("L'id de l'utilisateur n'existe pas");

            const data = await getUserOrders(user.id);
            setOrders(data);
        } catch (err: any) {
            setError(err.message || 'Échec de la récupération des commandes.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrderByUser();
    }, []);

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

    return (
        <div>
            <h2 className="card-text-heading border-b border-[var(--border-color)] pb-2">
                Mes commandes
            </h2>

            {orders?.length === 0 ? (
                <div className="flex flex-col justify-center items-center p-[4rem] space-y-12">
                    <div className="flex flex-col justify-center items-center">
                        <div className="relative w-12 h-12">
                            <svg
                                focusable="false"
                                className="icon icon--package w-full h-full"
                                viewBox="0 0 46 46"
                                role="presentation"
                            >
                                <g
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                    fillRule="evenodd"
                                >
                                    <path d="M11 8l24 14m10-6L25 28 1 14m24 14v16"></path>
                                    <path
                                        strokeLinecap="square"
                                        d="M45 16v14L25 44 1 30V14L21 2z"
                                    ></path>
                                </g>
                            </svg>
                            <div className="absolute top-1 -right-2 bg-[var(--secondary-button-background)] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                0
                            </div>
                        </div>
                        <h3 className="text-[.8rem]">Aucune commande</h3>
                    </div>
                    <div>
                        <Link
                            to={'/'}
                            className="bg-[var(--primary-button-background)] text-white px-6 py-4 font-semibold text-[.9rem]"
                        >
                            Passer ma 1ère commande
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="space-y-4 mt-6">
                    {orders?.map((order) => (
                        <div key={order.id} className='grid grid-cols-5 items-center border-b border-[var(--border-color)] pb-2 last:border-0'>
                            <div className='col-span-3'>
                                <Cart items={order.items} isReadOnly dontShow /> 
                            </div>
                            <div className='hidden md:flex items-center justify-center capitalize'>
                                {order.status}
                            </div>
                            <div className='hidden md:flex items-center justify-center capitalize'>
                                {order.paymentStatus}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderListPage;
