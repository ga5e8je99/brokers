import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Broker } from '../../brokers/entities/broker.entity';

export enum VipRequestStatus {
  PENDING = 'PENDING',
  VERIFIED_UNDER_AGENCY = 'VERIFIED_UNDER_AGENCY',
  NOT_UNDER_AGENCY = 'NOT_UNDER_AGENCY',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Entity('vip_requests')
export class VipRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  brokerId: string;

  @ManyToOne(() => Broker, (broker) => broker.vipRequests, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'brokerId' })
  broker: Broker;

  @Column({ length: 64 })
  accountNumber: string;

  @Column({ length: 128, nullable: true })
  telegramUsername: string;

  @Column({
    type: 'varchar',
    length: 32,
    default: VipRequestStatus.PENDING,
  })
  status: VipRequestStatus;

  @Column({ type: 'simple-json', nullable: true })
  verificationResponse: Record<string, any>;

  @Column({ type: 'text', nullable: true })
  clientIp: string;

  @Column({ type: 'text', nullable: true })
  userAgent: string;

  @Column({ length: 128, nullable: true })
  reviewedBy: string;

  @Column({ type: 'text', nullable: true })
  reviewNote: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
