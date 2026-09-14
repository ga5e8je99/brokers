import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './config/database.config';
import { BrokersModule } from './modules/brokers/brokers.module';
import { VipRequestsModule } from './modules/vip-requests/vip-requests.module';
import { AgencyCheckerModule } from './modules/agency-checker/agency-checker.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => getDatabaseConfig(),
    }),
    BrokersModule,
    VipRequestsModule,
    AgencyCheckerModule,
    AdminModule,
  ],
})
export class AppModule {}
