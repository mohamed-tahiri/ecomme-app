import { useEffect, useState } from 'react';
import { Product } from '../../../types/product';
import { ProductImage } from '../../../types/productImage';
import api from '../../../services/productsService';
import { Link } from 'react-router-dom';

interface SearchProductItem {
    product: Product;
    setShowResults: (value: boolean) => void;
}

const SearchProductItem: React.FC<SearchProductItem> = ({
    product,
    setShowResults,
}) => {
    const [images, setImages] = useState<ProductImage[]>([]);
    const [selectedImage, setSelectedImage] = useState<ProductImage | null>(
        null
    );

    const fetchProductImages = async (productId: string) => {
        try {
            const productImages = await api.getImagesByProduct(productId);
            setImages(productImages);
            if (productImages.length > 0) {
                setSelectedImage(
                    productImages.find((image) => image.isPrimary) ||
                        productImages[0]
                );
            }
        } catch (error) {
            console.error(
                'Erreur lors du chargement des images du produit:',
                error
            );
        }
    };

    useEffect(() => {
        if (product) {
            fetchProductImages(product.id);
        }
    }, [product]);

    return (
        <>
            <div className="border-0 flex py-2 px-6">
                <Link
                    to={`/products/${product.slug}`}
                    onClick={() => setShowResults(false)}
                >
                    <img
                        src={selectedImage?.imageUrl}
                        alt={selectedImage?.altText}
                        className="w-12 h-14 object-contain transition-all duration-300 cursor-pointer"
                        onMouseEnter={() =>
                            images.length > 0 && setSelectedImage(images[1])
                        }
                        onMouseLeave={() =>
                            setSelectedImage(
                                images.find((image) => image.isPrimary) ||
                                    images[0]
                            )
                        }
                    />
                </Link>
                <div className="px-6">
                    <h2 className="product-search-heading">{product.name}</h2>
                    <h5 className="product-search-price">
                        {product.price} dhs
                    </h5>
                </div>
            </div>
        </>
    );
};

export default SearchProductItem;
