import { useCart } from '../context/CartContext';
import Cart from '../components/cart/Cart';
import Garantie from '../components/cart/Garantie';
import AddToPanier from '../components/cart/AddToPanier';
import CommandCart from '../components/cart/CommandCart';
import Estimation from '../components/cart/Estimation';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import RecentlyViewedProducts from '../components/recentlyviewed/RecentlyViewedProducts';

const CartPage: React.FC = () => {
    const { recentlyViewed } = useRecentlyViewed();
    const { cart } = useCart(); // Récupérer les éléments du panier depuis le contexte

    return (
        <div className="space-y-4">
            <h2 className="card-text-heading">Votre Panier</h2>
            <p>Vous bénéficiez des frais de livraison gratuits !</p>
            <div className="grid grid-cols-4 gap-8">
                <div className="col-span-3 space-y-4">
                    <Cart items={cart} />
                    <Estimation />
                    <Garantie />
                </div>
                <div>
                    <CommandCart />
                </div>
            </div>
            <AddToPanier />
            <RecentlyViewedProducts products={recentlyViewed} />
        </div>
    );
};

export default CartPage;
