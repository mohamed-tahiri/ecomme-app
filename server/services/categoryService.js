import Category from '../models/Category.js';

/**
 * Get all categories
 */
export const getCategories = async () => {
    try {
        const categories = await Category.findAll({
            include: [
                {
                    model: Category,
                    as: 'subCategories',
                },
            ],
            order: [
                ['createdAt', 'ASC'], // Tri par 'createdAt' en ordre décroissant
            ],
        });

        const parentCategories = categories.filter(
            (category) => category.parentCategoryId === null
        );

        parentCategories.forEach((parentCategory) => {
            parentCategory.subCategories = categories.filter(
                (category) => category.parentCategoryId === parentCategory.id
            );
        });

        return parentCategories;
    } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
        throw error;
    }
};

/**
 * Get category by ID
 * @param {string} id - Category ID
 */
export const getCategoryById = async (id) => {
    return await Category.findByPk(id, {
        include: [{ model: Category, as: 'parentCategory' }],
    });
};

/**
 * Get category by SLUG
 * @param {string} slug - Category SLUG
 */
export const getCategoryBySlug = async (slug) => {
    return await Category.findOne({
        where: { slug },
        include: [{ model: Category, as: 'parentCategory' }],
    });
};

/**
 * Create a new category
 * @param {object} categoryData - Category details
 */
export const createCategory = async (categoryData) => {
    return await Category.create(categoryData);
};

/**
 * Update a category
 * @param {string} id - Category ID
 * @param {object} updateData - Updated fields
 */
export const updateCategory = async (id, updateData) => {
    const category = await Category.findByPk(id);
    if (!category) return null;
    return await category.update(updateData);
};

/**
 * Delete a category
 * @param {string} id - Category ID
 */
export const deleteCategory = async (id) => {
    const category = await Category.findByPk(id);
    if (!category) return null;
    await category.destroy();
    return true;
};
