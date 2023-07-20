import { AmqpService } from '../../commons/infrastructure/amqp.service';
import { Injectable } from '@nestjs/common';
import { AmqpEventPublisher } from '../../commons/application/amqp.event.publisher';
import { OrderEvents } from '../domain/events/order.events';

@Injectable()
export class OrderPublisher extends AmqpEventPublisher {
  constructor(amqpService: AmqpService) {
    super(amqpService);
  }

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
