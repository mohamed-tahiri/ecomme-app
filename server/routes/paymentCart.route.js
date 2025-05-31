// routes/paymentCart.routes.js
import express from 'express';
import {
    getCartByIdController,
    getCartsByUserController,
    createCartController,
    deleteCartController,
    updateCartController,
} from '../controllers/paymentCart.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/user/:userId').get(authenticate, getCartsByUserController);

router
    .route('/:id')
    .get(authenticate, getCartByIdController)
    .put(authenticate, updateCartController)
    .delete(authenticate, deleteCartController);

router.route('/').post(authenticate, createCartController);

export default router;
