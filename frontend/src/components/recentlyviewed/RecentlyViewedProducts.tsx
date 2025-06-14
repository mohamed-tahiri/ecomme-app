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
        <div className="md:mt-8 md:px-0 px-[1.875rem]">
            <h2 className="card-page-heading">Vu récemment</h2>
            <div className="card flex items-center md:grid md:grid-cols-5">
                {products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default RecentlyViewedProducts;
