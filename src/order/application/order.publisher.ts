import { Injectable } from '@nestjs/common';
import { OrderEvents } from '../domain/events/order.events';
import { AsyncApiPub, AsyncApi } from 'nestjs-asyncapi';
import { CreateOrderEventDTO } from './dtos/publisher/createOrderEvent.dto';
import { UpdateOrderEventDto } from './dtos/publisher/updateOrderEvent.dto';
import { RascalEventPublisher } from '../../commons/application/rascal.event.publisher';
import { RascalClient } from '../../commons/infrastructure/rascal.client';

@Injectable()
@AsyncApi()
export class OrderPublisher extends RascalEventPublisher {
  constructor(protected readonly rascalClient: RascalClient) {
    super(rascalClient);
  }

  @AsyncApiPub({
    channel: 'nestjs-ddd-poc.v1.order.created',
    message: {
      payload: CreateOrderEventDTO,
    },
  })
  orderCreated() {}

  @AsyncApiPub({
    channel: 'nestjs-ddd-poc.v1.order.updated',
    message: {
      payload: UpdateOrderEventDto,
    },
  })
  orderUpdated() {}

  eventMap = {
    [OrderEvents.Created]: {
      eventName: OrderEvents.Created,
    },
    [OrderEvents.Updated]: {
      eventName: OrderEvents.Updated,
    },
  };
}

export const OrderEventPublisher = Symbol('OrderEventPublisher');
