import { Module } from '@nestjs/common';
import { CommonsModule } from './commons/commons.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [CommonsModule, OrderModule],
})
export class AppModule {}
