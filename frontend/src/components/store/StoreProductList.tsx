import React from 'react';
import { Product } from '../../types/product';
import ProductItem from './StoreProductItem';

interface ProductListProps {
    products: Product[];
}

const StoreProductList: React.FC<ProductListProps> = ({ products }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3">
            {products.map((product) => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    );
};

export default StoreProductList;
