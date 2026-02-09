import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';

/**
 * Vehicle Telemetry Entity
 * Stores real-time telemetry data from electric vehicles
 * Table: vehicle_telemetry
 */
@Entity('vehicle_telemetry')
@Index(['vehicleId', 'timestamp']) // Composite index for fast queries
@Index(['timestamp']) // Index for time-based queries
export class VehicleTelemetry {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'vehicle_id', type: 'varchar', length: 50 })
    @Index() // Index for vehicle-specific queries
    vehicleId: string;

    // Battery Information
    @Column({ type: 'decimal', precision: 5, scale: 2, comment: 'State of Charge (0-100%)' })
    soc: number;

    @Column({ type: 'decimal', precision: 6, scale: 2, nullable: true, comment: 'Voltage in Volts' })
    voltage: number;

    @Column({ type: 'decimal', precision: 6, scale: 2, nullable: true, comment: 'Current in Amperes' })
    current: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true, comment: 'Battery temperature in Celsius' })
    temperature: number;

    // Vehicle Status
    @Column({ type: 'integer', nullable: true, comment: 'Speed in km/h' })
    speed: number;

    @Column({ type: 'integer', nullable: true, comment: 'Total distance in km' })
    odometer: number;

    // Location Information
    @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true, comment: 'Latitude' })
    latitude: number;

    @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true, comment: 'Longitude' })
    longitude: number;

    // Timestamps
    @CreateDateColumn({ name: 'timestamp', type: 'timestamp', comment: 'Data collection timestamp' })
    timestamp: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', comment: 'Record creation timestamp' })
    createdAt: Date;
}
