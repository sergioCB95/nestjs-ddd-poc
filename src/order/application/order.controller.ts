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
import { UpdateOrderStatusDTO } from './dtos/controller/UpdateOrderStatus.dto';
import { UpdateOrderDTO } from './dtos/controller/UpdateOrder.dto';
import { CreateOrderDTO } from './dtos/controller/createOrder.dto';
import { Order } from '../domain/aggregators/order.aggregate';
import { UpdateOrderDTOMapper } from './dtos/controller/mappers/updateOrder.dto.mapper';
import { OrderUpdatedTuple } from '../domain/aggregators/orderUpdatedTuple.aggregate';
import { ApiTags } from '@nestjs/swagger';
import { AsyncApiPub } from 'nestjs-asyncapi';
import { CreateOrderEventDTO } from './dtos/publisher/createOrderEvent.dto';
import { UpdateOrderEventDto } from './dtos/publisher/updateOrderEvent.dto';
import { CreateOrderItemDTO } from './dtos/controller/createOrderItem.dto';
import { CreateOrderItemDTOMapper } from './dtos/controller/mappers/createOrderItem.dto.mapper';
import { UpdateOrderItemDTO } from './dtos/controller/updateOrderItem.dto';
import { UpdateOrderItemDTOMapper } from './dtos/controller/mappers/updateOrderItem.dto.mapper';
import { OrderCheckoutDTO } from './dtos/controller/orderCheckout.dto';

@ApiTags('order')
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

  @AsyncApiPub({
    channel: 'nestjs-ddd-poc.v1.order.created',
    message: {
      payload: CreateOrderEventDTO,
    },
  })
  @Post()
  save(@Body() order: CreateOrderDTO): Promise<Order> {
    return this.orderService.save(new CreateOrderDTOMapper().toNewOrder(order));
  }

  @AsyncApiPub({
    channel: 'nestjs-ddd-poc.v1.order.updated',
    message: {
      payload: UpdateOrderEventDto,
    },
  })
  @Put()
  update(@Body() order: UpdateOrderDTO): Promise<OrderUpdatedTuple> {
    return this.orderService.update(
      new UpdateOrderDTOMapper().toUpdateOrder(order),
    );
  }

  @AsyncApiPub({
    channel: 'nestjs-ddd-poc.v1.order.updated',
    message: {
      payload: UpdateOrderEventDto,
    },
  })
  @Put('status')
  updateStatus(
    @Body() { id, status }: UpdateOrderStatusDTO,
  ): Promise<OrderUpdatedTuple> {
    return this.orderService.updateStatus(id, status);
  }

  @AsyncApiPub({
    channel: 'nestjs-ddd-poc.v1.order.updated',
    message: {
      payload: UpdateOrderEventDto,
    },
  })
  @Put('checkout')
  checkout(
    @Body() { id, address }: OrderCheckoutDTO,
  ): Promise<OrderUpdatedTuple> {
    return this.orderService.checkout(id, address);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.orderService.delete(id);
  }

  @Post(':id/item')
  addItem(
    @Param('id') id: string,
    @Body() orderItem: CreateOrderItemDTO,
  ): Promise<OrderUpdatedTuple> {
    return this.orderService.addItem(
      id,
      new CreateOrderItemDTOMapper().toNewOrderItem(orderItem),
    );
  }

  @Put(':id/item')
  updateItem(
    @Param('id') id: string,
    @Body() orderItem: UpdateOrderItemDTO,
  ): Promise<OrderUpdatedTuple> {
    return this.orderService.updateItem(
      id,
      new UpdateOrderItemDTOMapper().toOrderItem(orderItem),
    );
  }

  @Delete(':id/item/:itemId')
  deleteItem(
    @Param('id') id: string,
    @Param('itemId') itemId: string,
  ): Promise<OrderUpdatedTuple> {
    return this.orderService.deleteItem(id, itemId);
  }
}
