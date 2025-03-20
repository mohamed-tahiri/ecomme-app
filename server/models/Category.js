import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class Category extends Model {}

Category.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize, modelName: 'categories' }
);

export default Category;
