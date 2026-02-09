import { IsString, IsNotEmpty, IsNumber, IsDateString, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMeterTelemetryDto {
    @IsString()
    @IsNotEmpty({ message: 'Meter ID is required' })
    meterId: string;

    @IsNumber()
    @Min(0, { message: 'Energy consumed cannot be negative' })
    energyConsumed: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    voltage?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    current?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    power?: number;

    @IsOptional()
    @IsString()
    status?: string;

    @IsDateString()
    @IsNotEmpty({ message: 'Timestamp is required' })
    timestamp: string;
}
