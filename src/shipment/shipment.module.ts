import { Module } from '@nestjs/common';
import { CommonsModule } from '../commons/commons.module';
import { ShipmentService } from './domain/shipment.service';
import { ShipmentRepository } from './domain/shipment.repository';
import { ShipmentPrismaRepository } from './infrastructure/shipment.prisma.repository';
import { ShipmentSubscriber } from './application/shipment.subscriber';
import { ShipmentController } from './application/shipment.controller';

@Module({
  imports: [CommonsModule],
  controllers: [ShipmentController],
  providers: [
    ShipmentService,
    {
      provide: ShipmentRepository,
      useClass: ShipmentPrismaRepository,
    },
    ShipmentSubscriber,
  ],
})
export class ShipmentModule {}
