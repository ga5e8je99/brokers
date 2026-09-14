import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateBrokerDto } from '../brokers/dto/create-broker.dto';
import { UpdateBrokerDto } from '../brokers/dto/update-broker.dto';
import { UpdateVipStatusDto } from '../vip-requests/dto/update-vip-status.dto';
import { VipRequestStatus } from '../vip-requests/entities/vip-request.entity';

@ApiTags('Admin Panel')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get overview dashboard metrics' })
  getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  // --- BROKER MANAGEMENT ---

  @Get('brokers')
  @ApiOperation({
    summary: 'Get all brokers with partner API details, IB codes, and dashboard links',
  })
  getAllBrokers() {
    return this.adminService.getAllBrokers();
  }

  @Get('brokers/:id')
  @ApiOperation({ summary: 'Get broker by ID for editing' })
  getBrokerById(@Param('id') id: string) {
    return this.adminService.getBrokerById(id);
  }

  @Post('brokers')
  @ApiOperation({
    summary:
      'Add new broker with partner dashboard URL, partner API URL, and agency IB code',
  })
  createBroker(@Body() createBrokerDto: CreateBrokerDto) {
    return this.adminService.createBroker(createBrokerDto);
  }

  @Put('brokers/:id')
  @ApiOperation({ summary: 'Update existing broker and API integration' })
  updateBroker(
    @Param('id') id: string,
    @Body() updateBrokerDto: UpdateBrokerDto,
  ) {
    return this.adminService.updateBroker(id, updateBrokerDto);
  }

  @Delete('brokers/:id')
  @ApiOperation({ summary: 'Delete broker' })
  deleteBroker(@Param('id') id: string) {
    return this.adminService.deleteBroker(id);
  }

  @Post('brokers/:id/test-partner-api')
  @ApiOperation({
    summary: 'Test partner API connection and agency check for this broker',
  })
  @ApiQuery({ name: 'testAccount', required: false, example: '123456' })
  testBrokerPartnerApi(
    @Param('id') id: string,
    @Query('testAccount') testAccount?: string,
  ) {
    return this.adminService.testBrokerPartnerApi(id, testAccount || '123456');
  }

  // --- VIP REQUESTS MANAGEMENT ---

  @Get('vip-requests')
  @ApiOperation({ summary: 'List all VIP verification requests with optional status filtering' })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: VipRequestStatus,
    description: 'Filter by PENDING | VERIFIED_UNDER_AGENCY | NOT_UNDER_AGENCY | APPROVED | REJECTED',
  })
  getAllVipRequests(@Query('status') status?: VipRequestStatus) {
    return this.adminService.getAllVipRequests(status);
  }

  @Get('vip-requests/:id')
  @ApiOperation({ summary: 'Get single VIP request details and verification logs' })
  getVipRequestById(@Param('id') id: string) {
    return this.adminService.getVipRequestById(id);
  }

  @Post('vip-requests/:id/recheck')
  @ApiOperation({ summary: 'Trigger automatic agency verification re-check against broker API' })
  recheckVipRequest(@Param('id') id: string) {
    return this.adminService.recheckVipRequest(id);
  }

  @Patch('vip-requests/:id/status')
  @ApiOperation({ summary: 'Approve, reject, or update status of VIP request manually' })
  updateVipRequestStatus(
    @Param('id') id: string,
    @Body() updateDto: UpdateVipStatusDto,
  ) {
    return this.adminService.updateVipRequestStatus(id, updateDto);
  }
}
