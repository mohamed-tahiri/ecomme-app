import React from 'react';
import { Product } from '../../types/product';
import SpaceProductItem from './SpaceProductItem';

interface ProductListProps {
    products: Product[];
}

const SpaceProductList: React.FC<ProductListProps> = ({ products }) => {
    return (
        <div className="flex items-center md:grid md:grid-cols-4 bg-white rounded-[.1rem] m-1">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="border-r border-[var(--border-color)] last:border-r-0"
                >
                    <SpaceProductItem product={product} />
                </div>
            ))}
        </div>
    );
};

export default SpaceProductList;
