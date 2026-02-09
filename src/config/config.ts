import * as dotenv from 'dotenv';

// Load .env file
dotenv.config();

export const config = {
    // Application
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: parseInt(process.env.PORT || '3000', 10),

    // Database
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: parseInt(process.env.DB_PORT || '5432', 10),
    DB_USERNAME: process.env.DB_USERNAME || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || 'postgres',
    DB_NAME: process.env.DB_NAME || 'fleet_energy_db',
    DB_SSL: process.env.DB_SSL === 'true',

    // Logging
    LOG_LEVEL: process.env.LOG_LEVEL || 'debug',

    // Helper methods
    isDevelopment: () => config.NODE_ENV === 'development',
    isProduction: () => config.NODE_ENV === 'production',
};
