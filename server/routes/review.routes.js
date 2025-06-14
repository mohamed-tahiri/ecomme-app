import express from 'express';
import {
    getReviewsByProductController,
    getReviewByIdController,
    createReviewController,
    updateReviewController,
    deleteReviewController,
    getReviewStatsAndRecentController,
} from '../controllers/review.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

// GET tous les avis d’un produit
router.route('/product/:productId').get(getReviewsByProductController);

// GET / PUT / DELETE un avis par ID
router
    .route('/:id')
    .get(getReviewByIdController)
    .put(authenticate, updateReviewController)
    .delete(authenticate, deleteReviewController);

// POST un nouvel avis (authentifié)
router
    .route('/')
    .get(getReviewStatsAndRecentController)
    .post(authenticate, createReviewController);

export default router;
