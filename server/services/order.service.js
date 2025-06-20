import { Op } from 'sequelize';
import Address from '../models/address.model.js';
import Category from '../models/category.model.js';
import Order from '../models/order.model.js';
import OrderItem from '../models/orderItem.model.js';
import PaymentCart from '../models/paymentCart.model.js';
import Product from '../models/product.model.js';
import User from '../models/user.model.js';

export const createOrder = async (
    userId,
    cartItems,
    addressId,
    paymentCartId,
    paymentMethod
) => {
    console.log(userId, cartItems, addressId, paymentCartId, paymentMethod);

    if (!cartItems || !cartItems.length) {
        throw new Error('Cart is empty');
    }

    let total = 0;

    const products = await Promise.all(
        cartItems.map(async ({ productId, quantity }) => {
            const product = await Product.findByPk(productId);
            if (!product) throw new Error(`Product not found: ${productId}`);
            total += product.price * quantity;
            return { product, quantity };
        })
    );

    const adjustedPaymentCartId =
        paymentMethod === 'cod' ? null : paymentCartId;

    const order = await Order.create({
        userId,
        total,
        addressId,
        paymentCartId: adjustedPaymentCartId,
    });

    await Promise.all(
        products.map(({ product, quantity }) =>
            OrderItem.create({
                productId: product.id,
                orderId: order.id,
                quantity,
            })
        )
    );

    return order;
};

export const getUserOrders = async (userId) => {
    const orders = await Order.findAll({
        where: { userId },
        include: [
            {
                model: OrderItem,
                include: [Product],
            },
            {
                model: Product,
                through: { attributes: [] },
            },
            {
                model: User,
                as: 'user',
            },
            {
                model: Address,
                as: 'address',
            },
            {
                model: PaymentCart,
                as: 'paymentCart',
            },
        ],
        order: [['createdAt', 'DESC']],
    });

    return orders;
};

export const getOrderById = async (id, userId) => {
    const order = await Order.findOne({
        where: {
            id,
            userId,
        },
        include: [
            {
                model: User,
                as: 'user',
                attributes: { exclude: ['password'] },
            },
            {
                model: Address,
                as: 'address',
            },
            {
                model: PaymentCart,
                as: 'paymentCart',
            },
        ],
    });

    const orderItems = await OrderItem.findAll({
        where: {
            orderId: id,
        },
        include: [
            {
                model: Product,
                as: 'product',
            },
        ],
    });

    return {
        order,
        orderItems,
    };
};

export const getSimilarProducts = async (id) => {
    const order = await Order.findByPk(id);

    if (!order)
        return res.status(404).json({ message: 'Commande non trouvée' });

    const orderItems = await OrderItem.findAll({
        where: {
            orderId: order.id,
        },
        include: {
            model: Product,
            as: 'product',
            include: {
                model: Category,
            },
        },
    });

    const categoryIds = orderItems.map((oi) => oi.product.Category.id);
    const productIdsInOrder = orderItems.map((oi) => oi.product.id);

    const similarProducts = await Product.findAll({
        where: {
            categoryId: categoryIds,
            id: { [Op.notIn]: productIdsInOrder },
        },
        limit: 10,
    });

    return similarProducts;
};
