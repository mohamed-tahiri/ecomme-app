import express from 'express';
import {
    getProductsController,
    getProductsBySlugCategoryController,
    getProductByIdController,
    getProductBySlugController,
    createProductController,
    getProductsByVendorController,
    getProductsBySlugStoreController,
} from '../controllers/productController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - price
 *         - stock
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *           format: float
 *         stock:
 *           type: integer
 *       example:
 *         id: "12345"
 *         name: "Product Name"
 *         description: "A brief description of the product."
 *         price: 99.99
 *         stock: 100
 */

router
    .route('/')
    .get(getProductsController)
    .post(authenticate, createProductController);

router.route('/category/:slug').get(getProductsBySlugCategoryController);

router.route('/store/:slug').get(getProductsBySlugStoreController);

router
    .route('/vendor/:vendorId')
    .get(authenticate, getProductsByVendorController);

router.route('/:id').get(getProductByIdController);

router.route('/slug/:slug').get(getProductBySlugController);

export default router;
