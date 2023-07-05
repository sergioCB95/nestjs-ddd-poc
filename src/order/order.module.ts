import { Module } from '@nestjs/common';
import { CommonsModule } from '../commons/commons.module';
import { OrderController } from './application/order.controller';
import { OrderRepository } from './domain/order.repository';
import { OrderPrismaRepository } from './infrastructure/order.prisma.repository';
import { OrderService } from './domain/order.service';

@Module({
  imports: [CommonsModule],
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: OrderRepository,
      useClass: OrderPrismaRepository,
    },
  ],
})
export class OrderModule {}
