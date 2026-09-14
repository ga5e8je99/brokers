import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsArray,
  IsObject,
  IsUrl,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBrokerDto {
  @ApiProperty({ example: 'xm', description: 'Unique slug identifier' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ example: 'XM Global', description: 'Broker name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'تراخيص ورقابة عالمية • حماية من الرصيد السالب' })
  @IsString()
  @IsOptional()
  badgeAr?: string;

  @ApiPropertyOptional({ example: 'Global Tier-1 Regulation • Negative Balance Protection' })
  @IsString()
  @IsOptional()
  badgeEn?: string;

  @ApiProperty({ example: 'forex', default: 'forex' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiPropertyOptional({ example: 'وسطاء الفوركس والسلع' })
  @IsString()
  @IsOptional()
  categoryNameAr?: string;

  @ApiPropertyOptional({ example: 'Forex & Commodities' })
  @IsString()
  @IsOptional()
  categoryNameEn?: string;

  @ApiProperty({ description: 'Logo URL or base64' })
  @IsString()
  @IsNotEmpty()
  logo: string;

  @ApiPropertyOptional({ example: '#000000', default: '#000000' })
  @IsString()
  @IsOptional()
  logoBg?: string;

  @ApiPropertyOptional({ example: '#FF1A2A', default: '#FB8704' })
  @IsString()
  @IsOptional()
  accentColor?: string;

  @ApiPropertyOptional({ example: 4.95, default: 4.9 })
  @IsNumber()
  @IsOptional()
  rating?: number;

  @ApiPropertyOptional({ example: '10M+ المتداولين' })
  @IsString()
  @IsOptional()
  tradersCountAr?: string;

  @ApiPropertyOptional({ example: '10M+ Global Traders' })
  @IsString()
  @IsOptional()
  tradersCountEn?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  descriptionAr?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  descriptionEn?: string;

  @ApiPropertyOptional({ description: 'Specs array' })
  @IsArray()
  @IsOptional()
  specs?: any[];

  @ApiPropertyOptional({ description: 'Offer object with coupon code' })
  @IsObject()
  @IsOptional()
  offer?: Record<string, any>;

  @ApiPropertyOptional({ description: 'Details with intro, features, paymentMethods, leverage' })
  @IsObject()
  @IsOptional()
  details?: Record<string, any>;

  @ApiPropertyOptional({ example: 'https://clicks.pipaffiliates.com/c?c=655286&l=ar&p=0' })
  @IsString()
  @IsOptional()
  affiliateRealLink?: string;

  @ApiPropertyOptional({ example: 'https://clicks.pipaffiliates.com/c?c=655286&l=ar&p=0' })
  @IsString()
  @IsOptional()
  affiliateDemoLink?: string;

  // Partner / Admin Integration Fields
  @ApiPropertyOptional({
    example: 'https://partners.xm.com/dashboard',
    description: 'Direct URL to the broker partner / affiliate dashboard for manual review',
  })
  @IsString()
  @IsOptional()
  partnerDashboardUrl?: string;

  @ApiPropertyOptional({
    example: 'https://api.pipaffiliates.com/v1/accounts/check',
    description: 'Partner API URL to programmatically verify client registration',
  })
  @IsString()
  @IsOptional()
  partnerApiUrl?: string;

  @ApiPropertyOptional({
    example: 'sec_partner_token_xyz123',
    description: 'API key or Bearer token for partner API',
  })
  @IsString()
  @IsOptional()
  partnerApiKey?: string;

  @ApiPropertyOptional({
    example: 'KTW63',
    description: 'Agency IB code with this broker',
  })
  @IsString()
  @IsOptional()
  partnerIbCode?: string;

  @ApiPropertyOptional({
    example: 'API_AUTO',
    enum: ['API_AUTO', 'WEBHOOK', 'MANUAL'],
    default: 'API_AUTO',
  })
  @IsString()
  @IsOptional()
  verificationMethod?: string;

  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({ default: 0 })
  @IsNumber()
  @IsOptional()
  sortOrder?: number;
}
