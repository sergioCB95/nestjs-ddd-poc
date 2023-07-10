import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/prisma.service';
import { AmqpService } from './infrastructure/amqp.service';
import { EventObserver } from './domain/event.observer';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService, AmqpService, EventObserver],
  exports: [PrismaService, AmqpService, EventObserver],
})
export class CommonsModule {}
