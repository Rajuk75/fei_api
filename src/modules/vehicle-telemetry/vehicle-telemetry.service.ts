import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleTelemetry } from './entities/vehicle-telemetry.entity';
import { VehicleStatus } from './entities/vehicle-status.entity';
import { CreateVehicleTelemetryDto } from './dto/create-vehicle-telemetry.dto';
import { logger } from '../../utils/logger';

@Injectable()
export class VehicleTelemetryService {
    constructor(
        @InjectRepository(VehicleTelemetry)
        private readonly vehicleTelemetryRepo: Repository<VehicleTelemetry>,
        @InjectRepository(VehicleStatus)
        private readonly vehicleStatusRepo: Repository<VehicleStatus>,
    ) { }

    async createVehicleTelemetry(dto: CreateVehicleTelemetryDto): Promise<VehicleTelemetry> {
        logger.info(`vehicle-telemetry.service.ts >> createVehicleTelemetry() >> Ingesting for: ${dto.vehicleId}`);

        const telemetry = this.vehicleTelemetryRepo.create(dto);
        const saved = await this.vehicleTelemetryRepo.save(telemetry);

        await this.vehicleStatusRepo.save({
            vehicleId: dto.vehicleId,
            soc: dto.soc,
            kwhDeliveredDc: dto.kwhDeliveredDc || 0,
            batteryTemp: dto.temperature,
            voltage: dto.voltage,
            current: dto.current,
            location: JSON.stringify(dto.location),
            lastUpdated: new Date()
        });

        logger.info(`vehicle-telemetry.service.ts >> createVehicleTelemetry() >> Cold & Hot store updated for: ${saved.id}`);
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
