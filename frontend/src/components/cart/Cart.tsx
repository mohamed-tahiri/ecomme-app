import { useCart } from '../../context/CartContext';
import { CartItem } from '../../types/cart';
import CartItemShow from './CartItemShow';

interface CartProps {
    items: CartItem[];
    isReadOnly?: boolean;
    dontShow?: boolean;
}

const Cart: React.FC<CartProps> = ({
    items,
    isReadOnly = false,
    dontShow = false,
}) => {
    const { addToCart, removeFromCart } = useCart();

    const increaseQuantity = (product: CartItem['product']) => {
        addToCart(product, 1);
    };

    const decreaseQuantity = (product: CartItem['product']) => {
        if (product.stock > 1) {
            addToCart(product, -1);
        }
    };

    const handleRemoveItem = (slug: string) => {
        removeFromCart(slug);
    };

    return (
        <div
            className={
                dontShow ? '' : 'bg-white border border-[#e1e3e4] rounded'
            }
        >
            {items.length > 0 ? (
                dontShow ? (
                    <table className="">
                        <tbody>
                            {items.map((item) => (
                                <CartItemShow
                                    key={item.product.slug}
                                    item={item}
                                    increaseQuantity={increaseQuantity}
                                    decreaseQuantity={decreaseQuantity}
                                    handleRemoveItem={handleRemoveItem}
                                    isReadOnly={isReadOnly}
                                    dontShow={dontShow}
                                />
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <table className="w-full border-collapse">
                        <thead className="border-b border-[#e1e3e4] p-4">
                            <tr>
                                <th className="text-left p-8 table-card-body-header">
                                    Produit
                                </th>
                                <th className="text-center p-8 table-card-body-header">
                                    Quantité
                                </th>
                                <th className="text-right p-8 table-card-body-header">
                                    Total
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <CartItemShow
                                    key={item.product.slug}
                                    item={item}
                                    increaseQuantity={increaseQuantity}
                                    decreaseQuantity={decreaseQuantity}
                                    handleRemoveItem={handleRemoveItem}
                                    isReadOnly={isReadOnly}
                                    dontShow={dontShow}
                                />
                            ))}
                        </tbody>
                    </table>
                )
            ) : (
                <p className="text-gray-500 text-center py-4">
                    Votre panier est vide
                </p>
            )}
        </div>
    );
};

export default Cart;
