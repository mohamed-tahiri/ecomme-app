import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config.js';
import Cart from './cart.model.js';
import Product from './product.model.js';

class CartItem extends Model {}

CartItem.init(
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
        cardId: {
            type: DataTypes.UUID,
            references: {
                model: Cart,
                key: 'id',
            },
            allowNull: false,
        },
    },
    { sequelize, modelName: 'cart_items' }
);

CartItem.belongsTo(Cart, { foreignKey: 'cardId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });

export default CartItem;
