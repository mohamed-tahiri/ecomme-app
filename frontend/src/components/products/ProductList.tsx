import React from 'react';
import { Product } from '../../types/product';
import ProductItem from './ProductItem';

interface ProductListProps {
    products: Product[];
    onAddToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {products.map((product) => (
                <ProductItem
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                />
            ))}
        </div>
    );
};

export default ProductList;
