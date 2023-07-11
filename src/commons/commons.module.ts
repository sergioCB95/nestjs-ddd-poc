import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/prisma.service';
import { AmqpService } from './infrastructure/amqp.service';
import { EventBus } from './domain/event.bus';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService, AmqpService, EventBus],
  exports: [PrismaService, AmqpService, EventBus],
})
export class CommonsModule {}
