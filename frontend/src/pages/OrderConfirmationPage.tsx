// src/pages/OrderConfirmationPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../services/orderService'; // Import your order service
import { Order } from '../types/order';

const OrderConfirmationPage: React.FC = () => {
    const { orderNumber } = useParams<{ orderNumber: string }>(); // Access the orderNumber parameter
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true);
                setError(null);

                if (!orderNumber) {
                    throw new Error('Order number is missing.');
                }

                const fetchedOrder = await getOrderById(orderNumber);
                setOrder(fetchedOrder);
            } catch (err: any) {
                console.error('Error fetching order:', err);
                setError(err.message || 'Failed to fetch order details.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderNumber]);

    if (loading) {
        return <p>Loading order details...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!order) {
        return <p>Order not found.</p>;
    }

    return (
        <div>
            <h2>Order Confirmation</h2>
            <p>
                Thank you for your order! Your order number is: {order.id}
            </p>{' '}
            {/* Use order.id here */}
            {/* Display other order details here (e.g., items, shipping address, etc.) */}
            <p>Order Status: {order.status}</p>
            <p>Payment Status: {order.paymentStatus}</p>
            <p>Total: {order.total}</p>
        </div>
    );
};

export default OrderConfirmationPage;
