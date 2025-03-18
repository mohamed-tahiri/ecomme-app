import Product from '../models/Product.js';
import { Op } from 'sequelize';

const getProducts = async (page = 1, limit = 10, filters = {}) => {
  try {
    const where = {};

    if (filters.name) {
      where.name = {
        [Op.iLike]: `%${filters.name}%`, 
      };
    }

    if (filters.price) {
      where.price = {
        [Op.between]: filters.price,
      };
    }

    const { rows, count } = await Product.findAndCountAll({
      where,
      limit,
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

const getProductById = async (id) => {
    try {
        const product = await Product.findByPk(id);
        return product;
    } catch (error) {
        throw error;
    }
};

export { getProducts, getProductById };
