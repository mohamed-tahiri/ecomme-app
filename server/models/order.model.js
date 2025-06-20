import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config.js';
import User from './user.model.js';
import Address from './address.model.js';
import PaymentCart from './paymentCart.model.js';

class Order extends Model {}

Order.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        reference: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        status: {
            type: DataTypes.ENUM('pending', 'shipped', 'delivered', 'canceled'),
            defaultValue: 'pending',
        },
        paymentStatus: {
            type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
            defaultValue: 'pending',
        },
        total: { type: DataTypes.FLOAT, allowNull: false },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: 'id',
            },
            allowNull: false,
        },
        addressId: {
            type: DataTypes.UUID,
            references: {
                model: Address,
                key: 'id',
            },
            allowNull: false,
        },
        paymentCartId: {
            type: DataTypes.UUID,
            references: {
                model: PaymentCart,
                key: 'id',
            },
            allowNull: true,
        },
    },
    { sequelize, modelName: 'orders' }
);

Order.beforeCreate(async (order) => {
    const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
    order.reference = `ORD-${new Date().toISOString().split('T')[0]}-${uniqueSuffix}`;
});

Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Order.belongsTo(Address, { foreignKey: 'addressId', as: 'address' });
Order.belongsTo(PaymentCart, {
    foreignKey: 'paymentCartId',
    as: 'paymentCart',
});

export default Order;
