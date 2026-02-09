import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleTelemetry } from './entities/vehicle-telemetry.entity';
import { CreateVehicleTelemetryDto } from './dto/create-vehicle-telemetry.dto';
import { logger } from '../../utils/logger';

@Injectable()
export class VehicleTelemetryService {
    constructor(
        @InjectRepository(VehicleTelemetry)
        private readonly vehicleTelemetryRepo: Repository<VehicleTelemetry>,
    ) { }

    async createVehicleTelemetry(dto: CreateVehicleTelemetryDto): Promise<VehicleTelemetry> {
        logger.info(`vehicle-telemetry.service.ts >> createVehicleTelemetry() >> Creating telemetry record for vehicle: ${dto.vehicleId}`);
        const telemetry = this.vehicleTelemetryRepo.create(dto);
        const saved = await this.vehicleTelemetryRepo.save(telemetry);
        logger.info(`vehicle-telemetry.service.ts >> createVehicleTelemetry() >> Telemetry created with ID: ${saved.id}`);
        return saved;
    }

    async getLatestByVehicle(vehicleId: string): Promise<VehicleTelemetry | null> {
        return await this.vehicleTelemetryRepo.findOne({
            where: { vehicleId },
            order: { timestamp: 'DESC' },
        });
    }

    async getHistoryByVehicle(vehicleId: string, limit: number): Promise<VehicleTelemetry[]> {
        return await this.vehicleTelemetryRepo.find({
            where: { vehicleId },
            order: { timestamp: 'DESC' },
            take: limit,
        });
    }
}
