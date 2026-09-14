import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AgencyCheckerService } from './services/agency-checker.service';

@Module({
  imports: [HttpModule],
  providers: [AgencyCheckerService],
  exports: [AgencyCheckerService],
})
export class AgencyCheckerModule {}
