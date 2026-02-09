import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeterTelemetryController } from './meter-telemetry.controller';
import { MeterTelemetryService } from './meter-telemetry.service';
import { MeterTelemetry } from './entities/meter-telemetry.entity';
import { MeterStatus } from './entities/meter-status.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([MeterTelemetry, MeterStatus]),
    ],
    controllers: [MeterTelemetryController],
    providers: [MeterTelemetryService],
    exports: [MeterTelemetryService]
})
export class MeterTelemetryModule { }
