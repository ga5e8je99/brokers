import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVipRequestDto {
  @ApiProperty({
    example: 'xm',
    description: 'Broker ID (UUID) or Broker slug (e.g. xm, multibank)',
  })
  @IsString()
  @IsNotEmpty()
  brokerIdOrSlug: string;

  @ApiProperty({
    example: '8594021',
    description: 'Trading Account Number (MT4 / MT5 / ID)',
  })
  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @ApiPropertyOptional({
    example: '@trader_vip',
    description: 'Telegram username for communications',
  })
  @IsString()
  @IsOptional()
  telegramUsername?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  reviewNote?: string;
}
