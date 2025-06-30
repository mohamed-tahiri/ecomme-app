import express from 'express';
import { getUserById, getUsers } from '../controllers/user.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: users
 *     description: Operations related to users
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     tags:
 *       - users
 *     summary: Get all users
 *     description: Retrieves a list of all users in the system.
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                   updated_at:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.get('/', getUsers); // Get all users

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     tags:
 *       - users
 *     summary: Get a user by ID
 *     description: Retrieves a single user based on their ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                 updated_at:
 *                   type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getUserById); // Get user by ID

export default router;
