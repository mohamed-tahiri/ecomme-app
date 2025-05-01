import {
    getStoresByOwner,
    getStoreById,
    getStoreBySlug,
    createStore,
} from '../services/storeService.js';

/**
 * @swagger
 * tags:
 *   - name: stores
 *     description: Operations related to stores
 */

/**
 * @swagger
 * /api/v1/stores/owner/{ownerId}:
 *   get:
 *     tags:
 *       - stores
 *     summary: Get stores by owner ID
 *     parameters:
 *       - in: path
 *         name: ownerId
 *         required: true
 *         schema:
 *           type: string
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
 *     responses:
 *       200:
 *         description: List of stores owned by the user
 */
export const getStoresByOwnerController = async (req, res) => {
    try {
        const { ownerId } = req.params;
        const { page = 1, limit = 10 } = req.query;

        const stores = await getStoresByOwner(
            ownerId,
            parseInt(page),
            parseInt(limit)
        );
        res.json(stores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/v1/stores/{id}:
 *   get:
 *     tags:
 *       - stores
 *     summary: Get a store by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single store
 *       404:
 *         description: Store not found
 */
export const getStoreByIdController = async (req, res) => {
    try {
        const store = await getStoreById(req.params.id);
        if (!store) return res.status(404).json({ message: 'Store not found' });
        res.json(store);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/v1/stores/slug/{slug}:
 *   get:
 *     tags:
 *       - stores
 *     summary: Get a store by slug
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single store
 *       404:
 *         description: Store not found
 */
export const getStoreBySlugController = async (req, res) => {
    try {
        const store = await getStoreBySlug(req.params.slug);
        if (!store) return res.status(404).json({ message: 'Store not found' });
        res.json(store);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/v1/stores:
 *   post:
 *     tags:
 *       - stores
 *     summary: Create a new store
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - ownerId
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               ownerId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Store created successfully
 *       400:
 *         description: Invalid data
 */
export const createStoreController = async (req, res) => {
    try {
        const store = await createStore(req.body);
        res.status(201).json(store);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
