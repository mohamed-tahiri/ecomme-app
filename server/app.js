import dotenv from 'dotenv';
import path from 'path';

const envFile = `.env.${process.env.NODE_ENV || 'dev'}`;

dotenv.config({ path: envFile });

import cookieParser from 'cookie-parser';
import express from 'express';
import { swaggerUi, swaggerSpec } from './config/swagger.js';
import { fileURLToPath } from 'url';
import cors from 'cors';
import helmet from 'helmet';
import logger from './utils/logger.js';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

// API Routes
import indexRouter from './routes/index.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoute.js';
import userRoutes from './routes/userRoutes.js';
import storeRoutes from './routes/storeRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import imagesProductRoutes from './routes/productImagesRoutes.js';
import router from './routes/index.js';

const app = express();

// // limit each IP to 100 requests per 15 mins
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 1000,
    })
);

// Helmet
app.use(helmet());

// Configuration de CORS
app.use(
    cors({
        origin: ['http://localhost:5173', 'http://localhost:3000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

// Logger
app.use(morgan('combined', { stream: logger.stream }));

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl}`);
    next();
});

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// Register routes dynamically
const apiVersion = '/api/v1';
const routes = [
    { path: '/', router: indexRouter },
    { path: '/auth', router: authRoutes },
    { path: '/order', router: orderRoutes },
    { path: '/users', router: userRoutes },
    { path: '/stores', router: storeRoutes },
    { path: '/products', router: productRoutes },
    { path: '/categories', router: categoryRoutes },
    { path: '/images', router: imagesProductRoutes },
];

routes.forEach(({ path, router }) => {
    app.use(`${apiVersion}${path}`, router);
});

// Serve Swagger Docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
