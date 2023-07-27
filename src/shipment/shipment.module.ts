import { Module } from '@nestjs/common';
import { CommonsModule } from '../commons/commons.module';
import { ShipmentService } from './domain/shipment.service';
import { ShipmentRepository } from './domain/shipment.repository';
import { ShipmentPrismaRepository } from './infrastructure/shipment.prisma.repository';

@Module({
  imports: [CommonsModule],
  controllers: [],
  providers: [
    ShipmentService,
    {
      provide: ShipmentRepository,
      useClass: ShipmentPrismaRepository,
    },
  ],
})
export class OrderModule {}
