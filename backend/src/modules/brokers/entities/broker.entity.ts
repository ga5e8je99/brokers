import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { VipRequest } from '../../vip-requests/entities/vip-request.entity';

export interface BrokerSpec {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface BrokerOffer {
  title: string;
  text: string;
  code?: string;
}

export interface BrokerDetails {
  intro: string;
  features: string[];
  paymentMethods: string[];
  leverageInfo: string;
}

@Entity('brokers')
export class Broker {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 64 })
  slug: string;

  @Column({ length: 128 })
  name: string;

  @Column({ type: 'text', nullable: true })
  badgeAr: string;

  @Column({ type: 'text', nullable: true })
  badgeEn: string;

  @Column({ length: 32, default: 'forex' })
  category: string;

  @Column({ length: 64, nullable: true })
  categoryNameAr: string;

  @Column({ length: 64, nullable: true })
  categoryNameEn: string;

  @Column({ type: 'text' })
  logo: string;

  @Column({ length: 32, default: '#000000' })
  logoBg: string;

  @Column({ length: 32, default: '#FB8704' })
  accentColor: string;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 4.9 })
  rating: number;

  @Column({ length: 64, nullable: true })
  tradersCountAr: string;

  @Column({ length: 64, nullable: true })
  tradersCountEn: string;

  @Column({ type: 'text', nullable: true })
  descriptionAr: string;

  @Column({ type: 'text', nullable: true })
  descriptionEn: string;

  @Column({ type: 'simple-json', nullable: true })
  specs: BrokerSpec[];

  @Column({ type: 'simple-json', nullable: true })
  offer: BrokerOffer;

  @Column({ type: 'simple-json', nullable: true })
  details: BrokerDetails;

  @Column({ type: 'text', nullable: true })
  affiliateRealLink: string;

  @Column({ type: 'text', nullable: true })
  affiliateDemoLink: string;

  // Partner & IB Agency Integration Fields (Admin Only)
  @Column({ type: 'text', nullable: true })
  partnerDashboardUrl: string;

  @Column({ type: 'text', nullable: true })
  partnerApiUrl: string;

  @Column({ type: 'text', nullable: true })
  partnerApiKey: string;

  @Column({ length: 64, nullable: true })
  partnerIbCode: string;

  @Column({ length: 32, default: 'API_AUTO' })
  verificationMethod: string; // 'API_AUTO' | 'WEBHOOK' | 'MANUAL'

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  sortOrder: number;

  @OneToMany(() => VipRequest, (req) => req.broker)
  vipRequests: VipRequest[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
