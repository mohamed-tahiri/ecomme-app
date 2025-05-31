import React from 'react';
import { Product } from '../../types/product';
import SpaceProductItem from './SpaceProductItem';

interface ProductListProps {
    products: Product[];
}

const SpaceProductList: React.FC<ProductListProps> = ({ products }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 bg-white h-full rounded-[.1rem]">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="border-r border-[var(--border-color)]"
                >
                    <SpaceProductItem product={product} />
                </div>
            ))}
        </div>
    );
};

export default SpaceProductList;
