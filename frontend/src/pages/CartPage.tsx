import { useCart } from '../context/CartContext';
import Cart from '../components/cart/Cart';
import Garantie from '../components/cart/Garantie';
import AddToPanier from '../components/cart/AddToPanier';
import CommandCart from '../components/cart/CommandCart';
import Estimation from '../components/cart/Estimation';
import RecentlyViewedProducts from '../components/recentlyviewed/RecentlyViewedProducts';

const CartPage: React.FC = () => {
    const { cart } = useCart(); // Récupérer les éléments du panier depuis le contexte

    return (
        <>
            <div className="space-y-4 p-[1.875rem] md:p-0">
                <h2 className="card-text-heading">Votre Panier</h2>
                <p>Vous bénéficiez des frais de livraison gratuits !</p>
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="md:col-span-3 space-y-4">
                        <Cart items={cart} />
                        <Estimation />
                        <Garantie />
                    </div>
                    <div>
                        <CommandCart />
                    </div>
                </div>
                <AddToPanier />
            </div>
            <RecentlyViewedProducts />
        </>
    );
};

export default CartPage;
