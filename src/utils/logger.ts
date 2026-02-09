import * as winston from 'winston';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config/config';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { LOG_CONSTANTS } from '../constants/log.constants';

// Custom format with traceID
const logFormat = winston.format.printf(({ timestamp, level, message, traceID, meta }) => {
    return `${timestamp}|${level}|traceID: ${traceID}|${message}${meta ? '| ' + JSON.stringify(meta) : ''}`;
});

// Function to generate traceID for each log entry
const generateTraceID = () => {
    return uuidv4();
};

// Daily rotating file transport
const fileRotateTransport = new DailyRotateFile({
    filename: LOG_CONSTANTS.LOG_FILENAME,
    datePattern: LOG_CONSTANTS.DATE_PATTERN,
    maxFiles: LOG_CONSTANTS.MAX_FILES,
    maxSize: LOG_CONSTANTS.MAX_SIZE,
});

// Create Winston logger instance
export const logger = winston.createLogger({
    level: config.LOG_LEVEL,
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({
            format: 'MM-DD-YY HH:mm:ss',
        }),
        winston.format((info) => {
            // Generate a new traceID for each log entry
            info.traceID = generateTraceID();
            return info;
        })(),
        logFormat,
    ),
    transports: [
        fileRotateTransport,
        new winston.transports.Console(),
    ],
});

// Helper functions
export const logInfo = (message: string, meta?: any) => {
    logger.info(message, { meta });
};

export const logError = (message: string, meta?: any) => {
    logger.error(message, { meta });
};

export const logWarn = (message: string, meta?: any) => {
    logger.warn(message, { meta });
};

export const logDebug = (message: string, meta?: any) => {
    logger.debug(message, { meta });
};

