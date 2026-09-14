import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VipRequestStatus } from '../entities/vip-request.entity';

export class UpdateVipStatusDto {
  @ApiProperty({
    enum: VipRequestStatus,
    example: VipRequestStatus.APPROVED,
    description: 'New status for the VIP verification request',
  })
  @IsEnum(VipRequestStatus)
  status: VipRequestStatus;

  @ApiPropertyOptional({
    example: 'Admin Gamal',
    description: 'Identifier of the reviewer',
  })
  @IsString()
  @IsOptional()
  reviewedBy?: string;

  @ApiPropertyOptional({
    example: 'Verified manually via XM Partner Dashboard',
    description: 'Internal admin review notes',
  })
  @IsString()
  @IsOptional()
  reviewNote?: string;
}
