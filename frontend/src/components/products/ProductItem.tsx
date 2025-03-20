import React from 'react';
import { Product } from '../../types/product';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Import des icônes

interface ProductItemProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onAddToCart }) => {
    return (
        <div className="border p-4 rounded-lg shadow-lg">
            <Link to={`/products/${product.slug}`}>
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                />
                <h3 className="text-xl font-semibold mt-2">{product.name}</h3>
            </Link>
            <p className="text-gray-600">{product.description}</p>

            {/* Stock Indicator */}
            <div className="flex items-center mt-2">
                {product.stock > 0 ? (
                    <span className="text-green-600 flex items-center">
                        <FaCheckCircle className="mr-1" /> En stock
                    </span>
                ) : (
                    <span className="text-red-600 flex items-center">
                        <FaTimesCircle className="mr-1" /> Rupture de stock
                    </span>
                )}
            </div>

            <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold">${product.price}</span>
                <button
                    onClick={() => onAddToCart(product)}
                    className={`px-4 py-2 rounded ${
                        product.stock > 0
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                    }`}
                    disabled={product.stock === 0}
                >
                    Ajouter au panier
                </button>
            </div>
        </div>
    );
};

export default ProductItem;
