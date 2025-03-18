import express from 'express';
import {
  getCategoriesController,
  getCategoryByIdController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from '../controllers/categoryController.js';

const router = express.Router();

router.route('/')
    .get(getCategoriesController)
    .post(createCategoryController);

router.route('/:id')
    .get(getCategoryByIdController)
    .put(updateCategoryController)
    .delete(deleteCategoryController);

export default router;
