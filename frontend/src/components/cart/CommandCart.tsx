import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const CommandCart = () => {
    const { cart } = useCart();

    // Calcul du total du panier
    const totalPrice = cart.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );

    return (
        <div className="space-y-6">
            <div className="card">
                <div className="border-b border-[var(--border-color)] card-page-garantie-heading flex items-center justify-between">
                    <h2 className="">Total</h2>
                    <h3>{totalPrice.toFixed(2)} dhs</h3>
                </div>
                <div className="p-4">
                    <p>Taxes et livraison calculées au moment de payer</p>
                </div>
                <Link
                    to={'/order'}
                    className="w-full flex items-center justify-center bg-[var(--primary-button-background)] cursor-pointer text-white py-3 flex-center"
                >
                    Commander
                </Link>
            </div>
            <div className="flex items-center justify-center gap-2">
                <div className="h-5 w-5 text-gray-900">
                    <svg
                        focusable="false"
                        className="w-full h-full"
                        viewBox="0 0 12 15"
                        role="presentation"
                    >
                        <g
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            fillRule="evenodd"
                            strokeLinecap="square"
                        >
                            <path d="M6 1C4.32 1 3 2.375 3 4.125V6h6V4.125C9 2.375 7.68 1 6 1zM1 6h10v8H1z"></path>
                        </g>
                    </svg>
                </div>
                <span className="text-sm font-medium">
                    Paiements 100% sécurisés
                </span>
            </div>
        </div>
    );
};

export default CommandCart;
