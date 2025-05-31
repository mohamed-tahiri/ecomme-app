import express from 'express';
import {
    getStoreByIdController,
    getStoreBySlugController,
    getStoresByOwnerController,
    createStoreController,
} from '../controllers/store.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/').post(authenticate, createStoreController);

router.route('/owner/:ownerId').get(getStoresByOwnerController);

router.route('/:id').get(getStoreByIdController);

router.route('/slug/:slug').get(getStoreBySlugController);

export default router;
