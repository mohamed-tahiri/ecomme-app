import {
    getProducts,
    getProductsBySlugCategory,
    getProductById,
    getProductBySlug,
    createProduct,
} from '../services/productService.js';

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
        if (price)
            filters.price = price.split(',').map((v) => parseFloat(v.trim()));

        const products = await getProducts(page, limit, filters);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/v1/products/category/{slug}:
 *   get:
 *     tags:
 *       - products
 *     summary: Get a list of products by category slug
 *     description: Returns a list of products in a specific category using the category slug, with pagination and optional filters.
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The slug of the category.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of items per page.
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: The name filter for products.
 *       - in: query
 *         name: price
 *         schema:
 *           type: string
 *           example: "100,200"
 *         description: The price filter for products, given as a comma-separated range (e.g., "100,200").
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
 *       404:
 *         description: Category not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
const getProductsBySlugCategoryController = async (req, res) => {
    try {
        const { slug } = req.params;
        const { page, limit, name, price } = req.query;
        const filters = {};

        if (name) filters.name = name;
        if (price)
            filters.price = price.split(',').map((v) => parseFloat(v.trim()));

        const products = await getProductsBySlugCategory(
            slug,
            page,
            limit,
            filters
        );
        res.json(products);
    } catch (error) {
        if (error.message === 'Category not found') {
            res.status(404).json({ message: 'Category not found' });
        } else {
            res.status(500).json({ message: error.message });
        }
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

/**
 * @swagger
 * /api/v1/products/slug/{slug}:
 *   get:
 *     tags:
 *       - products
 *     summary: Get a product by Slug
 *     description: Fetch product details by Slug.
 *     parameters:
 *       - in: path
 *         name: slug
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
const getProductBySlugController = async (req, res) => {
    try {
        const product = await getProductBySlug(req.params.slug);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     tags:
 *       - products
 *     summary: Create a new product
 *     description: Adds a new product to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - stock
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               categoryId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input
 */
const createProductController = async (req, res) => {
    try {
        const product = await createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export {
    getProductsController,
    getProductsBySlugCategoryController,
    getProductByIdController,
    getProductBySlugController,
    createProductController,
};
