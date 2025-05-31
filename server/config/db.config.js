// models/index.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

const envFile = `.env.${process.env.NODE_ENV || 'dev'}`;

dotenv.config({ path: envFile });

// Set up sequelize instance
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    logging: false,
});

sequelize
    .sync({ alter: true })
    .then(() => {
        console.log('Database synced');
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });

export default sequelize;
