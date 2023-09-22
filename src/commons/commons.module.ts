import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/prisma.service';
import { RascalService } from './infrastructure/rascal.service';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { RascalClient } from './infrastructure/rascal.client';
import { BaseRascalService } from './infrastructure/base.rascal.service';

@Module({
  imports: [ConfigModule.forRoot({ load: [config] })],
  controllers: [],
  providers: [
    PrismaService,
    { provide: BaseRascalService, useClass: RascalService },
    RascalClient,
  ],
  exports: [PrismaService, RascalClient],
})
export class CommonsModule {}
