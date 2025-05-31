import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config.js';
import User from './user.model.js';
import slugify from 'slugify';

class Store extends Model {}

Store.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT },
        slug: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        ownerId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
    },
    { sequelize, modelName: 'stores' }
);

Store.beforeCreate((store) => {
    if (store.name && store.name.trim() !== '') {
        store.slug = slugify(store.name, { lower: true, strict: true });
    } else {
        throw new Error('store name is required to generate slug');
    }
});

Store.beforeUpdate((store) => {
    if (store.name && store.name.trim() !== '') {
        store.slug = slugify(store.name, { lower: true, strict: true });
    } else {
        throw new Error('store name is required to generate slug');
    }
});

Store.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

export default Store;
