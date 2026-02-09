import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { config } from './config/config';

@Injectable()
export class AppService {
  private startTime: Date;

  constructor(private dataSource: DataSource) {
    this.startTime = new Date();
  }

  getHello(): string {
    return 'Fleet Energy Ingestion API - Running';
  }

  async getHealthCheck() {
    const uptime = Math.floor((Date.now() - this.startTime.getTime()) / 1000);

    // Check database connection
    let dbStatus = 'disconnected';
    let dbMessage = 'Database connection failed';

    try {
      if (this.dataSource.isInitialized) {
        await this.dataSource.query('SELECT 1');
        dbStatus = 'connected';
        dbMessage = 'Database connection successful';
      }
    } catch (error) {
      dbStatus = 'error';
      dbMessage = error.message;
    }

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: `${uptime}s`,
      environment: config.NODE_ENV,
      database: {
        status: dbStatus,
        message: dbMessage,
        type: 'PostgreSQL',
        database: config.DB_NAME,
      },
      version: '1.0.0',
    };
  }
}
