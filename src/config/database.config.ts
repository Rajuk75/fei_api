import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from './config';

export const databaseConfig = (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,

    entities: [__dirname + '/../**/*.entity{.ts,.js}'],

    synchronize: config.isDevelopment(),

    logging: config.isDevelopment(),

    ssl: config.DB_SSL ? { rejectUnauthorized: false } : false,
    extra: {
        max: 10,
        min: 2,
    },
});
