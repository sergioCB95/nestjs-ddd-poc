import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/prisma.service';
import { AmqpService } from './infrastructure/amqp.service';
import { ConfigModule } from '@nestjs/config';
import config from './config';

@Module({
  imports: [ConfigModule.forRoot({ load: [config] })],
  controllers: [],
  providers: [PrismaService, AmqpService],
  exports: [PrismaService, AmqpService],
})
export class CommonsModule {}
