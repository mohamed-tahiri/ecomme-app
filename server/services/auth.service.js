// services/auth.service.js
import bcrypt from 'bcrypt';
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
} from '../utils/jwt.utils.js';
import User from '../models/user.model.js';
import { sendMail } from './mail.service.js';
import dotenv from 'dotenv';
import { Op } from 'sequelize';

const envFile = `.env.${process.env.NODE_ENV || 'dev'}`;

dotenv.config({ path: envFile });

export const register = async ({ email, name, password }) => {
    const exists = await User.findOne({
        where: {
            email,
        },
    });

    if (exists) throw new Error('User already exists');

    const activationToken = crypto.randomBytes(32).toString('hex');
    const activationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        activationToken,
        activationTokenExpires,
    });

    const activationLink = `${process.env.ACTIVATION_LINK}/${activationToken}`;

    // Optionally send verification email
    await sendMail({
        to: email,
        subject: 'Activation de votre compte',
        html: `<p>Bonjour ${name}, cliquez sur le lien suivant pour activer votre compte : <a href="${activationLink}">Activer</a></p>`,
    });

    return { id: user._id, email: user.email };
};

export const login = async ({ email, password }) => {
    const user = await User.findOne({
        where: {
            email,
        },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid email or password');
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    return {
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.name,
        },
    };
};

export const refresh = async (token) => {
    const payload = verifyRefreshToken(token);
    const user = await User.findByPk(payload.userId);
    if (!user || user.refreshToken !== token) {
        throw new Error('Invalid refresh token');
    }

    const newAccessToken = generateAccessToken(user);
    return { accessToken: newAccessToken };
};

export const activateUser = async (req, res) => {
    const { token } = req.params;

    const user = await User.findOne({
        where: {
            activationToken: token,
            activationTokenExpires: { [Op.gt]: new Date() },
        },
    });

    if (!user) throw new Error('Token invalide ou expiré');

    user.isActivited = true;
    user.activationToken = null;
    user.activationTokenExpires = null;

    await user.save();

    return user;
};

export const logout = async (userId) => {
    try {
        const [updatedRows] = await User.update(
            { refreshToken: null },
            { where: { id: userId } }
        );

        if (updatedRows === 0) {
            throw new Error('User not found or no changes made');
        }

        console.log('User logged out successfully');
    } catch (error) {
        throw new Error(`Error during logout: ${error.message}`);
    }
};
