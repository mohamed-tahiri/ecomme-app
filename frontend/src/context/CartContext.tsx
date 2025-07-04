// src/context/CartContext.tsx
import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from 'react';
import { Product } from '../types/product';

interface CartItem {
    product: Product;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (slug: string) => void;
    clearCart: () => void; // Ajout de la fonction clearCart
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        // Chargement du panier depuis le localStorage si disponible
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        // Sauvegarder le panier dans le localStorage chaque fois qu'il change
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = useCallback((product: Product, quantity: number = 1) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(
                (item) => item.product.slug === product.slug
            );
            if (existingItem) {
                return prevCart.map((item) =>
                    item.product.slug === product.slug
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevCart, { product, quantity }];
        });
    }, []);

    const removeFromCart = useCallback((slug: string) => {
        setCart((prevCart) =>
            prevCart.filter((item) => item.product.slug !== slug)
        );
    }, []);

    const clearCart = useCallback(() => {
        setCart([]);
        localStorage.removeItem('cart'); // Optionnel : supprimer aussi du localStorage
    }, []);

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
