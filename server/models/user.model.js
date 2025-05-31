import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config.js';

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        role: {
            type: DataTypes.ENUM('ROLE_CUSTOMER', 'ROLE_ADMIN', 'ROLE_VENDOR'),
            defaultValue: 'ROLE_CUSTOMER',
        },
        isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
        refreshToken: { type: DataTypes.STRING },
    },
    { sequelize, modelName: 'users' }
);

export default User;
