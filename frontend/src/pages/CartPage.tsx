import { useState } from 'react';
import Cart from '../components/Cart';
import { CartItem } from '../types/cart';

const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Votre Panier</h1>
            {/* <Cart items={cartItems} /> */}
        </div>
    );
};

export default CartPage;
