// Developer: Mohamed Tahiri
import {
    getACartsByUser,
    getCartById,
    createCart,
    updateCart,
    deleteCart,
} from '../services/paymentCart.service.js';

/**
 * @swagger
 * tags:
 *   - name: Payment Carts
 *     description: Operations related to user's payment cards
 */

/**
 * @swagger
 * /api/v1/payment-carts/user/{userId}:
 *   get:
 *     summary: Get all payment cards by user
 *     tags: [Payment Carts]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of payment cards
 */
export const getCartsByUserController = async (req, res) => {
    try {
        const carts = await getACartsByUser(req.params.userId);

        if (carts.length === 0) {
            return res
                .status(404)
                .json({ message: 'Aucun carte trouvé pour cet utilisateur.' });
        }

        res.json(carts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/v1/payment-carts/{id}:
 *   get:
 *     summary: Get payment card by ID
 *     tags: [Payment Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment card found
 *       404:
 *         description: Payment card not found
 */
export const getCartByIdController = async (req, res) => {
    try {
        const cart = await getCartById(req.params.id);
        if (!cart)
            return res.status(404).json({ message: 'Payment card not found' });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/v1/payment-carts:
 *   post:
 *     summary: Create a new payment card
 *     tags: [Payment Carts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - cardNumber
 *               - expiryDate
 *               - cvv
 *               - cardHolder
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "uuid-user-id"
 *               cardNumber:
 *                 type: string
 *                 example: "4111111111111111"
 *               expiryDate:
 *                 type: string
 *                 example: "12/26"
 *               cvv:
 *                 type: string
 *                 example: "123"
 *               cardHolder:
 *                 type: string
 *                 example: "John Doe"
 *     responses:
 *       201:
 *         description: Payment card created
 */
export const createCartController = async (req, res) => {
    try {
        const cart = await createCart(req.body);
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/v1/payment-carts/{id}:
 *   put:
 *     summary: Update a payment card
 *     tags: [Payment Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cardNumber:
 *                 type: string
 *                 example: "4111111111111111"
 *               expiryDate:
 *                 type: string
 *                 example: "12/28"
 *               cvv:
 *                 type: string
 *                 example: "456"
 *               cardHolder:
 *                 type: string
 *                 example: "Jane Smith"
 *     responses:
 *       200:
 *         description: Payment card updated
 *       404:
 *         description: Payment card not found
 */
export const updateCartController = async (req, res) => {
    try {
        const updatedCart = await updateCart(req.params.id, req.body);
        if (!updatedCart)
            return res.status(404).json({ message: 'Payment card not found' });
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/v1/payment-carts/{id}:
 *   delete:
 *     summary: Delete a payment card
 *     tags: [Payment Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment card deleted successfully
 *       404:
 *         description: Payment card not found
 */
export const deleteCartController = async (req, res) => {
    try {
        const deleted = await deleteCart(req.params.id);
        if (!deleted)
            return res.status(404).json({ message: 'Payment card not found' });
        res.json({ message: 'Payment card deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
