import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import Product from './Product.js';

class ProductImage extends Model {}

ProductImage.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        productId: {
            type: DataTypes.UUID,
            references: {
                model: Product,
                key: 'id',
            },
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        altText: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isPrimary: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    { sequelize, modelName: 'product_images' }
);

// Relationship with Product
ProductImage.belongsTo(Product, { foreignKey: 'productId' });

export default ProductImage;
