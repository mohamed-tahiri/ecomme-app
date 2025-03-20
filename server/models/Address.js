import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

const Address = sequelize.define(
    'Address',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        street: { type: DataTypes.STRING, allowNull: false },
        city: { type: DataTypes.STRING, allowNull: false },
        country: { type: DataTypes.STRING, allowNull: false },
        zipCode: { type: DataTypes.STRING, allowNull: false },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: 'id',
            },
            allowNull: false,
        },
    },
    { timestamps: true }
);

Address.belongsTo(User, { foreignKey: 'userId' });

export default Address;
