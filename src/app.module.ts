import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonsModule } from './commons/commons.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [CommonsModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
