import express from 'express';
import { getProductsController, getProductByIdController } from '../controllers/productController.js';

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

router.get('/', getProductsController);
router.get('/:id', getProductByIdController);

export default router;
