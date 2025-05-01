// routes/auth.routes.js

import express from 'express';
import {
    registerController,
    loginController,
    refreshTokenController,
    logoutController,
} from '../controllers/authController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validateMiddleware.js';
import {
    registerSchema,
    loginSchema,
    refreshSchema,
} from '../validators/authValidators.js';

const router = express.Router();

router.post('/register', validate(registerSchema), registerController);
router.post('/login', validate(loginSchema), loginController);
router.post('/refresh', validate(refreshSchema), refreshTokenController);
router.post('/logout', authenticate, logoutController);

// Protected route example
// router.get('/admin', authenticate, authorize(['admin']), (req, res) => {
//   res.status(200).json({ message: 'Welcome admin!' });
// });

export default router;
