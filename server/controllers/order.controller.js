import {
    createOrder,
    getUserOrders,
    getOrderById,
    getSimilarProducts,
} from '../services/order.service.js';
import Order from '../models/order.model.js';
import User from '../models/user.model.js';

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
        const userId = req.user.userId || req.user.id;
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
        const { id } = req.params;
        const orders = await getUserOrders(id);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/v1/orders/{orderId}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order to retrieve
 *     responses:
 *       200:
 *         description: Order details
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
export const getOrderByIdController = async (req, res) => {
    try {
        const userId = req.user.userId || req.user.id;
        const { id } = req.params;

        const resultat = await getOrderById(id, userId);

        if (!resultat) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({
            order: resultat.order,
            items: resultat.orderItems,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/v1/orders/{id}/similar-products:
 *   get:
 *     summary: Get similar products based on ordered items
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: List of similar products
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
export const getSimilarProductsController = async (req, res) => {
    try {
        const { id } = req.params;

        const products = await getSimilarProducts(id);

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/v1/orders/admin/all:
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
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
 *     responses:
 *       200:
 *         description: List of all orders with pagination
 *       500:
 *         description: Server error
 */
export const getAllOrdersController = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await Order.findAndCountAll({
            limit,
            offset,
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email'],
                },
            ],
        });

        const totalPages = Math.ceil(count / limit);

        res.status(200).json({
            data: rows,
            pagination: {
                page,
                limit,
                totalCount: count,
                totalPages,
            },
        });
    } catch (error) {
        console.error('Error fetching all orders:', error);
        res.status(500).json({ message: error.message });
    }
};
