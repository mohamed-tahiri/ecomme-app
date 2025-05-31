// Developer: Mohamed Tahiri
import Address from '../models/address.model.js';

/**
 * Récupérer toutes les adresses d'un utilisateur
 * @param {string} userId - ID de l'utilisateur
 * @returns {Promise<Array>} Liste des adresses
 * @author Mohamed Tahiri
 */
export const getAdressesByUser = async (userId) => {
    try {
        return await Address.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']],
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des adresses :', error);
        throw error;
    }
};

/**
 * Récupérer une adresse par son ID
 * @param {string} id - ID de l'adresse
 * @returns {Promise<Object|null>} Adresse correspondante ou null si non trouvée
 * @author Mohamed Tahiri
 */
export const getAdresseById = async (id) => {
    return await Address.findByPk(id);
};

/**
 * Créer une nouvelle adresse
 * @param {object} adresseData - Données de l'adresse à créer
 * @returns {Promise<Object>} Adresse créée
 * @author Mohamed Tahiri
 */
export const createAdresse = async (adresseData) => {
    return await Address.create(adresseData);
};

/**
 * Mettre à jour une adresse existante
 * @param {string} id - ID de l'adresse à mettre à jour
 * @param {object} updateData - Données à mettre à jour
 * @returns {Promise<Object|null>} Adresse mise à jour ou null si non trouvée
 * @author Mohamed Tahiri
 */
export const updateAdresse = async (id, updateData) => {
    const adresse = await Address.findByPk(id);
    if (!adresse) return null;
    await adresse.update(updateData);
    return adresse;
};

/**
 * Supprimer une adresse
 * @param {string} id - ID de l'adresse à supprimer
 * @returns {Promise<boolean>} true si supprimée, sinon false
 * @author Mohamed Tahiri
 */
export const deleteAdresse = async (id) => {
    const adresse = await Address.findByPk(id);
    if (!adresse) return null;
    await adresse.destroy();
    return true;
};
