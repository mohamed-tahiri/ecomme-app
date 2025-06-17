import Order from '../models/order.model.js';
import OrderItem from '../models/orderItem.model.js';
import Product from '../models/product.model.js';

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
