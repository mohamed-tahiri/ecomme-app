// Developer: Mohamed Tahiri
import {
    getReviewsByProduct,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
    getReviewStatsAndRecent,
} from '../services/review.service.js';

/**
 * @swagger
 * tags:
 *   - name: Reviews
 *     description: Operations related to product reviews
 */

/**
 * @swagger
 * /api/v1/reviews/overview:
 *   get:
 *     summary: Get latest 10 reviews and global statistics
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Latest reviews and global statistics
 *       500:
 *         description: Server error
 */
export const getReviewStatsAndRecentController = async (req, res) => {
    try {
        const data = await getReviewStatsAndRecent();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/v1/reviews/product/{productId}:
 *   get:
 *     summary: Get all reviews for a product
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the product
 *     responses:
 *       200:
 *         description: A list of reviews
 *       500:
 *         description: Server error
 */
export const getReviewsByProductController = async (req, res) => {
    try {
        const reviews = await getReviewsByProduct(req.params.productId);

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/v1/reviews/{id}:
 *   get:
 *     summary: Get a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the review
 *     responses:
 *       200:
 *         description: Review found
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 */
export const getReviewByIdController = async (req, res) => {
    try {
        const review = await getReviewById(req.params.id);
        if (!review)
            return res.status(404).json({ message: 'Review not found' });
        res.json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/v1/reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *               - userId
 *               - productId
 *             properties:
 *               rating:
 *                 type: integer
 *                 example: 4
 *               comment:
 *                 type: string
 *                 example: "Produit de bonne qualité"
 *               userId:
 *                 type: string
 *                 example: "uuid-user-id"
 *               productId:
 *                 type: string
 *                 example: "uuid-product-id"
 *     responses:
 *       201:
 *         description: Review created
 *       500:
 *         description: Server error
 */
export const createReviewController = async (req, res) => {
    try {
        const review = await createReview(req.body);
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/v1/reviews/{id}:
 *   put:
 *     summary: Update a review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: "Mise à jour de mon avis"
 *     responses:
 *       200:
 *         description: Review updated
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 */
export const updateReviewController = async (req, res) => {
    try {
        const updated = await updateReview(req.params.id, req.body);
        if (!updated)
            return res.status(404).json({ message: 'Review not found' });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/v1/reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the review
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 */
export const deleteReviewController = async (req, res) => {
    try {
        const deleted = await deleteReview(req.params.id);
        if (!deleted)
            return res.status(404).json({ message: 'Review not found' });
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
