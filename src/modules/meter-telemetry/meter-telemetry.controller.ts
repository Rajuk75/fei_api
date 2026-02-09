import { Controller, Post, Get, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { MeterTelemetryService } from './meter-telemetry.service';
import { CreateMeterTelemetryDto } from './dto/create-meter-telemetry.dto';
import { logger } from '../../utils/logger';
import { setSuccess, setCreateSuccess, setNotFound, setBadRequest, setServerError } from '../../utils/response.util';

@Controller('v1/telemetry/meter')
export class MeterTelemetryController {
    constructor(private readonly meterService: MeterTelemetryService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async ingestMeterTelemetry(@Body() dto: CreateMeterTelemetryDto) {
        try {
            logger.info(`meter-telemetry.controller.ts >> ingestMeterTelemetry() >> Received meter telemetry for ${dto.meterId}`);
            const telemetry = await this.meterService.createMeterTelemetry(dto);
            return setCreateSuccess({ message: 'Meter telemetry ingested successfully', data: telemetry });
        } catch (error) {
            logger.error(`meter-telemetry.controller.ts >> ingestMeterTelemetry() >> Error ingesting meter telemetry`, { error: error.message, meterId: dto.meterId });
            if (error.name === 'ValidationError') {
                return setBadRequest({ message: 'Validation failed', errors: error.errors });
            }
            return setServerError({ message: 'Failed to ingest meter telemetry', error: error.message });
        }
    }

    @Get(':meterId/latest')
    async getLatestMeterTelemetry(@Param('meterId') meterId: string) {
        try {
            logger.info(`meter-telemetry.controller.ts >> getLatestMeterTelemetry() >> Fetching latest telemetry for meter ${meterId}`);
            const telemetry = await this.meterService.getLatestByMeter(meterId);
            if (!telemetry) return setNotFound({ message: 'No telemetry data found for this meter' });
            return setSuccess({ message: 'Latest meter telemetry retrieved successfully', data: telemetry });
        } catch (error) {
            logger.error(`meter-telemetry.controller.ts >> getLatestMeterTelemetry() >> Error fetching latest meter telemetry`, { error: error.message, meterId });
            return setServerError({ message: 'Failed to retrieve latest meter telemetry', error: error.message });
        }
    }

    @Get(':meterId/history')
    async getMeterTelemetryHistory(@Param('meterId') meterId: string, @Query('limit') limit?: number) {
        try {
            const safeLimit = Math.min(Math.max(1, limit || 100), 1000);
            logger.info(`meter-telemetry.controller.ts >> getMeterTelemetryHistory() >> Fetching history for meter ${meterId}`, { limit: safeLimit });
            const history = await this.meterService.getHistoryByMeter(meterId, safeLimit);
            return setSuccess({
                message: 'Meter telemetry history retrieved successfully',
                data: { count: history.length, records: history }
            });
        } catch (error) {
            logger.error(`meter-telemetry.controller.ts >> getMeterTelemetryHistory() >> Error fetching meter history`, { error: error.message, meterId });
            return setServerError({ message: 'Failed to retrieve meter history', error: error.message });
        }
    }
}
