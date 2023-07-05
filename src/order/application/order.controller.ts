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
import { CreateOrderDTOMapper } from './dtos/mappers/createOrder.dto.mapper';
import { UpdateOrderDTO } from './dtos/updateOrder.dto';
import { CreateOrderDTO } from './dtos/createOrder.dto';
import { Order } from '../domain/aggregators/order.aggregate';
import { UpdateOrderDTOMapper } from './dtos/mappers/updateOrder.dto.mapper';

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
  update(@Body() order: UpdateOrderDTO): Promise<Order> {
    return this.orderService.update(
      new UpdateOrderDTOMapper().toUpdateOrder(order),
    );
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.orderService.delete(id);
  }
}
