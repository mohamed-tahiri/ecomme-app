import { useCart } from '../context/CartContext';
import Cart from '../components/cart/Cart';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import RecentlyViewedProducts from '../components/products/RecentlyViewedProducts';
import LivraisonInfo from '../components/order/LivraisonInfo';
import PaiementInfo from '../components/order/PaiementInfo';
import Estimation from '../components/order/Estimation';

const OrderPage: React.FC = () => {
    const { recentlyViewed } = useRecentlyViewed();
    const { cart } = useCart(); // Récupérer les éléments du panier depuis le contexte

    return (
        <>
            <div className="space-y-4 p-[1.875rem] md:p-0">
                <h2 className="card-text-heading">
                    Récapitulatif de votre commande
                </h2>
                <p>
                    Merci pour votre achat ! Voici les détails de votre
                    commande.
                </p>

                <div className="md:grid md:grid-cols-4 md:gap-8">
                    <div className="md:col-span-3 space-y-4">
                        <Cart items={cart} isReadOnly />
                        <LivraisonInfo />
                        <PaiementInfo />
                        <div className="col-span-1">
                            <Estimation showTitle />
                        </div>
                    </div>
                </div>
            </div>
            <RecentlyViewedProducts products={recentlyViewed} />
        </>
    );
};

export default OrderPage;
