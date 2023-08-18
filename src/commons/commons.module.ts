import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/prisma.service';
import { AmqpService } from './infrastructure/amqp.service';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { RascalClient } from './infrastructure/rascal.client';

@Module({
  imports: [ConfigModule.forRoot({ load: [config] })],
  controllers: [],
  providers: [PrismaService, AmqpService, RascalClient],
  exports: [PrismaService, AmqpService, RascalClient],
})
export class CommonsModule {}
