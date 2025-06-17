import { createOrder, getUserOrders } from '../services/order.service.js';

/**
 * @swagger
 * tags:
 *   - name: Orders
 *     description: Operations related to user orders
 */

/**
 * @swagger
 * /api/v1/orders:
 *   post:
 *     summary: Create a new order from cart items
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       format: uuid
 *                     quantity:
 *                       type: integer
 *                     example:
 *                       productId: "abc-123"
 *                       quantity: 2
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid input or cart is empty
 */
export const createOrderController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { cartItems, addressId, paymentCartId, paymentMethod } = req.body;

        const order = await createOrder(
            userId,
            cartItems,
            addressId,
            paymentCartId,
            paymentMethod
        );

        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     summary: Get current user's orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user orders
 *       500:
 *         description: Server error
 */
export const getUserOrdersController = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await getUserOrders(userId);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
