import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import Category from './Category.js';

class Product extends Model {}

Product.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    price: { type: DataTypes.FLOAT, allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    categoryId: { 
      type: DataTypes.UUID, 
      references: {
        model: Category,
        key: 'id'
      },
      allowNull: false 
    },
  },
  { sequelize, modelName: 'products' }
);


Product.belongsTo(Category, { foreignKey: 'categoryId' });

export default Product;
