import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/prisma.service';
import { CustomRascalService } from './infrastructure/rascal.service';
import { CustomRascalClient } from './infrastructure/rascal.client';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { RascalClient } from '../rascal/rascal.client';
import { RascalService } from '../rascal/rascal.service';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [ConfigModule.forRoot({ load: [config] }), LoggerModule.forRoot()],
  controllers: [],
  providers: [
    PrismaService,
    { provide: RascalService, useClass: CustomRascalService },
    { provide: RascalClient, useClass: CustomRascalClient },
  ],
  exports: [PrismaService, RascalClient],
})
export class CommonsModule {}
