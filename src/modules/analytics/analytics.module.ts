import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { VehicleTelemetry } from '../vehicle-telemetry/entities/vehicle-telemetry.entity';
import { MeterTelemetry } from '../meter-telemetry/entities/meter-telemetry.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([VehicleTelemetry, MeterTelemetry]),
    ],
    controllers: [AnalyticsController],
    providers: [AnalyticsService],
})
export class AnalyticsModule { }
