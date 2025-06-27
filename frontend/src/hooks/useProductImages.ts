// hooks/useProductImages.ts
import { useEffect, useState } from 'react';
import { ProductImage } from '../types/productImage';
import api from '../services/productsService';

export const useProductImages = (productId: string) => {
    const [images, setImages] = useState<ProductImage[]>([]);
    const [selectedImage, setSelectedImage] = useState<ProductImage | null>(
        null
    );

    useEffect(() => {
        if (!productId) return;

        const fetchImages = async () => {
            try {
                const productImages = await api.getImagesByProduct(productId);
                setImages(productImages);
                setSelectedImage(
                    productImages.find((img) => img.isPrimary) ||
                        productImages[0] ||
                        null
                );
            } catch (error) {
                console.error('Erreur lors du chargement des images:', error);
            }
        };

        fetchImages();
    }, [productId]);

    const handleHover = () => {
        if (images.length > 1) {
            setSelectedImage(images[1]);
        }
    };

    const handleLeave = () => {
        setSelectedImage(images.find((img) => img.isPrimary) || images[0]);
    };

    return { images, selectedImage, handleHover, handleLeave };
};
