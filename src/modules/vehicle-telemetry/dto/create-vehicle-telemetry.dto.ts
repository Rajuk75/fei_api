import { IsNotEmpty, IsNumber, IsString, IsOptional, Min, Max, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Location DTO for nested validation
 */
class LocationDto {
    @IsNumber()
    @Min(-90)
    @Max(90)
    latitude: number;

    @IsNumber()
    @Min(-180)
    @Max(180)
    longitude: number;
}

/**
 * DTO for creating vehicle telemetry
 * Validates incoming request data
 */
export class CreateVehicleTelemetryDto {
    @IsNotEmpty()
    @IsString()
    vehicleId: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(100)
    soc: number; // State of Charge (0-100%)

    @IsOptional()
    @IsNumber()
    @Min(0)
    kwhDeliveredDc?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    voltage?: number;

    @IsOptional()
    @IsNumber()
    current?: number;

    @IsOptional()
    @IsNumber()
    @Min(-50)
    @Max(100)
    temperature?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    speed?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    odometer?: number;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => LocationDto)
    location?: LocationDto;
}
