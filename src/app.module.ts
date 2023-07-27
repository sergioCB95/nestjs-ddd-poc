import { Module } from '@nestjs/common';
import { CommonsModule } from './commons/commons.module';
import { OrderModule } from './order/order.module';
import { ShipmentModule } from './shipment/shipment.module';

@Module({
  imports: [CommonsModule, OrderModule, ShipmentModule],
})
export class AppModule {}
