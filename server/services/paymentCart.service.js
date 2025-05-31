// Developer: Mohamed Tahiri
import PaymentCart from '../models/paymentCart.model.js';

/**
 * Récupérer toutes les cartes de paiement d'un utilisateur
 * @param {string} userId - ID de l'utilisateur
 * @returns {Promise<Array>} Liste des cartes de paiement
 * @author Mohamed Tahiri
 */
export const getACartsByUser = async (userId) => {
    try {
        return await PaymentCart.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']],
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des cartes :', error);
        throw error;
    }
};

/**
 * Récupérer une carte de paiement par son ID
 * @param {string} id - ID de la carte de paiement
 * @returns {Promise<Object|null>} Carte correspondante ou null si non trouvée
 * @author Mohamed Tahiri
 */
export const getCartById = async (id) => {
    return await PaymentCart.findByPk(id);
};

/**
 * Créer une nouvelle carte de paiement
 * @param {object} cartData - Données de la carte à créer
 * @returns {Promise<Object>} Carte de paiement créée
 * @author Mohamed Tahiri
 */
export const createCart = async (cartData) => {
    return await PaymentCart.create(cartData);
};

/**
 * Mettre à jour une carte de paiement existante
 * @param {string} id - ID de la carte à mettre à jour
 * @param {object} updateData - Données à mettre à jour
 * @returns {Promise<Object|null>} Carte mise à jour ou null si non trouvée
 * @author Mohamed Tahiri
 */
export const updateCart = async (id, updateData) => {
    const cart = await PaymentCart.findByPk(id);
    if (!cart) return null;
    await cart.update(updateData);
    return cart;
};

/**
 * Supprimer une carte de paiement
 * @param {string} id - ID de la carte à supprimer
 * @returns {Promise<boolean>} true si supprimée, sinon false
 * @author Mohamed Tahiri
 */
export const deleteCart = async (id) => {
    const cart = await PaymentCart.findByPk(id);
    if (!cart) return null;
    await cart.destroy();
    return true;
};
