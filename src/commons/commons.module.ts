import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/prisma.service';
import { AmqpService } from './infrastructure/amqp.service';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { AmqpEventSubscriber } from './application/amqp.event.subscriber';

@Module({
  imports: [ConfigModule.forRoot({ load: [config] })],
  controllers: [],
  providers: [PrismaService, AmqpService, AmqpEventSubscriber],
  exports: [PrismaService, AmqpService, AmqpEventSubscriber],
})
export class CommonsModule {}
