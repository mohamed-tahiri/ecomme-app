import React from 'react';
import { Product } from '../../types/product';
import ProductItem from '../productsitem/ProductItem';

interface ProductListProps {
    products: Product[];
    containerClassName?: string;
}

const ProductList: React.FC<ProductListProps> = ({
    products,
    containerClassName = 'md:grid-cols-4',
}) => {
    return (
        <div className={`grid grid-cols-1 ${containerClassName} gap-4`}>
            {products.map((product) => (
                <ProductItem key={product.id} product={product} layout="list" />
            ))}
        </div>
    );
};

export default ProductList;
