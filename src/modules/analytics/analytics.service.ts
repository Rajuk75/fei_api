import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleTelemetry } from '../vehicle-telemetry/entities/vehicle-telemetry.entity';
import { MeterTelemetry } from '../meter-telemetry/entities/meter-telemetry.entity';
import { logger } from '../../utils/logger';

@Injectable()
export class AnalyticsService {
    constructor(
        @InjectRepository(VehicleTelemetry)
        private readonly vehicleRepo: Repository<VehicleTelemetry>,
        @InjectRepository(MeterTelemetry)
        private readonly meterRepo: Repository<MeterTelemetry>,
    ) { }

    async getVehicleDailyStats(vehicleId: string): Promise<any> {
        logger.info(`analytics.service.ts >> getVehicleDailyStats() >> calculating stats for ${vehicleId}`);

        const stats = await this.vehicleRepo.createQueryBuilder('vehicle')
            .select('DATE(vehicle.timestamp)', 'date')
            .addSelect('AVG(vehicle.soc)', 'avgSoc')
            .addSelect('MAX(vehicle.speed)', 'maxSpeed')
            .addSelect('MIN(vehicle.soc)', 'minSoc')
            .addSelect('COUNT(*)', 'dataPoints')
            .where('vehicle.vehicleId = :vehicleId', { vehicleId })
            .groupBy('DATE(vehicle.timestamp)')
            .orderBy('date', 'DESC')
            .limit(7) // Last 7 days
            .getRawMany();

        return stats;
    }

    async getMeterDailyStats(meterId: string): Promise<any> {
        logger.info(`analytics.service.ts >> getMeterDailyStats() >> calculating stats for ${meterId}`);

        const stats = await this.meterRepo.createQueryBuilder('meter')
            .select('DATE(meter.timestamp)', 'date')
            .addSelect('SUM(meter.energyConsumed)', 'totalEnergy')
            .addSelect('AVG(meter.power)', 'avgPower')
            .addSelect('MAX(meter.current)', 'maxCurrent')
            .addSelect('COUNT(*)', 'dataPoints')
            .where('meter.meterId = :meterId', { meterId })
            .groupBy('DATE(meter.timestamp)')
            .orderBy('date', 'DESC')
            .limit(7) // Last 7 days
            .getRawMany();

        return stats;
    }
}
