import { baseLogger } from '../config/logger.config.js';
import notify from './notifier.js';

const log = (channel) => (msg) => {
    baseLogger.info(msg, { label: channel });
};

const error = (msg, error) => {
    const fullMsg = `${msg} - ${error?.message || ''}`;
    baseLogger.error(fullMsg);
    notify(fullMsg); // Notify on critical error
};

export default {
    info: log('app'),
    http: log('http'),
    db: log('database'),
    error,
};
