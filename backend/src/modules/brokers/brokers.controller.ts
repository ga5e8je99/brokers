import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { BrokersService } from './brokers.service';

@ApiTags('Brokers (Public)')
@Controller('brokers')
export class BrokersController {
  constructor(private readonly brokersService: BrokersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active certified brokers with optional category and language filtering' })
  @ApiQuery({ name: 'category', required: false, description: 'forex | prop | all' })
  @ApiQuery({ name: 'lang', required: false, description: 'ar | en', example: 'ar' })
  @ApiResponse({ status: 200, description: 'List of brokers' })
  findAll(
    @Query('category') category?: string,
    @Query('lang') lang?: string,
  ) {
    return this.brokersService.findAll(category, lang || 'ar');
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get single broker details by slug' })
  @ApiQuery({ name: 'lang', required: false, description: 'ar | en', example: 'ar' })
  @ApiResponse({ status: 200, description: 'Broker details' })
  findBySlug(
    @Param('slug') slug: string,
    @Query('lang') lang?: string,
  ) {
    return this.brokersService.findBySlug(slug, lang || 'ar');
  }
}
