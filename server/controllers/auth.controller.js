import { register, login, logout, refresh } from '../services/auth.service.js';

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Operations related to products
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               name:
 *                 type: string
 *                 example: "user"
 *               password:
 *                 type: string
 *                 example: "supersecurepassword"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
export const registerController = async (req, res) => {
    try {
        const user = await register(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 */
export const loginController = async (req, res) => {
    try {
        const tokens = await login(req.body);
        res.status(200).json(tokens);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/v1/auth/refresh:
 *   post:
 *     summary: Refresh JWT token
 *     tags: [Auth]
 */
export const refreshTokenController = async (req, res) => {
    try {
        const accessToken = await refresh(req.body.refreshToken);
        res.status(200).json(accessToken);
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 */
export const logoutController = async (req, res) => {
    try {
        await logout(req.user.userId);
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
