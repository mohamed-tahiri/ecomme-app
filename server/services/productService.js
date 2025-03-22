import Category from '../models/Category.js';
import Product from '../models/Product.js';
import { Op } from 'sequelize';

const getProducts = async (page = 1, limit = 10, filters = {}) => {
    try {
        const where = {};

        if (filters.name) {
            where.name = {
                [Op.iLike]: `%${filters.name}%`,
            };
        }

        if (filters.price) {
            where.price = {
                [Op.between]: filters.price,
            };
        }

        const { rows, count } = await Product.findAndCountAll({
            where,
            limit,
            offset: (page - 1) * limit,
        });

        return {
            data: rows,
            pagination: {
                page,
                limit,
                totalCount: count,
                totalPages: Math.ceil(count / limit),
            },
        };
    } catch (error) {
        throw error;
    }
};

const getProductsBySlugCategory = async (
    slug,
    page = 1,
    limit = 10,
    filters = {}
) => {
    try {
        const where = {};

        // Récupérer la catégorie par son slug
        const category = await Category.findOne({
            where: {
                slug,
            },
        });

        // Si la catégorie n'existe pas
        if (!category) {
            throw new Error('Category not found');
        }

        where.categoryId = category.id; // Ajouter l'ID de la catégorie dans la condition de recherche

        // Filtrage par nom
        if (filters.name) {
            where.name = {
                [Op.iLike]: `%${filters.name}%`,
            };
        }

        // Filtrage par prix
        if (filters.price) {
            where.price = {
                [Op.between]: filters.price,
            };
        }

        // Récupérer les produits avec les critères de filtrage
        const { rows, count } = await Product.findAndCountAll({
            where,
            limit,
            offset: (page - 1) * limit,
        });

        return {
            data: rows,
            pagination: {
                page,
                limit,
                totalCount: count,
                totalPages: Math.ceil(count / limit),
            },
        };
    } catch (error) {
        throw error;
    }
};

const getProductById = async (id) => {
    try {
        const product = await Product.findByPk(id);
        return product;
    } catch (error) {
        throw error;
    }
};

const getProductBySlug = async (slug) => {
    try {
        const product = await Product.findOne({ where: { slug } });
        return product;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const createProduct = async (productData) => {
    try {
        const { name, description, price, stock, categoryId } = productData;

        // Check if category exists
        const category = await Category.findByPk(categoryId);
        if (!category) {
            throw new Error('Category not found');
        }

        // Create product
        const product = await Product.create({
            name,
            description,
            price,
            stock,
            categoryId,
        });

        return product;
    } catch (error) {
        throw error;
    }
};

export {
    getProducts,
    getProductsBySlugCategory,
    getProductById,
    getProductBySlug,
    createProduct,
};
