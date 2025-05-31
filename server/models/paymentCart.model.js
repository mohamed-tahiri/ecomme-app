import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config.js';
import User from './user.model.js';

class PaymentCart extends Model {}

PaymentCart.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        cardNumber: { type: DataTypes.STRING, allowNull: false },
        expiryDate: { type: DataTypes.STRING, allowNull: false },
        cvv: { type: DataTypes.STRING, allowNull: false },
        cardHolder: { type: DataTypes.STRING, allowNull: false },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: 'id',
            },
            allowNull: false,
        },
    },
    { sequelize, modelName: 'payments_cart' }
);

PaymentCart.belongsTo(User, { foreignKey: 'userId' });

export default PaymentCart;
