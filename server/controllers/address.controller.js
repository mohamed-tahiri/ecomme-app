// Developer: Mohamed Tahiri
import {
    getAdressesByUser,
    getAdresseById,
    createAdresse,
    updateAdresse,
    deleteAdresse,
} from '../services/address.service.js';

/**
 * @swagger
 * tags:
 *   - name: Addresses
 *     description: Operations related to user addresses
 */

/**
 * @swagger
 * /api/v1/addresses/user/{userId}:
 *   get:
 *     summary: Get all addresses by user
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of addresses
 */
export const getAdressesByUserController = async (req, res) => {
    try {
        const addresses = await getAdressesByUser(req.params.userId);
        res.json(addresses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/v1/addresses/{id}:
 *   get:
 *     summary: Get address by ID
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address found
 *       404:
 *         description: Address not found
 */
export const getAdresseByIdController = async (req, res) => {
    try {
        const address = await getAdresseById(req.params.id);
        if (!address)
            return res.status(404).json({ message: 'Address not found' });
        res.json(address);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/v1/addresses:
 *   post:
 *     summary: Create a new address
 *     tags: [Addresses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - street
 *               - city
 *               - country
 *               - zipCode
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "uuid-user-id"
 *               street:
 *                 type: string
 *                 example: "123 Main St"
 *               city:
 *                 type: string
 *                 example: "Paris"
 *               country:
 *                 type: string
 *                 example: "France"
 *               zipCode:
 *                 type: string
 *                 example: "75001"
 *     responses:
 *       201:
 *         description: Address created
 */
export const createAdresseController = async (req, res) => {
    try {
        const address = await createAdresse(req.body);
        res.status(201).json(address);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/v1/addresses/{id}:
 *   put:
 *     summary: Update an address
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               street:
 *                 type: string
 *                 example: "456 New Street"
 *               city:
 *                 type: string
 *                 example: "Lyon"
 *               country:
 *                 type: string
 *                 example: "France"
 *               zipCode:
 *                 type: string
 *                 example: "69000"
 *     responses:
 *       200:
 *         description: Address updated
 *       404:
 *         description: Address not found
 */
export const updateAdresseController = async (req, res) => {
    try {
        const updatedAddress = await updateAdresse(req.params.id, req.body);
        if (!updatedAddress)
            return res.status(404).json({ message: 'Address not found' });
        res.json(updatedAddress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/v1/addresses/{id}:
 *   delete:
 *     summary: Delete an address
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address deleted successfully
 *       404:
 *         description: Address not found
 */
export const deleteAdresseController = async (req, res) => {
    try {
        const deleted = await deleteAdresse(req.params.id);
        if (!deleted)
            return res.status(404).json({ message: 'Address not found' });
        res.json({ message: 'Address deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
