import React from 'react';
import { Product } from '../../../types/product';
import ProductItem from '../../productsitem/ProductItem';

interface ProductListProps {
    products: Product[];
}

const SpaceProductList: React.FC<ProductListProps> = ({ products }) => {
    return (
        <div className="flex bg-white md:grid md:grid-cols-4 w-full">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="border-r border-[var(--border-color)] last:border-r-0 flex items-center justify-center bg-white"
                >
                    <ProductItem product={product} withoutCartSection={true} />
                </div>
            ))}
        </div>
    );
};

export default SpaceProductList;
