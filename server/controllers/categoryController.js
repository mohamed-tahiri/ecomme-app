import {
    getCategories,
    getCategoryById,
    getCategoryBySlug,
    createCategory,
    updateCategory,
    deleteCategory,
} from '../services/categoryService.js';

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of categories
 */
export const getCategoriesController = async (req, res) => {
    try {
        const categories = await getCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 */
export const getCategoryByIdController = async (req, res) => {
    try {
        const category = await getCategoryById(req.params.id);
        if (!category)
            return res.status(404).json({ message: 'Category not found' });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/v1/categories/{slug}:
 *   get:
 *     summary: Get category by SLUG
 *     tags: [Categories]
 */
export const getCategoryBySlugController = async (req, res) => {
    try {
        const category = await getCategoryBySlug(req.params.slug);
        if (!category)
            return res.status(404).json({ message: 'Category not found' });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/v1/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Name --"
 *               descripiton:
 *                 type: string
 *                 example: "Description --"
 *               parentCategoryId:
 *                 type: string
 *                 nullable: true
 *                 example: ""
 *     responses:
 *       201:
 *         description: Category created
 */
export const createCategoryController = async (req, res) => {
    try {
        let { name, descripiton, parentCategoryId } = req.body;
        if (!parentCategoryId) parentCategoryId = null;
        const category = await createCategory({
            name,
            descripiton,
            parentCategoryId,
        });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   put:
 *     summary: Update a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Category"
 *               descripiton:
 *                 type: string
 *                 example: "Updated Category"
 *               parentCategoryId:
 *                 type: string
 *                 nullable: true
 *                 example: ""
 *     responses:
 *       200:
 *         description: Category updated
 *       404:
 *         description: Category not found
 */
export const updateCategoryController = async (req, res) => {
    try {
        let { name, descripiton, parentCategoryId } = req.body;
        if (!parentCategoryId) parentCategoryId = null; // If empty, set to null
        const category = await updateCategory(req.params.id, {
            name,
            descripiton,
            parentCategoryId,
        });
        if (!category)
            return res.status(404).json({ message: 'Category not found' });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
export const deleteCategoryController = async (req, res) => {
    try {
        const deleted = await deleteCategory(req.params.id);
        if (!deleted)
            return res.status(404).json({ message: 'Category not found' });
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
