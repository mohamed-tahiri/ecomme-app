import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import Chat from './Chat.js';
import User from './User.js';

class Message extends Model {}

Message.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        text: { type: DataTypes.TEXT, allowNull: false },
        chatId: {
            type: DataTypes.UUID,
            references: {
                model: Chat,
                key: 'id',
            },
            allowNull: false,
        },
        senderId: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: 'id',
            },
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'messages',
    }
);

Message.belongsTo(Chat, { foreignKey: 'chatId', onDelete: 'CASCADE' });
Message.belongsTo(User, { foreignKey: 'senderId', onDelete: 'CASCADE' });

export default Message;
