import dotenv from 'dotenv';
import path from 'path';

const envFile = `.env.${process.env.NODE_ENV || 'dev'}`;

dotenv.config({ path: envFile });

import cookieParser from 'cookie-parser';
import logger from 'morgan';
import express from 'express';
import { swaggerUi, swaggerSpec } from './config/swagger.js';
import { fileURLToPath } from 'url';
import cors from 'cors';

// API Routes
import indexRouter from './routes/index.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import imagesProductRoutes from './routes/productImagesRoutes.js';

const app = express();

// Configuration de CORS
app.use(
    cors({
        origin: ['http://localhost:5173'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

// Middleware setup
app.use(logger('dev'));
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
    { path: '/users', router: userRoutes },
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
