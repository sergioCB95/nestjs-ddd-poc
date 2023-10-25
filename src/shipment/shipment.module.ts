import { Module } from '@nestjs/common';
import { CommonsModule } from '../commons/commons.module';
import { ShipmentService } from './domain/shipment.service';
import { ShipmentRepository } from './domain/shipment.repository';
import { ShipmentPrismaRepository } from './infrastructure/shipment.prisma.repository';
import { ShipmentSubscriber } from './application/shipment.subscriber';
import { ShipmentController } from './application/shipment.controller';
import {
  ShipmentEventPublisher,
  ShipmentPublisher,
} from './application/shipment.publisher';

@Module({
  imports: [CommonsModule],
  controllers: [ShipmentController, ShipmentSubscriber],
  providers: [
    ShipmentService,
    {
      provide: ShipmentRepository,
      useClass: ShipmentPrismaRepository,
    },
    {
      provide: ShipmentEventPublisher,
      useClass: ShipmentPublisher,
    },
  ],
})
export class ShipmentModule {}
