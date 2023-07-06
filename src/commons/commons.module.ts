import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/prisma.service';
import { AmqpService } from './infrastructure/amqp.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService, AmqpService],
  exports: [PrismaService, AmqpService],
})
export class CommonsModule {}
