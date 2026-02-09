import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('vehicle_telemetry')
@Index(['vehicleId', 'timestamp']) // Optimize analytical queries
export class VehicleTelemetry {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'vehicle_id', nullable: true })
    vehicleId: string;

    @Column('float', { nullable: true })
    soc: number;

    @Column('float', { nullable: true, default: 0 })
    kwhDeliveredDc: number;

    @Column('float', { nullable: true })
    voltage: number;

    @Column('float', { nullable: true })
    temperature: number;

    @Column('float', { nullable: true })
    speed: number;

    @Column('float', { nullable: true })
    odometer: number;

    @Column('jsonb', { nullable: true })
    location: {
        latitude: number;
        longitude: number;
    };

    @Column({ type: 'timestamp' })
    timestamp: Date;
}
