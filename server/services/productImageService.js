// services/productImageService.js
import Product from '../models/Product.js';
import ProductImage from '../models/ProductImage.js'; // Assure-toi de créer ce modèle pour gérer les images des produits.

const uploadProductImage = async (productId, data) => {
    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            throw new Error('Product not found');
        }

        const imageData = {
            ...data,
            altText: product.name,
            productId,
        };

        const newImage = await ProductImage.create(imageData);

        return newImage;
    } catch (error) {
        throw error;
    }
};

const getProductImages = async (productId) => {
    try {
        const productImages = await ProductImage.findAll({
            where: { productId },
        });
        return productImages;
    } catch (error) {
        throw error;
    }
};

const deleteProductImage = async (imageId) => {
    try {
        const image = await ProductImage.findByPk(imageId);
        if (!image) {
            throw new Error('Image not found');
        }

        await image.destroy();
        return { message: 'Image deleted successfully' };
    } catch (error) {
        throw error;
    }
};

export { uploadProductImage, getProductImages, deleteProductImage };
