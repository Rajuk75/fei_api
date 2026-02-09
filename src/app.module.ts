import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database.config';
import { logger } from './utils/logger';
import { DataSource } from 'typeorm';
import { VehicleTelemetryModule } from './modules/vehicle-telemetry/vehicle-telemetry.module';
import { MeterTelemetryModule } from './modules/meter-telemetry/meter-telemetry.module';

@Module({
  imports: [
    // Config module for environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // TypeORM for PostgreSQL
    TypeOrmModule.forRoot(databaseConfig()),

    // Feature modules
    VehicleTelemetryModule,
    MeterTelemetryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private dataSource: DataSource) { }

  async onModuleInit() {
    if (this.dataSource.isInitialized) {
      logger.info(`✅ Database connected successfully to ${this.dataSource.options.database}`, {
        host: this.dataSource.options['host'],
        port: this.dataSource.options['port'],
        database: this.dataSource.options.database,
      });
    } else {
      logger.error('❌ Database connection failed');
    }
  }
}
