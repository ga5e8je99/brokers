import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { BrokersModule } from '../brokers/brokers.module';
import { VipRequestsModule } from '../vip-requests/vip-requests.module';
import { AgencyCheckerModule } from '../agency-checker/agency-checker.module';

@Module({
  imports: [BrokersModule, VipRequestsModule, AgencyCheckerModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
