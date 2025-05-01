import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || 'dev';
const logDir = process.env.LOG_DIR || 'logs';
const logPath = path.join(__dirname, '..', logDir);

// Ensure log directory exists
if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath);
}

const logFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.printf(({ timestamp, level, message, stack }) => {
        return `${timestamp} [${level}]: ${stack || message}`;
    })
);

const createDailyTransport = (label) =>
    new DailyRotateFile({
        filename: path.join(logPath, `${label}-%DATE%.log`),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '10m',
        maxFiles: '14d',
        level: 'info',
    });

const transportsList = [
    createDailyTransport('application'),
    createDailyTransport('http'),
    createDailyTransport('database'),
    new transports.File({
        filename: path.join(logPath, 'error.log'),
        level: 'error',
    }),
];

if (env === 'dev') {
    transportsList.push(
        new transports.Console({
            format: format.combine(format.colorize(), format.simple()),
        })
    );
}

export const baseLogger = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: logFormat,
    transports: transportsList,
});
