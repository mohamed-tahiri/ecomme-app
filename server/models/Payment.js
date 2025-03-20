import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import Order from './Order.js';

class Payment extends Model {}

Payment.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        amount: { type: DataTypes.FLOAT, allowNull: false },
        status: {
            type: DataTypes.ENUM('pending', 'completed', 'failed'),
            defaultValue: 'pending',
        },
        orderId: {
            type: DataTypes.UUID,
            references: {
                model: Order,
                key: 'id',
            },
            allowNull: false,
        },
    },
    { sequelize, modelName: 'payments' }
);

Payment.belongsTo(Order, { foreignKey: 'orderId' });

export default Payment;
