// Developer: Mohamed Tahiri
import { Op, fn, col } from 'sequelize';
import Review from '../models/review.model.js';
import User from '../models/user.model.js';

/**
 * Obtenir les 10 derniers avis et les statistiques globales du site
 * @returns {Promise<Object>} Objet contenant les derniers avis et les stats
 */
export const getReviewStatsAndRecent = async () => {
    // Récupérer les 10 derniers avis
    const latestReviews = await Review.findAll({
        limit: 10,
        order: [['createdAt', 'DESC']],
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['name', 'email'],
            },
        ],
    });

    // Calculer les statistiques globales
    const totalReviews = await Review.count();
    const averageRating = await Review.findOne({
        attributes: [[fn('AVG', col('rating')), 'avgRating']],
        raw: true,
    });

    const usersWithReviews = await Review.aggregate('userId', 'count', {
        distinct: true,
    });

    return {
        latestReviews,
        stats: {
            totalReviews,
            averageRating: parseFloat(averageRating.avgRating || 0).toFixed(1),
            totalUsers: usersWithReviews,
        },
    };
};

/**
 * Obtenir tous les avis d’un produit
 * @param {string} productId - ID du produit
 * @returns {Promise<Array>} Liste des avis
 */
export const getReviewsByProduct = async (productId) => {
    return await Review.findAll({
        where: { productId },
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['name', 'email'],
            },
        ],
    });
};

/**
 * Obtenir un avis par ID
 * @param {string} id - ID de l’avis
 * @returns {Promise<Object|null>} Avis ou null
 */
export const getReviewById = async (id) => {
    return await Review.findByPk(id);
};

/**
 * Créer un nouvel avis
 * @param {object} reviewData - Données de l’avis
 * @returns {Promise<Object>} Avis créé
 */
export const createReview = async (reviewData) => {
    return await Review.create(reviewData);
};

/**
 * Mettre à jour un avis
 * @param {string} id - ID de l’avis
 * @param {object} updateData - Données à mettre à jour
 * @returns {Promise<Object|null>} Avis mis à jour ou null
 */
export const updateReview = async (id, updateData) => {
    const review = await Review.findByPk(id);
    if (!review) return null;
    await review.update(updateData);
    return review;
};

/**
 * Supprimer un avis
 * @param {string} id - ID de l’avis
 * @returns {Promise<boolean>} true si supprimé, sinon false
 */
export const deleteReview = async (id) => {
    const review = await Review.findByPk(id);
    if (!review) return null;
    await review.destroy();
    return true;
};
