import { getProducts, getProductById } from '../services/productService.js';

/**
 * @swagger
 * tags:
 *   - name: products
 *     description: Operations related to products
 */


/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     tags:
 *       - products
 *     summary: Get a list of products
 *     description: Returns a list of products with pagination and optional filters.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *       - in: query
 *         name: price
 *         schema:
 *           type: string
 *           example: "100,200"
 *     responses:
 *       200:
 *         description: A list of products with pagination info.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalCount:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 */
const getProductsController = async (req, res) => {
  try {
    const { page, limit, name, price } = req.query;
    const filters = {};

    if (name) filters.name = name;
    if (price) filters.price = price.split(',').map((v) => parseFloat(v.trim()));

    const products = await getProducts(page, limit, filters);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     tags:
 *       - products
 *     summary: Get a product by ID
 *     description: Fetch product details by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A product object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
const getProductByIdController = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getProductsController, getProductByIdController };
