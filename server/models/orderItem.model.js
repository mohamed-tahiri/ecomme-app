import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config.js';
import Order from './order.model.js';
import Product from './product.model.js';

class OrderItem extends Model {}

OrderItem.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        productId: {
            type: DataTypes.UUID,
            references: {
                model: Product,
                key: 'id',
            },
            allowNull: false,
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
    { sequelize, modelName: 'order_items' }
);

OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

export default OrderItem;
