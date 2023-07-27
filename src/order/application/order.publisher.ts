import { AmqpService } from '../../commons/infrastructure/amqp.service';
import { Injectable } from '@nestjs/common';
import { AmqpEventPublisher } from '../../commons/application/amqp.event.publisher';
import { OrderEvents } from '../domain/events/order.events';
import { AsyncApiPub, AsyncApi } from 'nestjs-asyncapi';
import { CreateOrderEventDTO } from './dtos/publisher/createOrderEvent.dto';
import { UpdateOrderEventDto } from './dtos/publisher/updateOrderEvent.dto';

@Injectable()
@AsyncApi()
export class OrderPublisher extends AmqpEventPublisher {
  constructor(amqpService: AmqpService) {
    super(amqpService);
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
