import { Controller, Post, Get, Body, Param, Req, Ip } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { VipRequestsService } from './vip-requests.service';
import { CreateVipRequestDto } from './dto/create-vip-request.dto';

@ApiTags('VIP Verification (Public)')
@Controller('vip')
export class VipRequestsController {
  constructor(private readonly vipRequestsService: VipRequestsService) {}

  @Post('verify-request')
  @ApiOperation({
    summary: 'Submit trading account for VIP activation (runs automated Agency Check)',
  })
  @ApiResponse({
    status: 201,
    description: 'Request received and automated check performed',
  })
  create(
    @Body() createVipRequestDto: CreateVipRequestDto,
    @Ip() ip: string,
    @Req() req: Request,
  ) {
    const userAgent = req.headers['user-agent'];
    return this.vipRequestsService.create(createVipRequestDto, ip, userAgent);
  }

  @Get('status/:accountNumber')
  @ApiOperation({ summary: 'Check VIP verification status for a trading account' })
  @ApiResponse({ status: 200, description: 'VIP request status' })
  findByAccount(@Param('accountNumber') accountNumber: string) {
    return this.vipRequestsService.findByAccount(accountNumber);
  }
}
