import { Controller, Post, Get, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { VehicleTelemetryService } from './vehicle-telemetry.service';
import { CreateVehicleTelemetryDto } from './dto/create-vehicle-telemetry.dto';
import { logger } from '../../utils/logger';
import { setSuccess, setCreateSuccess, setNotFound, setBadRequest, setServerError } from '../../utils/response.util';

@Controller('v1')
export class VehicleTelemetryController {
    constructor(private readonly vehicleService: VehicleTelemetryService) { }

    @Post('telemetry/vehicle')
    @HttpCode(HttpStatus.CREATED)
    async ingestVehicleTelemetry(@Body() dto: CreateVehicleTelemetryDto) {
        try {
            logger.info(`vehicle-telemetry.controller.ts >> ingestVehicleTelemetry() >> Received vehicle telemetry for ${dto.vehicleId}`, { vehicleId: dto.vehicleId, soc: dto.soc });
            const telemetry = await this.vehicleService.createVehicleTelemetry(dto);
            return setCreateSuccess({
                message: 'Telemetry data ingested successfully',
                data: telemetry
            });
        } catch (error) {
            logger.error(`vehicle-telemetry.controller.ts >> ingestVehicleTelemetry() >> Error ingesting telemetry`, { error: error.message, vehicleId: dto.vehicleId });
            if (error.name === 'ValidationError') {
                return setBadRequest({ message: 'Validation failed', errors: error.errors });
            }
            return setServerError({ message: 'Failed to ingest telemetry data', error: error.message });
        }
    }

    @Get('telemetry/vehicle/:vehicleId/latest')
    async getLatestTelemetry(@Param('vehicleId') vehicleId: string) {
        try {
            logger.info(`vehicle-telemetry.controller.ts >> getLatestTelemetry() >> Fetching latest telemetry for ${vehicleId}`);
            const telemetry = await this.vehicleService.getLatestByVehicle(vehicleId);
            if (!telemetry) return setNotFound({ message: 'No telemetry data found for this vehicle' });
            return setSuccess({
                message: 'Latest telemetry retrieved successfully',
                data: telemetry
            });
        } catch (error) {
            logger.error(`vehicle-telemetry.controller.ts >> getLatestTelemetry() >> Error fetching latest telemetry`, { error: error.message, vehicleId });
            return setServerError({ message: 'Failed to retrieve latest telemetry', error: error.message });
        }
    }

    @Get('telemetry/vehicle/:vehicleId/history')
    async getTelemetryHistory(@Param('vehicleId') vehicleId: string, @Query('limit') limit?: number) {
        try {
            const safeLimit = Math.min(Math.max(1, limit || 100), 1000);
            logger.info(`vehicle-telemetry.controller.ts >> getTelemetryHistory() >> Fetching telemetry history for ${vehicleId}`, { limit: safeLimit });
            const history = await this.vehicleService.getHistoryByVehicle(vehicleId, safeLimit);
            return setSuccess({
                message: 'Telemetry history retrieved successfully',
                data: {
                    count: history.length,
                    records: history
                }
            });
        } catch (error) {
            logger.error(`vehicle-telemetry.controller.ts >> getTelemetryHistory() >> Error fetching telemetry history`, { error: error.message, vehicleId });
            return setServerError({ message: 'Failed to retrieve telemetry history', error: error.message });
        }
    }
}
