import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config.js';
import Category from './category.model.js';
import slugify from 'slugify';
import Store from './store.model.js';
import User from './user.model.js';

class Product extends Model {}

Product.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        categoryId: {
            type: DataTypes.UUID,
            references: {
                model: Category,
                key: 'id',
            },
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        storeId: {
            type: DataTypes.UUID,
            references: {
                model: Store,
                key: 'id',
            },
            allowNull: true,
        },
        vendorId: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: 'id',
            },
            allowNull: true,
        },
    },
    { sequelize, modelName: 'products' }
);

// Hook to generate the slug before creating or updating the product
Product.beforeCreate((product) => {
    if (product.name && product.name.trim() !== '') {
        product.slug = slugify(product.name, { lower: true, strict: true });
    } else {
        throw new Error('Product name is required to generate slug');
    }
});

Product.beforeUpdate((product) => {
    if (product.name && product.name.trim() !== '') {
        product.slug = slugify(product.name, { lower: true, strict: true });
    } else {
        throw new Error('Product name is required to generate slug');
    }
});

Product.belongsTo(Category, { foreignKey: 'categoryId' });
Product.belongsTo(Store, { foreignKey: 'storeId', as: 'store' });
Product.belongsTo(User, { foreignKey: 'vendorId', as: 'vendor' });

export default Product;
