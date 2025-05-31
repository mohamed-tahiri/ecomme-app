import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config.js';
import User from './user.model.js';

class Order extends Model {}

Order.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        status: {
            type: DataTypes.ENUM('pending', 'shipped', 'delivered', 'canceled'),
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
    },
    { sequelize, modelName: 'orders' }
);

Order.belongsTo(User, { foreignKey: 'userId' });

export default Order;
