import { Product } from '../../types/product';
import ProductItem from './ProductItem';

interface RecentlyViewedProductsProps {
    products: Product[];
}

const RecentlyViewedProducts: React.FC<RecentlyViewedProductsProps> = ({
    products,
}) => {
    if (products.length === 0) return null;

    return (
        <div className="mt-8">
            <h2 className="card-page-heading">Vu récemment</h2>
            <div className="card grid grid-cols-5">
                {products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default RecentlyViewedProducts;
