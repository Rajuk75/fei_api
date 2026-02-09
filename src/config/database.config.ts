import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from './config';

/**
 * Database configuration for TypeORM
 * Centralizes all database connection settings
 */
export const databaseConfig = (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,

    // Entity files location
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],

    // Auto-sync schema in development only (DANGEROUS in production)
    synchronize: config.isDevelopment(),

    // Enable query logging in development
    logging: config.isDevelopment(),

    // SSL configuration
    ssl: config.DB_SSL ? { rejectUnauthorized: false } : false,

    // Connection pool settings
    extra: {
        max: 10, // Maximum connections in pool
        min: 2,  // Minimum connections in pool
    },
});
