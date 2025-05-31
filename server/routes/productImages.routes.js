// routes/productImageRoutes.js
import express from 'express';
import {
    uploadProductImageController,
    getProductImagesController,
    deleteProductImageController,
} from '../controllers/productImages.controller.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductImage:
 *       type: object
 *       required:
 *         - id
 *         - productId
 *         - imageUrl
 *       properties:
 *         id:
 *           type: string
 *         productId:
 *           type: string
 *         imageUrl:
 *           type: string
 *       example:
 *         id: "1"
 *         productId: "12345"
 *         imageUrl: "https://example.com/image.jpg"
 */

router
    .route('/:productId')
    .get(getProductImagesController)
    .post(uploadProductImageController);

router.route('/:imageId').delete(deleteProductImageController);

export default router;
