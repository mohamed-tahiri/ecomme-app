import React from 'react';
import { Product } from '../../types/product';
import { Link } from 'react-router-dom';
import { FaCircle, FaShoppingCart } from 'react-icons/fa';

interface ProductItemProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onAddToCart }) => {
    const isInStock = product.stock > 0; // Vérifie si le produit est en stock

    return (
        // <div className="border border-[var(--border-color)] p-2">
        <div className="p-2">
            <Link to={`/products/${product.slug}`}>
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-44 object-cover"
                />
            </Link>
            <div className="bg-[#f9f9f9] p-2 rounded my-3">
                <h3 className="product-desc-title mb-3">{product.name}</h3>
                <p className="product-desc-text">
                    {product.description.slice(0, 75)}
                    {product.description.length > 75 ? '...' : ''}
                </p>
            </div>
            <div className="space-y-4 mb-4">
                <span className="product-price">{product.price} dhs</span>
                {isInStock && (
                    <span className="product-stock flex-center">
                        <FaCircle className="mr-1 h-2 w-2" /> En stock.
                    </span>
                )}
            </div>

            {/* Vérifie si le produit est en stock */}
            <div>
                {isInStock ? (
                    <button
                        onClick={() => onAddToCart(product)}
                        className="w-full bg-[var(--primary-button-background)] text-white px-4 py-2 rounded flex-center justify-center"
                    >
                        <FaShoppingCart className="mr-2" /> Ajouter au panier
                    </button>
                ) : (
                    <button
                        disabled
                        className="bg-[#8a9297] text-white px-4 py-2 rounded flex-center justify-center"
                    >
                        Rupture
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductItem;
