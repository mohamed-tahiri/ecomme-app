import { FaCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import api from '../../services/productsService';
import { useEffect, useState } from 'react';
import { ProductImage } from '../../types/productImage';

interface ProductItemProps {
    product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    const isInStock = product.stock > 0;
    const [images, setImages] = useState<ProductImage[]>([]);
    const [selectedImage, setSelectedImage] = useState<ProductImage | null>(
        null
    ); // Default to primary image

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
        <div className="p-2 flex">
            <Link to={`/products/${product.slug}`}>
                <img
                    src={selectedImage?.imageUrl}
                    alt={selectedImage?.altText}
                    className="w-[15rem] h-44 object-contain transition-all duration-300"
                    onMouseEnter={() =>
                        images.length > 0 && setSelectedImage(images[1])
                    }
                    onMouseLeave={() =>
                        setSelectedImage(
                            images.find((image) => image.isPrimary) || images[0]
                        )
                    }
                />
            </Link>
            <div className="bg-[#f9f9f9] rounded p-2">
                <h3 className="product-desc-title mb-3">
                    {product.name.slice(0, 20)}
                    {product.name.length > 20 ? '...' : ''}
                </h3>
                <p className="product-desc-text">
                    {product.description.slice(0, 45)}
                    {product.description.length > 45 ? '...' : ''}
                </p>
            </div>
        </div>
    );
};

export default ProductItem;
