import express from 'express';
import {
    getAdressesByUserController,
    getAdresseByIdController,
    createAdresseController,
    updateAdresseController,
    deleteAdresseController,
} from '../controllers/address.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/user/:userId').get(authenticate, getAdressesByUserController);

router
    .route('/:id')
    .get(authenticate, getAdresseByIdController)
    .put(authenticate, updateAdresseController)
    .delete(authenticate, deleteAdresseController);

router.route('/').post(createAdresseController);

export default router;
