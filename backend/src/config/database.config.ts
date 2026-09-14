import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getDatabaseConfig = (): TypeOrmModuleOptions => {
  const dbType = process.env.DB_TYPE || 'postgres';

  if (dbType === 'sqlite') {
    return {
      type: 'sqlite',
      database: process.env.DB_NAME || 'brokers_dev.sqlite',
      entities: [__dirname + '/../modules/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: process.env.DB_LOGGING === 'true',
    };
  }

  return {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'fxengin_brokers',
    entities: [__dirname + '/../modules/**/*.entity{.ts,.js}'],
    synchronize: process.env.DB_SYNC === 'true',
    logging: process.env.DB_LOGGING === 'true',
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  };
};
