import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleTelemetryController } from './vehicle-telemetry.controller';
import { VehicleTelemetryService } from './vehicle-telemetry.service';
import { VehicleTelemetry } from './entities/vehicle-telemetry.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([VehicleTelemetry]),
    ],
    controllers: [VehicleTelemetryController],
    providers: [VehicleTelemetryService],
    exports: [VehicleTelemetryService]
})
export class VehicleTelemetryModule { }
