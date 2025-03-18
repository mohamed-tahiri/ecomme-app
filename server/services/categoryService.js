import Category from '../models/Category.js';

/**
 * Get all categories with pagination and filtering
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @param {string} name - Filter by name
 */
export const getCategories = async () => { 
  const categories = await Category.findAll();

  return {
    categories
  };
};

/**
 * Get category by ID
 * @param {string} id - Category ID
 */
export const getCategoryById = async (id) => {
  return await Category.findByPk(id);
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
