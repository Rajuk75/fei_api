import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('meter_telemetry')
@Index(['meterId', 'timestamp']) // Optimize for time-series queries per meter
export class MeterTelemetry {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Index()
    meterId: string;

    @Column({ type: 'float' })
    energyConsumed: number; // kWh

    @Column({ type: 'float', nullable: true })
    voltage: number; // Volts

    @Column({ type: 'float', nullable: true })
    current: number; // Amps

    @Column({ type: 'float', nullable: true })
    power: number; // kW

    @Column({ nullable: true })
    status: string; // e.g., 'charging', 'idle', 'offline'

    @Column({ type: 'timestamp' })
    timestamp: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
