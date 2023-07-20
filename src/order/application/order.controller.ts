import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderService } from '../domain/order.service';
import { CreateOrderDTOMapper } from './dtos/controller/mappers/createOrder.dto.mapper';
import { UpdateOrderDTO } from './dtos/controller/updateOrder.dto';
import { CreateOrderDTO } from './dtos/controller/createOrder.dto';
import { Order } from '../domain/aggregators/order.aggregate';
import { UpdateOrderDTOMapper } from './dtos/controller/mappers/updateOrder.dto.mapper';
import { OrderUpdatedTuple } from '../domain/aggregators/orderUpdatedTuple.aggregate';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get(':id')
  get(@Param('id') id: string): Promise<Order> {
    return this.orderService.get(id);
  }

  @Get()
  getAll(): Promise<Order[]> {
    return this.orderService.getAll();
  }

  @Post()
  save(@Body() order: CreateOrderDTO): Promise<Order> {
    return this.orderService.save(new CreateOrderDTOMapper().toNewOrder(order));
  }

  @Put()
  update(@Body() order: UpdateOrderDTO): Promise<OrderUpdatedTuple> {
    return this.orderService.update(
      new UpdateOrderDTOMapper().toUpdateOrder(order),
    );
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.orderService.delete(id);
  }
}
