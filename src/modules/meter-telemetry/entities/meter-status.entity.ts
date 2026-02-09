import { Entity, Column, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('meter_status')
export class MeterStatus {
    @PrimaryColumn()
    meterId: string;

    @Column('float')
    kwhConsumedAc: number;

    @Column('float', { nullable: true })
    voltage: number;

    @Column('float', { nullable: true })
    current: number;

    @Column('float', { nullable: true })
    power: number;

    @Column({ nullable: true })
    status: string;

    @UpdateDateColumn()
    lastUpdated: Date;
}
