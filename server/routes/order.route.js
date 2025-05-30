import express from 'express';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import {
    createOrderController,
    getUserOrdersController,
} from '../controllers/order.controller.js';

const router = express.Router();

router
    .route('/')
    .get(authenticate, authorize(['ROLE_CUSTOMER']), getUserOrdersController)
    .post(authenticate, authorize(['ROLE_CUSTOMER']), createOrderController);

export default router;
