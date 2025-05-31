import express from 'express';
import {
    getCategoriesController,
    getCategoryByIdController,
    getCategoryBySlugController,
    createCategoryController,
    updateCategoryController,
    deleteCategoryController,
} from '../controllers/category.controller.js';

const router = express.Router();

router.route('/').get(getCategoriesController).post(createCategoryController);

router
    .route('/:id')
    .get(getCategoryByIdController)
    .put(updateCategoryController)
    .delete(deleteCategoryController);

router.route('/slug/:slug').get(getCategoryBySlugController);

export default router;
