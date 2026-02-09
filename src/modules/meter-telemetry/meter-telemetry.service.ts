import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MeterTelemetry } from './entities/meter-telemetry.entity';
import { MeterStatus } from './entities/meter-status.entity';
import { CreateMeterTelemetryDto } from './dto/create-meter-telemetry.dto';
import { logger } from '../../utils/logger';

@Injectable()
export class MeterTelemetryService {
    constructor(
        @InjectRepository(MeterTelemetry)
        private readonly meterTelemetryRepo: Repository<MeterTelemetry>,
        @InjectRepository(MeterStatus)
        private readonly meterStatusRepo: Repository<MeterStatus>,
    ) { }

    async createMeterTelemetry(dto: CreateMeterTelemetryDto): Promise<MeterTelemetry> {
        logger.info(`meter-telemetry.service.ts >> createMeterTelemetry() >> Ingesting for: ${dto.meterId}`);

        const telemetry = this.meterTelemetryRepo.create(dto);
        const saved = await this.meterTelemetryRepo.save(telemetry);

        await this.meterStatusRepo.save({
            meterId: dto.meterId,
            kwhConsumedAc: dto.energyConsumed,
            voltage: dto.voltage,
            current: dto.current,
            power: dto.power,
            status: dto.status,
            lastUpdated: new Date()
        });

        logger.info(`meter-telemetry.service.ts >> createMeterTelemetry() >> Cold & Hot store updated for: ${saved.id}`);
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
