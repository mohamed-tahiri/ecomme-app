import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config.js';
import User from './user.model.js';
import Product from './product.model.js';

class Review extends Model {}

Review.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        rating: { type: DataTypes.INTEGER, allowNull: false },
        comment: { type: DataTypes.TEXT, allowNull: true },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: 'id',
            },
            allowNull: false,
        },
        productId: {
            type: DataTypes.UUID,
            references: {
                model: Product,
                key: 'id',
            },
            allowNull: false,
        },
    },
    { sequelize, modelName: 'reviews' }
);

Review.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Review.belongsTo(Product, { foreignKey: 'productId' });

export default Review;
