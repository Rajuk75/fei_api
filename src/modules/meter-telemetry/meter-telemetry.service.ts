import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MeterTelemetry } from './entities/meter-telemetry.entity';
import { CreateMeterTelemetryDto } from './dto/create-meter-telemetry.dto';
import { logger } from '../../utils/logger';

@Injectable()
export class MeterTelemetryService {
    constructor(
        @InjectRepository(MeterTelemetry)
        private readonly meterTelemetryRepo: Repository<MeterTelemetry>,
    ) { }

    async createMeterTelemetry(dto: CreateMeterTelemetryDto): Promise<MeterTelemetry> {
        logger.info(`meter-telemetry.service.ts >> createMeterTelemetry() >> Creating telemetry record for meter: ${dto.meterId}`);
        const telemetry = this.meterTelemetryRepo.create(dto);
        const saved = await this.meterTelemetryRepo.save(telemetry);
        logger.info(`meter-telemetry.service.ts >> createMeterTelemetry() >> Telemetry created with ID: ${saved.id}`);
        return saved;
    }

    async getLatestByMeter(meterId: string): Promise<MeterTelemetry | null> {
        return await this.meterTelemetryRepo.findOne({
            where: { meterId },
            order: { timestamp: 'DESC' },
        });
    }

    async getHistoryByMeter(meterId: string, limit: number): Promise<MeterTelemetry[]> {
        return await this.meterTelemetryRepo.find({
            where: { meterId },
            order: { timestamp: 'DESC' },
            take: limit,
        });
    }
}
