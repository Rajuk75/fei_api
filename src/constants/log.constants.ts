// Log file configuration constants
export const LOG_CONSTANTS = {
    // Log filename pattern: logs/app-2024-01-15.log
    LOG_FILENAME: 'logs/app-%DATE%.log',

    // Date pattern for log rotation
    DATE_PATTERN: 'YYYY-MM-DD',

    // Maximum log files to keep (14 days)
    MAX_FILES: '14d',

    // Maximum size per log file (20MB)
    MAX_SIZE: '20m',
};
