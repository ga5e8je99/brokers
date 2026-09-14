import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VipRequest } from './entities/vip-request.entity';
import { VipRequestsService } from './vip-requests.service';
import { VipRequestsController } from './vip-requests.controller';
import { BrokersModule } from '../brokers/brokers.module';
import { AgencyCheckerModule } from '../agency-checker/agency-checker.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VipRequest]),
    BrokersModule,
    AgencyCheckerModule,
  ],
  controllers: [VipRequestsController],
  providers: [VipRequestsService],
  exports: [VipRequestsService, TypeOrmModule],
})
export class VipRequestsModule {}
