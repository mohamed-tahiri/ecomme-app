// services/auth.service.js
import bcrypt from 'bcrypt';
import  { 
    generateAccessToken, 
    generateRefreshToken, 
    verifyRefreshToken
} from '../utils/jwt.js';
import User from '../models/User.js';
import { sendMail } from './mailService.js';

export const register = async ({ email, name, password }) => {  
    const exists = await User.findOne({ 
        where: { 
            email
        } 
    });
    
    if (exists) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ 
        name,
        email, 
        password: hashedPassword 
    });

    // Optionally send verification email
    await sendMail({
        to: email,
        subject: 'Welcome',
        text: 'Thanks for registering!',
    });

    return { id: user._id, email: user.email };
};

export const login = async ({ email, password }) => {
    const user = await User.findOne({ 
        where: {
            email
        } 
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
        user: { id: user.id, email: user.email, role: user.role, name: user.name },
    };
};
  
export const refresh = async (token) => {
    const payload = verifyRefreshToken(token);
    const user = await User.findById(payload.userId);
    if (!user || user.refreshToken !== token) {
        throw new Error('Invalid refresh token');
    }

    const newAccessToken = generateAccessToken(user);
    return { accessToken: newAccessToken };
};
  
export const logout = async (userId) => {
    try {
        // Find and update the user by ID
        const [updatedRows] = await User.update(
            { refreshToken: null }, // The data you want to update
            { where: { id: userId } } // The condition to find the user
        );

        if (updatedRows === 0) {
            throw new Error('User not found or no changes made');
        }

        console.log('User logged out successfully');
    } catch (error) {
        throw new Error(`Error during logout: ${error.message}`);
    }
};