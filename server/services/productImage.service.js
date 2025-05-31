// services/productImageService.js
import Product from '../models/product.model.js';
import ProductImage from '../models/productImage.model.js';
import { getFileMetadata, updateFile } from './file.service.js';

const uploadProductImage = async (productId, data, file) => {
    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            throw new Error('Product not found');
        }

        const fileData = getFileMetadata(file);

        const imageData = {
            isPrimary: data,
            altText: product.name,
            productId,
            imageUrl: fileData.path,
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
