import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config.js';
import slugify from 'slugify';

class Category extends Model {}

Category.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripiton: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        parentCategoryId: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'categories', // Référence la même table
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'Category',
        tableName: 'categories',
        hooks: {
            beforeSave: (category) => {
                if (category.name) {
                    // Générer un slug basé sur le nom
                    category.slug = slugify(category.name, {
                        lower: true,
                        strict: true,
                    });
                }
            },
        },
    }
);

Category.hasMany(Category, {
    foreignKey: 'parentCategoryId',
    as: 'subCategories',
});
Category.belongsTo(Category, {
    foreignKey: 'parentCategoryId',
    as: 'parentCategory',
});

export default Category;
