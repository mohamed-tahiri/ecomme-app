import React from 'react';
import { ProductImage } from '../../types/productImage';

interface Props {
    selectedImage: ProductImage | null;
    handleHover: () => void;
    handleLeave: () => void;
    className?: string;
}

const ProductImageDisplay: React.FC<Props> = ({
    selectedImage,
    handleHover,
    handleLeave,
    className = 'w-full h-48 object-contain transition-all duration-300',
}) => {
    if (!selectedImage) return null;

    const imageUrl = selectedImage.imageUrl.startsWith('http')
        ? selectedImage.imageUrl
        : `${import.meta.env.VITE_API_URL_IMAGES}/${selectedImage.imageUrl}`;

    return (
        <img
            src={imageUrl}
            crossOrigin="anonymous"
            alt={selectedImage.altText || ''}
            className={className}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
        />
    );
};

export default ProductImageDisplay;
