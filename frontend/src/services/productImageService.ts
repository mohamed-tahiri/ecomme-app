// DEV : MED TAHIRI
import api from './api';

export interface ProductImage {
    id: string;
    productId: string;
    imageUrl: string;
    isPrimary: boolean;
    altText?: string;
}

// Récupérer les images d’un produit
export const getProductImages = async (
    productId: string
): Promise<ProductImage[]> => {
    try {
        const response = await api.get(`/images/${productId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching images for product ${productId}`, error);
        throw error;
    }
};

// Uploader une ou plusieurs images pour un produit
export const uploadProductImages = async (
    productId: string,
    files: File[],
    isPrimary: boolean = false
): Promise<ProductImage[]> => {
    try {
        const formData = new FormData();
        files.forEach((file) => formData.append('files', file));
        formData.append('isPrimary', isPrimary ? 'true' : 'false');

        const response = await api.post(`/images/${productId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error(`Error uploading images for product ${productId}`, error);
        throw error;
    }
};

// Supprimer une image par son id
export const deleteProductImage = async (imageId: string): Promise<void> => {
    try {
        await api.delete(`/images/${imageId}`);
    } catch (error) {
        console.error(`Error deleting image ${imageId}`, error);
        throw error;
    }
};
