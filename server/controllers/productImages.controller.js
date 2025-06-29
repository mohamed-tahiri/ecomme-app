import path from 'path';
import fs from 'fs';

// controllers/productImageController.js
import {
    uploadProductImage,
    getProductImages,
    deleteProductImage,
} from '../services/productImage.service.js';

/**
 * @swagger
 * tags:
 *   - name: productImages
 *     description: Operations related to product images
 */

/**
 * @swagger
 * /api/v1/images/{productId}:
 *   post:
 *     tags:
 *       - productImages
 *     summary: Upload an image for a product
 *     description: Upload an image for a specific product by its ID.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - imageUrl
 *               - isPrimary
 *             properties:
 *               imageUrl:
 *                 type: string
 *                 description: URL of the product image.
 *               isPrimary:
 *                 type: boolean
 *                 description: Whether the image is the primary image for the product.
 *     responses:
 *       201:
 *         description: Image uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductImage'
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Internal server error.
 */
const uploadProductImageController = async (req, res) => {
    try {
        const { productId } = req.params;
        const files = req.files;

        const uploadedImages = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const isPrimary = i === 0;
            const image = await uploadProductImage(productId, isPrimary, file);
            uploadedImages.push(image);
        }

        res.status(201).json(uploadedImages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/v1/images/{productId}:
 *   get:
 *     tags:
 *       - productImages
 *     summary: Get all images for a product
 *     description: Returns a list of all images associated with a product by its ID.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product.
 *     responses:
 *       200:
 *         description: A list of product images.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductImage'
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Internal server error.
 */
const getProductImagesController = async (req, res) => {
    try {
        const { productId } = req.params;
        const images = await getProductImages(productId);
        if (!images || images.length === 0) {
            return res
                .status(404)
                .json({ message: 'No images found for this product' });
        }
        res.json(images);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/v1/images/{imageId}:
 *   delete:
 *     tags:
 *       - productImages
 *     summary: Delete an image of a product
 *     description: Deletes a specific image for a product.
 *     parameters:
 *       - in: path
 *         name: imageId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the image to delete.
 *     responses:
 *       200:
 *         description: Image deleted successfully.
 *       404:
 *         description: Image not found.
 *       500:
 *         description: Internal server error.
 */
const deleteProductImageController = async (req, res) => {
    try {
        const { imageId } = req.params;
        const result = await deleteProductImage(imageId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🧠 Add image serving controller here
const getImageController = (req, res) => {
    const imageUrl = req.params.imageUrl;
    const imagePath = path.join(process.cwd(), 'uploads', 'images', imageUrl);

    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ message: 'Image not found' });
        }

        res.sendFile(imagePath);
    });
};

export {
    uploadProductImageController,
    getProductImagesController,
    deleteProductImageController,
    getImageController,
};
