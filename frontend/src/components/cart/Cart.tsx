import { useCart } from '../../context/CartContext';
import { CartItem } from '../../types/cart';
import { Product } from '../../types/product';

interface CartProps {
    items: CartItem[];
}

const Cart: React.FC<CartProps> = ({ items }) => {
    const { addToCart, removeFromCart } = useCart();

    const increaseQuantity = (product: Product) => {
        addToCart(product, 1);
    };

    const decreaseQuantity = (product: Product) => {
        if (product && product.stock > 1) {
            addToCart(product, -1);
        }
    };

    const handleRemoveItem = (slug: string) => {
        removeFromCart(slug);
    };

    return (
        <div className="bg-white border border-[#e1e3e4] rounded">
            {items.length > 0 ? (
                <table className="w-full border-collapse">
                    <thead className="border-b border-[#e1e3e4] p-4">
                        <tr className="">
                            <th className="text-left px-3 py-5 table-card-body-header">
                                Produit
                            </th>
                            <th className="text-center px-3 py-5 table-card-body-header">
                                Quantité
                            </th>
                            <th className="text-right px-3 py-5 table-card-body-header">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr
                                key={item.product.slug}
                                className="border-b border-[#e1e3e4] last:border-0"
                            >
                                <td className="p-8 flex items-center gap-3">
                                    <img
                                        src={item.product.imageUrl}
                                        alt={item.product.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div>
                                        <h3 className="product-desc-text">
                                            {item.product.name}
                                        </h3>
                                        <p className="product-desc">
                                            {item.product.description.slice(
                                                0,
                                                75
                                            )}
                                            {item.product.description.length >
                                            75
                                                ? '...'
                                                : ''}
                                        </p>
                                        <p className="product-price">
                                            {item.product.price.toFixed(2)} dhs
                                        </p>
                                    </div>
                                </td>
                                <td className="p-8 text-center">
                                    <div className="flex items-center justify-center border border-gray-300 rounded w-fit mx-auto">
                                        <button
                                            onClick={() =>
                                                decreaseQuantity(item.product)
                                            }
                                            disabled={item.quantity <= 1}
                                            className="px-3 py-1 hover:bg-gray-300 disabled:opacity-50"
                                        >
                                            -
                                        </button>
                                        <span className="px-4">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() =>
                                                increaseQuantity(item.product)
                                            }
                                            disabled={
                                                item.quantity >=
                                                item.product.stock
                                            }
                                            className="px-3 py-1 hover:bg-gray-300 disabled:opacity-50"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleRemoveItem(item.product.slug)
                                        }
                                        className="table-card-body-header hover:underline"
                                    >
                                        Supprimer
                                    </button>
                                </td>
                                <td className="p-8 text-right font-medium">
                                    {(
                                        item.product.price * item.quantity
                                    ).toFixed(2)}{' '}
                                    dhs
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-500 text-center py-4">
                    Votre panier est vide
                </p>
            )}
        </div>
    );
};

export default Cart;
