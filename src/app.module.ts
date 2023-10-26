import { Module } from '@nestjs/common';
import { CommonsModule } from './commons/commons.module';
import { OrderModule } from './order/order.module';
import { ShipmentModule } from './shipment/shipment.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [CommonsModule, OrderModule, ShipmentModule, ProductModule],
})
export class AppModule {}
