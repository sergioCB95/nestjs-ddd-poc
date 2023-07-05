import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './commons/infrastructure/prisma.service';
import { OrderPrismaRepository } from './order/infrastructure/order.prisma.repository';
import { OrderController } from './order/application/order.controller';
import { OrderService } from './order/domain/order.service';
import { OrderRepository } from './order/domain/order.repository';

@Module({
  imports: [],
  controllers: [AppController, OrderController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: OrderRepository,
      useClass: OrderPrismaRepository,
    },
    OrderService,
  ],
})
export class AppModule {}
