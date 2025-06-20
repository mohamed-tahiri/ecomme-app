import { useCart } from '../context/CartContext';
import Cart from '../components/cart/Cart';
import RecentlyViewedProducts from '../components/recentlyviewed/RecentlyViewedProducts';
import LivraisonInfo from '../components/order/LivraisonInfo';
import PaiementInfo from '../components/order/PaiementInfo';
import Estimation from '../components/order/Estimation';
import styles from './../components/order/OrderPage.module.css';

const OrderPage: React.FC = () => {
    const { cart } = useCart();

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

                <div className={styles.gridContainer}>
                    <div className={`${styles.mainSection} space-y-6`}>
                        <Cart items={cart} isReadOnly />
                        <LivraisonInfo />
                        <PaiementInfo />
                    </div>
                    <div className={styles.sidebar}>
                        <Estimation />
                    </div>
                </div>
            </div>
            <RecentlyViewedProducts />
        </>
    );
};

export default OrderPage;
