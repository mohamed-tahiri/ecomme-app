import Category from '../models/category.model.js';
import Product from '../models/product.model.js';
import { Op } from 'sequelize';
import Store from '../models/store.model.js';
import User from '../models/user.model.js';

// Inclusion standardisée des relations
const defaultInclude = [
    {
        model: Store,
        as: 'store',
        attributes: ['slug', 'name', 'description'],
    },
    {
        model: User,
        as: 'vendor',
        attributes: ['name', 'email'],
    },
    {
        model: Category,
        attributes: ['name', 'descripiton'], // Correction ici
    },
];

// Helper pagination + filtre
const buildWhereClause = (filters = {}) => {
    const where = {};

    if (filters.name) {
        where.name = { [Op.iLike]: `%${filters.name}%` };
    }

    if (filters.price) {
        if (filters.price.min != null && filters.price.max != null) {
            where.price = {
                [Op.between]: [filters.price.min, filters.price.max],
            };
        } else if (filters.price.min != null) {
            where.price = { [Op.gte]: filters.price.min };
        } else if (filters.price.max != null) {
            where.price = { [Op.lte]: filters.price.max };
        }
    }

    return where;
};

const getProducts = async (page = 1, limit = 10, filters = {}) => {
    try {
        const where = buildWhereClause(filters);

        const { rows, count } = await Product.findAndCountAll({
            where,
            include: defaultInclude,
            limit,
            order: [['updatedAt', 'DESC']],
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
        const category = await Category.findOne({ where: { slug } });
        if (!category) throw new Error('Category not found');

        // Récupérer les sous-catégories directes
        const subcategories = await Category.findAll({
            where: { parentCategoryId: category.id },
            attributes: ['id'],
        });

        // Créer la liste des IDs de catégorie à inclure
        const categoryIds = [
            category.id,
            ...subcategories.map((sub) => sub.id),
        ];

        const where = {
            ...buildWhereClause(filters),
            categoryId: { [Op.in]: categoryIds },
        };

        // Récupérer les produits avec les critères de filtrage
        const { rows, count } = await Product.findAndCountAll({
            where,
            limit,
            include: defaultInclude,
            order: [['updatedAt', 'DESC']],
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

const getProductsBySlugStore = async (
    slug,
    page = 1,
    limit = 10,
    filters = {}
) => {
    try {
        const store = await Store.findOne({ where: { slug } });
        if (!store) throw new Error('Store not found');

        const where = {
            ...buildWhereClause(filters),
            storeId: store.id,
        };

        // Récupérer les produits avec les critères de filtrage
        const { rows, count } = await Product.findAndCountAll({
            where,
            limit,
            include: defaultInclude,
            order: [['updatedAt', 'DESC']],
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

const getProductsByVendor = async (
    vendorId,
    page = 1,
    limit = 10,
    filters = {}
) => {
    try {
        const where = {
            ...buildWhereClause(filters),
            vendorId,
        };

        // Récupérer les produits avec les critères de filtrage
        const { rows, count } = await Product.findAndCountAll({
            where,
            limit,
            include: defaultInclude,
            order: [['updatedAt', 'DESC']],
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
        return await Product.findByPk(id, { include: defaultInclude });
    } catch (error) {
        throw error;
    }
};

const getProductBySlug = async (slug) => {
    try {
        return await Product.findOne({
            where: { slug },
            include: defaultInclude,
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const createProduct = async (productData) => {
    try {
        const {
            name,
            description,
            price,
            stock,
            categoryId,
            vendorId,
            storeId,
        } = productData;

        const category = await Category.findByPk(categoryId);
        if (!category) throw new Error('Category not found');

        const vendor = await User.findByPk(vendorId);
        if (!vendor) throw new Error('Vendor not found');

        const store = await Store.findByPk(storeId);
        if (!store) throw new Error('Store not found');

        // Create product
        return await Product.create({
            name,
            description,
            price,
            stock,
            categoryId,
            storeId,
            vendorId,
        });
    } catch (error) {
        throw error;
    }
};

export {
    getProducts,
    getProductsBySlugCategory,
    getProductsBySlugStore,
    getProductsByVendor,
    getProductById,
    getProductBySlug,
    createProduct,
};
