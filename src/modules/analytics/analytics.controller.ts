import { Controller, Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { logger } from '../../utils/logger';
import { setSuccess, setServerError } from '../../utils/response.util';

@Controller('v1')
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }

    @Get('analytics/vehicle/:vehicleId/daily')
    async getVehicleStats(@Param('vehicleId') vehicleId: string) {
        try {
            logger.info(`analytics.controller.ts >> getVehicleStats() >> Request for ${vehicleId}`);
            const stats = await this.analyticsService.getVehicleDailyStats(vehicleId);
            return setSuccess({ message: 'Vehicle daily statistics retrieved', data: stats });
        } catch (error) {
            logger.error(`analytics.controller.ts >> getVehicleStats() >> Error`, { error: error.message });
            return setServerError({ message: 'Failed to retrieve vehicle stats', error: error.message });
        }
    }

    @Get('analytics/meter/:meterId/daily')
    async getMeterStats(@Param('meterId') meterId: string) {
        try {
            logger.info(`analytics.controller.ts >> getMeterStats() >> Request for ${meterId}`);
            const stats = await this.analyticsService.getMeterDailyStats(meterId);
            return setSuccess({ message: 'Meter daily statistics retrieved', data: stats });
        } catch (error) {
            logger.error(`analytics.controller.ts >> getMeterStats() >> Error`, { error: error.message });
            return setServerError({ message: 'Failed to retrieve meter stats', error: error.message });
        }
    }
}
