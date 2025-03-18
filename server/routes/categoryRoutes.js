// routes/categoryRoutes.js
import express from 'express';
import {
    createCategory,
    getCategories,
    getCategoryById
} from '../controllers/categoryController.js';

const router = express.Router();

router.post('/', createCategory); // Create category
router.get('/', getCategories); // Get all categories
router.get('/:id', getCategoryById); // Get category by ID

export default router;
