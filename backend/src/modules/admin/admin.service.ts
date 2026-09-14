import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Broker } from '../brokers/entities/broker.entity';
import { VipRequest, VipRequestStatus } from '../vip-requests/entities/vip-request.entity';
import { BrokersService } from '../brokers/brokers.service';
import { VipRequestsService } from '../vip-requests/vip-requests.service';
import { AgencyCheckerService } from '../agency-checker/services/agency-checker.service';
import { CreateBrokerDto } from '../brokers/dto/create-broker.dto';
import { UpdateBrokerDto } from '../brokers/dto/update-broker.dto';
import { UpdateVipStatusDto } from '../vip-requests/dto/update-vip-status.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Broker)
    private readonly brokerRepository: Repository<Broker>,
    @InjectRepository(VipRequest)
    private readonly vipRequestRepository: Repository<VipRequest>,
    private readonly brokersService: BrokersService,
    private readonly vipRequestsService: VipRequestsService,
    private readonly agencyCheckerService: AgencyCheckerService,
  ) {}

  // Broker Management
  async getAllBrokers(): Promise<Broker[]> {
    return this.brokersService.findAllAdmin();
  }

  async getBrokerById(id: string): Promise<Broker> {
    return this.brokersService.findById(id);
  }

  async createBroker(dto: CreateBrokerDto): Promise<Broker> {
    return this.brokersService.create(dto);
  }

  async updateBroker(id: string, dto: UpdateBrokerDto): Promise<Broker> {
    return this.brokersService.update(id, dto);
  }

  async deleteBroker(id: string) {
    return this.brokersService.remove(id);
  }

  /**
   * Test connection to a broker's partner API using test account number
   */
  async testBrokerPartnerApi(brokerId: string, testAccountNumber: string = '123456') {
    const broker = await this.brokersService.findById(brokerId);
    return this.agencyCheckerService.checkAccountUnderAgency(broker, testAccountNumber);
  }

  // VIP Requests Management
  async getAllVipRequests(status?: VipRequestStatus) {
    return this.vipRequestsService.findAll(status);
  }

  async getVipRequestById(id: string) {
    return this.vipRequestsService.findById(id);
  }

  async recheckVipRequest(id: string) {
    return this.vipRequestsService.recheck(id);
  }

  async updateVipRequestStatus(id: string, dto: UpdateVipStatusDto) {
    return this.vipRequestsService.updateStatus(id, dto);
  }

  // Admin Dashboard Statistics
  async getDashboardStats() {
    const totalBrokers = await this.brokerRepository.count();
    const activeBrokers = await this.brokerRepository.count({ where: { isActive: true } });
    const totalVipRequests = await this.vipRequestRepository.count();
    const pendingVipRequests = await this.vipRequestRepository.count({
      where: { status: VipRequestStatus.PENDING },
    });
    const verifiedVipRequests = await this.vipRequestRepository.count({
      where: { status: VipRequestStatus.VERIFIED_UNDER_AGENCY },
    });
    const approvedVipRequests = await this.vipRequestRepository.count({
      where: { status: VipRequestStatus.APPROVED },
    });

    return {
      brokers: {
        total: totalBrokers,
        active: activeBrokers,
      },
      vipRequests: {
        total: totalVipRequests,
        pending: pendingVipRequests,
        verifiedUnderAgency: verifiedVipRequests,
        approved: approvedVipRequests,
      },
    };
  }
}
