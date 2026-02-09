import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleTelemetryController } from './vehicle-telemetry.controller';
import { VehicleTelemetryService } from './vehicle-telemetry.service';
import { VehicleTelemetry } from './entities/vehicle-telemetry.entity';
import { VehicleStatus } from './entities/vehicle-status.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([VehicleTelemetry, VehicleStatus]),
    ],
    controllers: [VehicleTelemetryController],
    providers: [VehicleTelemetryService],
    exports: [VehicleTelemetryService]
})
export class VehicleTelemetryModule { }
