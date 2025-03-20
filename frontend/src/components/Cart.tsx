import React from 'react';
import { CartItem } from '../types/cart';

interface CartProps {
    items: CartItem[];
    total: number;
}

const Cart: React.FC<CartProps> = ({ items, total }) => {
    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
            <ul>
                {items.map((item) => (
                    <li
                        key={item.product.id}
                        className="flex justify-between mb-4"
                    >
                        <span>{item.product.name}</span>
                        <span>
                            ${item.product.price} x {item.quantity}
                        </span>
                    </li>
                ))}
            </ul>
            <div className="flex justify-between font-bold mt-4">
                <span>Total:</span>
                <span>${total}</span>
            </div>
        </div>
    );
};

export default Cart;
