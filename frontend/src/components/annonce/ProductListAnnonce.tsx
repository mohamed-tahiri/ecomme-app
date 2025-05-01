import React from 'react';
import { Product } from '../../types/product';
import ProductItemAnnonce from './ProductItemAnnonce';

interface ProductListProps {
    products: Product[];
}

const ProductListAnnonce: React.FC<ProductListProps> = ({ products }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {products.map((product) => (
                <ProductItemAnnonce key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductListAnnonce;
