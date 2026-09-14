import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VipRequest, VipRequestStatus } from './entities/vip-request.entity';
import { CreateVipRequestDto } from './dto/create-vip-request.dto';
import { UpdateVipStatusDto } from './dto/update-vip-status.dto';
import { Broker } from '../brokers/entities/broker.entity';
import { AgencyCheckerService } from '../agency-checker/services/agency-checker.service';

@Injectable()
export class VipRequestsService {
  constructor(
    @InjectRepository(VipRequest)
    private readonly vipRequestRepository: Repository<VipRequest>,
    @InjectRepository(Broker)
    private readonly brokerRepository: Repository<Broker>,
    private readonly agencyCheckerService: AgencyCheckerService,
  ) {}

  /**
   * Submit new VIP verification request:
   * Resolves broker -> Runs automated agency check -> Stores record -> Returns status
   */
  async create(
    dto: CreateVipRequestDto,
    clientIp?: string,
    userAgent?: string,
  ) {
    // 1. Resolve Broker
    const broker = await this.brokerRepository.findOne({
      where: [{ id: dto.brokerIdOrSlug }, { slug: dto.brokerIdOrSlug }],
    });

    if (!broker) {
      throw new NotFoundException(
        `Broker '${dto.brokerIdOrSlug}' not found`,
      );
    }

    const cleanAccount = dto.accountNumber.trim();

    // 2. Perform Automated Agency Verification Check
    const checkResult = await this.agencyCheckerService.checkAccountUnderAgency(
      broker,
      cleanAccount,
    );

    // 3. Create Record
    const vipRequest = this.vipRequestRepository.create({
      brokerId: broker.id,
      accountNumber: cleanAccount,
      telegramUsername: dto.telegramUsername?.trim(),
      status: checkResult.status,
      verificationResponse: checkResult,
      clientIp,
      userAgent,
      reviewNote: dto.reviewNote,
    });

    const saved = await this.vipRequestRepository.save(vipRequest);

    return {
      request: saved,
      verification: checkResult,
      message: checkResult.message,
    };
  }

  async findByAccount(accountNumber: string) {
    const clean = accountNumber.trim();
    const requests = await this.vipRequestRepository.find({
      where: { accountNumber: clean },
      order: { createdAt: 'DESC' },
    });

    if (!requests.length) {
      throw new NotFoundException(
        `No VIP verification requests found for account '${clean}'`,
      );
    }

    return requests;
  }

  async findAll(status?: VipRequestStatus) {
    const where = status ? { status } : {};
    return this.vipRequestRepository.find({
      where,
      order: { createdAt: 'DESC' },
      relations: ['broker'],
    });
  }

  async findById(id: string) {
    const request = await this.vipRequestRepository.findOne({
      where: { id },
      relations: ['broker'],
    });
    if (!request) {
      throw new NotFoundException(`VIP request with ID '${id}' not found`);
    }
    return request;
  }

  /**
   * Re-runs the automated agency check against the broker partner API
   */
  async recheck(id: string) {
    const request = await this.findById(id);
    const checkResult = await this.agencyCheckerService.checkAccountUnderAgency(
      request.broker,
      request.accountNumber,
    );

    request.status = checkResult.status;
    request.verificationResponse = checkResult;

    const saved = await this.vipRequestRepository.save(request);

    return {
      request: saved,
      verification: checkResult,
      message: checkResult.message,
    };
  }

  async updateStatus(id: string, dto: UpdateVipStatusDto) {
    const request = await this.findById(id);

    request.status = dto.status;
    if (dto.reviewedBy) request.reviewedBy = dto.reviewedBy;
    if (dto.reviewNote) request.reviewNote = dto.reviewNote;

    return this.vipRequestRepository.save(request);
  }
}
