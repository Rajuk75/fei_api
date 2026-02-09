import { Entity, Column, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('vehicle_status')
export class VehicleStatus {
    @PrimaryColumn({ name: 'vehicle_id' })
    vehicleId: string;

    @Column('float')
    soc: number;

    @Column('float', { nullable: true, name: 'kwh_delivered_dc' })
    kwhDeliveredDc: number;

    @Column('float', { nullable: true, name: 'battery_temp' })
    batteryTemp: number;

    @Column('float', { nullable: true })
    voltage: number;

    @Column('float', { nullable: true })
    current: number;

    @Column({ nullable: true })
    location: string;

    @UpdateDateColumn({ name: 'last_updated' })
    lastUpdated: Date;
}
