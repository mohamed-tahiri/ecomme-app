// src/components/products/ProductItem.tsx
import { FaCircle, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { useProductImages } from '../../hooks/useProductImages';
import ProductImageDisplay from '../common/ProductImageDisplay';

interface ProductItemProps {
    product: Product;
    layout?: 'grid' | 'list' | 'simple' | 'card';
    showAddToCartButton?: boolean;
    containerClassName?: string;
    imageClassName?: string;
    truncateName?: number;
    truncateDescription?: number;
    withoutCartSection?: boolean;
    quantity?: number;
    onIncrease?: () => void;
    onDecrease?: () => void;
    onRemove?: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
    product,
    layout = 'grid',
    showAddToCartButton = true,
    containerClassName = '',
    imageClassName = 'w-full h-48 object-contain transition-all duration-300',
    truncateName = 30,
    truncateDescription = 60,
    withoutCartSection = false,
    quantity,
    onIncrease,
    onDecrease,
    onRemove,
}) => {
    const { addToCart } = useCart();
    const isInStock = product.stock > 0;
    const { selectedImage, handleHover, handleLeave } = useProductImages(
        product.id
    );

    const truncate = (text: string, max: number) =>
        text.length > max ? text.slice(0, max) + '...' : text;

    const layoutClasses = {
        grid: 'p-2 w-[14.5rem] md:w-auto',
        list: 'grid grid-cols-4 gap-4 w-full md:flex md:flex-col md:gap-0 md:p-2 md:w-auto border-b pb-4 mb-4 border-[var(--header-border-color)]',
        simple: 'p-2',
        card: 'p-1 flex items-center justify-between gap-4',
    };

    return (
        <div className={`${layoutClasses[layout]} ${containerClassName}`}>
            <div className={layout === 'card' ? 'flex items-center gap-4' : ''}>
                <Link to={`/products/${product.slug}`}>
                    <ProductImageDisplay
                        selectedImage={selectedImage}
                        handleHover={handleHover}
                        handleLeave={handleLeave}
                        className={imageClassName}
                    />
                </Link>
                <div className={layout === 'list' ? 'col-span-3' : ''}>
                    <div
                        className={
                            layout === 'card'
                                ? ''
                                : 'bg-[#f9f9f9] p-2 rounded my-3 h-[6.5rem] overflow-hidden'
                        }
                    >
                        <h3
                            className={
                                layout === 'card'
                                    ? 'product-desc-title'
                                    : 'product-desc-title mb-3'
                            }
                        >
                            {truncate(product.name, truncateName)}
                        </h3>
                        <p className="product-desc-text">
                            {truncate(product.description, truncateDescription)}
                        </p>
                    </div>

                    {/* Section prix et stock */}
                    {!withoutCartSection && (
                        <div>
                            <div className="space-y-4 mb-4">
                                <span className="product-price">
                                    {product.price} dhs
                                </span>
                                {isInStock && (
                                    <span className="product-stock flex-center">
                                        <FaCircle className="mr-1 h-2 w-2" /> En
                                        stock.
                                    </span>
                                )}
                            </div>

                            {showAddToCartButton && (
                                <button
                                    onClick={() => addToCart(product)}
                                    disabled={!isInStock}
                                    className={`w-full px-4 py-2 rounded flex-center justify-center cursor-pointer ${
                                        isInStock
                                            ? 'bg-[var(--primary-button-background)] text-white'
                                            : 'bg-[#8a9297] text-white'
                                    }`}
                                >
                                    <FaShoppingCart className="mr-2" />
                                    {isInStock
                                        ? 'Ajouter au panier'
                                        : 'Rupture'}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Section quantité + suppression */}
            {typeof quantity === 'number' && (
                <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-center border border-gray-300 rounded w-fit mx-auto">
                        <button
                            onClick={onDecrease}
                            disabled={quantity <= 1}
                            className="px-3 py-1 hover:bg-gray-300 disabled:opacity-50"
                        >
                            -
                        </button>
                        <span className="px-4">{quantity}</span>
                        <button
                            onClick={onIncrease}
                            disabled={quantity >= product.stock}
                            className="px-3 py-1 hover:bg-gray-300 disabled:opacity-50"
                        >
                            +
                        </button>
                    </div>

                    {onRemove && (
                        <button
                            onClick={onRemove}
                            className="text-sm text-red-500 hover:underline block mx-auto"
                        >
                            Supprimer
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductItem;
