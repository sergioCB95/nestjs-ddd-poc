import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/prisma.service';
import { RascalService } from './infrastructure/rascal.service';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { RascalClient } from '../rascal/rascal.client';
import { BaseRascalService } from '../rascal/base.rascal.service';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [ConfigModule.forRoot({ load: [config] }), LoggerModule.forRoot()],
  controllers: [],
  providers: [
    PrismaService,
    { provide: BaseRascalService, useClass: RascalService },
    RascalClient,
  ],
  exports: [PrismaService, RascalClient],
})
export class CommonsModule {}
