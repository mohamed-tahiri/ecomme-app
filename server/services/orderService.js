import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';
import Product from '../models/Product.js';

export const createOrder = async ({ userId, cartItems }) => {
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

    const order = await Order.create({ userId, total });

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
                include: ['product'],
            },
        ],
        order: [['createdAt', 'DESC']],
    });

    return orders;
};
