import { useRecentlyViewed } from '../../hooks/useRecentlyViewed';
import ProductItem from '../productsitem/ProductItem';

const RecentlyViewedProducts: React.FC = () => {
    const { recentlyViewed } = useRecentlyViewed();

    if (recentlyViewed.length === 0) return null;

    return (
        <div className="mt-6 px-4 sm:px-6 md:px-0">
            <h2 className="card-page-heading mb-4">Vu récemment</h2>

            <div className="card flex gap-4 overflow-x-auto md:hidden pb-2">
                {recentlyViewed.map((product) => (
                    <div
                        key={product.id}
                        className="min-w-[180px] flex-shrink-0"
                    >
                        <ProductItem product={product} />
                    </div>
                ))}
            </div>

            <div className="card hidden md:grid md:grid-cols-5 gap-4">
                {recentlyViewed.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default RecentlyViewedProducts;
