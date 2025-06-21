import express from 'express';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import {
    createOrderController,
    getUserOrdersController,
    getOrderByIdController,
    getSimilarProductsController,
} from '../controllers/order.controller.js';

const router = express.Router();

router.route('/')
    .post(authenticate, authorize(['ROLE_CUSTOMER']), createOrderController);


router.route('/user/:id')
    .get(authenticate, authorize(['ROLE_CUSTOMER']), getUserOrdersController)

router.route('/:id')
    .get(authenticate, authorize(['ROLE_CUSTOMER']), getOrderByIdController);
// .post(authenticate, authorize(['ROLE_ADMIN']), createOrderController);

router.route('/:id/similar-products')
    .get(authenticate,authorize(['ROLE_CUSTOMER']),getSimilarProductsController);

export default router;
