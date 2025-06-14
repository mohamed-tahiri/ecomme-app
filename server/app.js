import dotenv from 'dotenv';
import path from 'path';

const envFile = `.env.${process.env.NODE_ENV || 'dev'}`;

dotenv.config({ path: envFile });

import cookieParser from 'cookie-parser';
import express from 'express';
import { swaggerUi, swaggerSpec } from './config/swagger.config.js';
import { fileURLToPath } from 'url';
import cors from 'cors';
import helmet from 'helmet';
import logger from './utils/logger.utils.js';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

// API Routes
import indexRouter from './routes/index.routes.js';
import reviewsRoutes from './routes/review.routes.js';
import authRoutes from './routes/auth.routes.js';
import paymentCartRoutes from './routes/paymentCart.route.js';
import orderRoutes from './routes/order.route.js';
import userRoutes from './routes/user.routes.js';
import storeRoutes from './routes/store.routes.js';
import productRoutes from './routes/product.routes.js';
import categoryRoutes from './routes/category.routes.js';
import addressesRoutes from './routes/address.routes.js';
import imagesProductRoutes from './routes/productImages.routes.js';

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
    { path: '/reviews', router: reviewsRoutes },
    { path: '/addresses', router: addressesRoutes },
    { path: '/payment-carts', router: paymentCartRoutes },
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
