import Store from '../models/Store.js';
import User from '../models/User.js';

const getStoresByOwner = async (ownerId, page = 1, limit = 10) => {
    try {
        const owner = await User.findByPk(ownerId);
        if (!owner) throw new Error('Owner not found');

        const where = {
            ownerId,
        };

        const { rows, count } = await Store.findAndCountAll({
            where,
            limit,
            order: [['updatedAt', 'DESC']],
            offset: (page - 1) * limit,
        });

        return {
            data: rows,
            pagination: {
                page,
                limit,
                totalCount: count,
                totalPages: Math.ceil(count / limit),
            },
        };
    } catch (error) {
        throw error;
    }
};

const getStoreById = async (id) => {
    try {
        return await Store.findByPk(id);
    } catch (error) {
        throw error;
    }
};

const getStoreBySlug = async (slug) => {
    try {
        return await Store.findOne({ where: { slug } });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const createStore = async (storeData) => {
    try {
        const { name, description, ownerId } = storeData;

        // Check if owner exists
        const owner = await User.findByPk(ownerId);
        if (!owner) throw new Error('owner not found');

        return await Store.create({
            name,
            description,
            ownerId,
        });
    } catch (error) {
        throw error;
    }
};

export { getStoresByOwner, getStoreById, getStoreBySlug, createStore };
